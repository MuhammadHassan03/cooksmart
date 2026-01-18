import { db } from "../client";

export const systemQueries = {
  // Pure user ka data wipe out karne ke liye
  resetDatabase: () => {
    try {
      db.withTransactionSync(() => {
        // 1. Tables khali karein
        db.runSync("DELETE FROM pantry");
        db.runSync("DELETE FROM users");
        db.runSync("DELETE FROM user_preferences");
        
        // 2. Primary Key counters reset karein (Zaroori for Fresh Feel)
        db.runSync("DELETE FROM sqlite_sequence WHERE name='pantry'");
        db.runSync("DELETE FROM sqlite_sequence WHERE name='user_preferences'");
        
        console.log("Database cleared: Everything is fresh now.");
      });
    } catch (error) {
      console.error("Database Reset Error:", error);
    }
  }
};