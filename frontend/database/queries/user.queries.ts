import { db } from "../client";

export const userQueries = {
  // Save user and clear old dirty flags (used after a fresh login)
  saveUser: (
    id: string,
    email: string,
    fullName: string,
    onboarded: boolean,
    avatarUrl: string,
  ) => {
    db.runSync(
      "INSERT OR REPLACE INTO users (id, email, full_name, is_onboarded, avatar_url) VALUES (?, ?, ?, ?, ?)",
      [id, email, fullName, onboarded ? 1 : 0, avatarUrl],
    );
  },

  // Update preferences locally and mark them for sync
  updatePreferences: (category: string, values: string[]) => {
    db.withTransactionSync(() => {
      // Any new local change is "dirty"
      db.runSync("DELETE FROM user_preferences WHERE category = ?", [category]);
      for (const val of values) {
        db.runSync(
          "INSERT INTO user_preferences (category, value, is_dirty) VALUES (?, ?, 1)",
          [category, val],
        );
      }
    });
  },

  getFullUser: () => {
    const row = db.getFirstSync<any>("SELECT * FROM users LIMIT 1");

    if (!row) return null;

    // We reconstruct the object to look like what your app expects
    return {
      id: row.id,
      email: row.email,
      fullName: row.full_name,
      // We parse the JSON string back into a real JS Object
      avatar_url: row.avatar_url,
      user_metadata: JSON.parse(row.metadata_json || "{}"),
    };
  },

  // Get preferences in the format the UI expects
  getPreferences: () => {
    const rows = db.getAllSync<{ category: string; value: string }>(
      "SELECT category, value FROM user_preferences",
    );
    return rows.reduce(
      (acc, row) => {
        if (!acc[row.category]) acc[row.category] = [];
        acc[row.category].push(row.value);
        return acc;
      },
      {} as Record<string, string[]>,
    );
  },

  // Isay userQueries object ke andar add karein
  saveStats: (userId: string, meals: number, saved: number, rank: number) => {
    db.runSync(
      "INSERT OR REPLACE INTO user_stats (user_id, meals_count, waste_saved_kg, global_rank) VALUES (?, ?, ?, ?)",
      [userId, meals, saved, rank]
    );
  },

  getStats: () => {
    return db.getFirstSync<any>("SELECT * FROM user_stats LIMIT 1");
  },

  saveNotificationSettings: (userId: string, mealPrep: boolean, expiry: boolean, weekly: boolean) => {
    db.runSync(
      "INSERT OR REPLACE INTO notification_settings (user_id, meal_prep_alerts, expiry_alerts, weekly_suggestions) VALUES (?, ?, ?, ?)",
      [userId, mealPrep ? 1 : 0, expiry ? 1 : 0, weekly ? 1 : 0]
    );
  },

  getNotificationSettings: () => {
    return db.getFirstSync<any>("SELECT * FROM notification_settings LIMIT 1");
  },
};
