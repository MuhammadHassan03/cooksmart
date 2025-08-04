import { Request, Response, NextFunction } from 'express';
import { supabase } from '../database/supabase.client';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization header missing or malformed" });
  }

  const token = authHeader.split("Bearer ")[1].trim();

  if (!token) {
    return res.status(401).json({ error: "Token not found in authorization header" });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error("Supabase token error:", error.message);
      return res.status(403).json({ error: "Token verification failed" });
    }

    if (!data?.user) {
      return res.status(403).json({ error: "Invalid or expired session" });
    }

    // Optional: Email verification enforcement
    if (!data.user.email_confirmed_at) {
      return res.status(403).json({ error: "Email not verified" });
    }

    // Attach user info to request
    req.user = {
      id: data.user.id,
      email: data.user.email,
      role: data.user.role ?? "user", // optional
      ...data.user.user_metadata,     // includes fullName etc.
    };

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(500).json({ error: "Auth middleware failed", details: (err as Error).message });
  }
};
