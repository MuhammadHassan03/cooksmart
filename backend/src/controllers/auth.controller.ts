import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { validationResult } from 'express-validator';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await authService.register(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: 'Login failed', details: (error as Error).message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await authService.sendPasswordResetEmail(email);
    res.json({ message: 'Password reset link sent' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to send reset link', details: (error as Error).message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(400).json({ error: 'Password reset failed', details: (error as Error).message });
  }
};

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;
    // const result = await authService.googleLogin(idToken);
    // res.json(result);
  } catch (error) {
    res.status(400).json({ error: 'Google auth failed', details: (error as Error).message });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: 'Could not fetch user info', details: (error as Error).message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Logout failed', details: (error as Error).message });
  }
};