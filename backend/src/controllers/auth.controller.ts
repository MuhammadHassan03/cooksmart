// src/controllers/auth.controller.ts

import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  registerUser,
  loginUser,
  sendResetPasswordEmail,
  resetUserPassword,
  fetchCurrentUser,
  markUserAsOnboarded,
} from "../services/auth.service";

// ------------------------ REGISTER ------------------------
export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password, fullName } = req.body;
    const user = await registerUser(email, password, fullName);
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({
      error: "Registration failed",
      details: (error as Error).message,
    });
  }
};

// ------------------------ LOGIN ------------------------
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { session, user } = await loginUser(email, password);

    return res.json({ session, user });
  } catch (error) {
    return res.status(401).json({
      error: "Login failed",
      details: (error as Error).message,
    });
  }
};

// ------------------------ FORGOT PASSWORD ------------------------
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await sendResetPasswordEmail(email);
    return res.status(200).json({ message: "Reset email sent successfully" });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to send reset email",
      details: (err as Error).message,
    });
  }
};

// ------------------------ RESET PASSWORD ------------------------
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body;
    await resetUserPassword(newPassword);
    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    return res.status(400).json({
      message: "Password reset failed",
      details: (err as Error).message,
    });
  }
};

// ------------------------ GET CURRENT USER ------------------------
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "No token provided" });

    const user = await fetchCurrentUser(token);
    return res.json({ user });
  } catch (error) {
    return res.status(400).json({
      error: "Could not fetch user",
      details: (error as Error).message,
    });
  }
};

// ------------------------ Complete Onboarding ------------------------

export const completeOnboarding = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ error: "Authorization token is missing" });
    }

    const preferences = req.body.preferences;
    if (
      !preferences ||
      !Array.isArray(preferences.diet) ||
      !Array.isArray(preferences.allergies) ||
      !Array.isArray(preferences.cuisines)
    ) {
      return res.status(400).json({ error: "Invalid or missing preferences" });
    }

    await markUserAsOnboarded(req.user.id, preferences);

    return res.status(200).json({ message: "User onboarded successfully" });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to complete onboarding",
      details: (error as Error).message,
    });
  }
};

// ------------------------ GOOGLE AUTH (TODO) ------------------------
export const googleAuth = async (_req: Request, res: Response) => {
  return res
    .status(501)
    .json({ message: "Google auth not implemented on backend" });
};

// ------------------------ LOGOUT ------------------------
export const logout = async (_req: Request, res: Response) => {
  return res.status(200).json({ message: "Logged out (client-side only)" });
};
