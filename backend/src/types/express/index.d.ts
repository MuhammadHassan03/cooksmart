import { User } from "@supabase/supabase-js";

declare global {
  namespace Express {
    export interface Request {
      user: any;
    }
    export interface Response {
      user: any;
  }
  }
}

export {};
