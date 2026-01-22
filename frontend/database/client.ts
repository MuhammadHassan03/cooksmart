import * as SQLite from "expo-sqlite";

// We use a constant name for the DB file
export const DB_NAME = "cooksmart.db";
export const db = SQLite.openDatabaseSync(DB_NAME);

export const initDatabase = () => {
  db.execSync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY NOT NULL,
      email TEXT,
      full_name TEXT,
      avatar_url TEXT,
      is_onboarded INTEGER DEFAULT 0
    );

    -- 1. ADD THIS: Stats Table
    CREATE TABLE IF NOT EXISTS user_stats (
      user_id TEXT PRIMARY KEY NOT NULL,
      meals_count INTEGER DEFAULT 0,
      waste_saved_kg REAL DEFAULT 0.0,
      global_rank INTEGER DEFAULT 0,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- 2. ADD THIS: Notifications Table
    CREATE TABLE IF NOT EXISTS notification_settings (
      user_id TEXT PRIMARY KEY NOT NULL,
      meal_prep_alerts INTEGER DEFAULT 1,
      expiry_alerts INTEGER DEFAULT 1,
      weekly_suggestions INTEGER DEFAULT 1,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS user_preferences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      value TEXT NOT NULL,
      is_dirty INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS pantry (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity TEXT,
      unit TEXT,
      category TEXT DEFAULT 'Other',
      sync_status INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
};
