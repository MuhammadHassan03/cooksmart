import { Request, Response, NextFunction } from 'express';
import { supabase } from '../database/supabase.client';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    console.log('No Token')
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = data.user;
    next();
  } catch (err) {
      const error = err as Error;
    return res.status(500).json({ error: 'Auth middleware failed', details: error.message });
  }
};