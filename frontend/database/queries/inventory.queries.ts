import { db } from "@/database/client";
import { Ingredient } from "@/hooks/(authenticated)/useIngredientsManager";

export const inventoryQueries = {
  // 1. Bulk Add (Status 0 = Local Only)
  addIngredients: (ingredients: Ingredient[]) => {
    try {
      db.withTransactionSync(() => {
        const statement = db.prepareSync(
          "INSERT INTO pantry (name, quantity, unit, sync_status) VALUES (?, ?, ?, 0)"
        );

        try {
          for (const item of ingredients) {
            statement.executeSync([item.name, item.quantity, item.unit]);
          }
        } finally {
          statement.finalizeSync();
        }
      });
      return { success: true };
    } catch (error) {
      console.error("SQL Error in addIngredients:", error);
      throw error;
    }
  },

  // 2. Get everything for the UI
  getAllPantryItems: () => {
    return db.getAllSync("SELECT * FROM pantry ORDER BY created_at DESC");
  },

  // 3. Get ONLY items that haven't reached Supabase yet
  getUnsyncedItems: () => {
    return db.getAllSync("SELECT * FROM pantry WHERE sync_status = 0");
  },

  // 4. Mark items as synced after API success
  markAsSynced: (ids: number[]) => {
    if (ids.length === 0) return;
    const placeholders = ids.map(() => "?").join(",");
    db.runSync(
      `UPDATE pantry SET sync_status = 1 WHERE id IN (${placeholders})`,
      ...ids
    );
  },

  // 5. Delete Item
  deleteItem: (id: number) => {
    db.runSync("DELETE FROM pantry WHERE id = ?", [id]);
  },
};