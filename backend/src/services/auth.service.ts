import { supabase } from '../database/supabase.client';
import type { Session, User } from '@supabase/supabase-js';

export class AuthService {
  // Register user and handle unverified email
  async register({ email, password }: { email: string; password: string }): Promise<User> {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw new Error(`Registration failed: ${error.message}`);

    // Check if email verification is required
    if (data.user?.identities?.length === 0) {
      throw new Error('Email already exists but is not verified. Please verify your email.');
    }

    return data.user!;
  }

  // Login and handle unverified email, expired OTP, etc.
  async login(email: string, password: string): Promise<Session> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        await this.resendVerificationEmail(email);
        throw new Error('Please verify your email before logging in.');
      } else if (error.message.includes('Invalid login credentials')) {
        throw new Error('Incorrect email or password.');
      } else {
        throw new Error(`Login failed: ${error.message}`);
      }
    }

    return data.session!;
  }

  // Send password reset email
  async sendPasswordResetEmail(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw new Error(`Could not send password reset email: ${error.message}`);
  }

  // Custom password reset not supported unless using custom form
  async resetPassword(token: string, newPassword: string): Promise<void> {
    throw new Error('Password reset must be handled via frontend redirect (Supabase default).');
  }

  // Trigger email verification again if needed (for unverified accounts)
  async resendVerificationEmail(email: string): Promise<void> {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) {
      if (error.message.includes('Too many requests')) {
        throw new Error('You have requested verification too many times. Please try again later.');
      }
      throw new Error(`Could not resend verification email: ${error.message}`);
    }
  }

  // Google OAuth login
  async googleLogin(): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.GOOGLE_REDIRECT_URL || window.location.origin,
      },
    });

    if (error) throw new Error(`Google login failed: ${error.message}`);
  }

  // Logout
  async logout(): Promise<{ message: string }> {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(`Logout failed: ${error.message}`);
    return { message: 'Logged out successfully' };
  }

  // Get user from token (used in SSR or server-side routes)
  async getUserFromToken(token: string): Promise<User> {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) throw new Error(`Error getting user from token: ${error.message}`);
    return data.user!;
  }

  // Get currently logged-in user (client-side)
  async getCurrentUser(): Promise<User | null> {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(`Error fetching current user: ${error.message}`);
    return data.user ?? null;
  }

  // Resend email link if signup confirmation is expired or missed
  async handleUnverifiedSignup(email: string): Promise<void> {
    const { data, error } = await supabase.auth.resend({ type: 'signup', email });

    if (error) {
      if (error.message.includes('already confirmed')) {
        throw new Error('Your email is already verified.');
      }
      throw new Error(`Failed to resend confirmation: ${error.message}`);
    }
  }

  // Update password (must be logged in)
  async updatePassword(newPassword: string): Promise<User> {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw new Error(`Failed to update password: ${error.message}`);
    return data.user!;
  }

  // Update user email or metadata
  async updateUser(updates: {
    email?: string;
    password?: string;
    data?: { [key: string]: any };
  }): Promise<User> {
    const { data, error } = await supabase.auth.updateUser(updates);
    if (error) throw new Error(`Failed to update user: ${error.message}`);
    return data.user!;
  }

  // Get current session
  async getSession(): Promise<Session | null> {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw new Error(`Failed to fetch session: ${error.message}`);
    return data.session ?? null;
  }

  // Refresh session using refresh_token
  async refreshSession(refreshToken: string): Promise<Session> {
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
    if (error) throw new Error(`Session refresh failed: ${error.message}`);
    return data.session!;
  }

  // Reauthenticate user before sensitive actions
  async reauthenticate(email: string, password: string): Promise<void> {
    const session = await this.login(email, password);
    if (!session) throw new Error('Reauthentication failed.');
  }
}
