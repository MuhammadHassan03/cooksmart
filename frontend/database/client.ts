import * as SQLite from 'expo-sqlite';

// We use a constant name for the DB file
export const DB_NAME = 'cooksmart.db';
export const db = SQLite.openDatabaseSync(DB_NAME);

export const initDatabase = () => {
  // Use a transaction for initial setup
  db.execSync(`
    PRAGMA journal_mode = WAL; -- High performance mode
    
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY NOT NULL,
      email TEXT,
      full_name TEXT,
      is_onboarded INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS user_preferences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL, -- 'diet', 'allergy', 'cuisine'
      value TEXT NOT NULL,
      is_dirty INTEGER DEFAULT 0 -- 1 = needs to sync to server
    );

    CREATE TABLE IF NOT EXISTS pantry (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity TEXT,
      unit TEXT,
      category TEXT DEFAULT 'Other',
      sync_status INTEGER DEFAULT 0, -- 0: local only, 1: synced to cloud
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
};