import { Request, Response } from "express";
import { supabase } from "../database/supabase.client";

/**
 * CREATE: Add multiple items (Bulk Insert)
 */
export const saveToInventory = async (req: Request, res: Response) => {
  try {
    console.log('REQUEST HITT')
    const { items } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    if (!items || !Array.isArray(items)) return res.status(400).json({ error: "Invalid items" });

    const { data, error } = await supabase
      .from("Inventory")
      .insert(
        items.map((item: any) => ({
          user_id: userId,
          name: item.name,
          quantity: String(item.quantity || ""),
          unit: item.unit || "pcs",
        }))
      )
      .select();

      console.log("Inventory items inserted:", data);

    if (error) throw error;
    return res.status(201).json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * READ: Get all items for the logged-in user
 */
export const getInventory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    const { data, error } = await supabase
      .from("Inventory")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * UPDATE: Update a specific item's quantity or name
 */
export const updateInventoryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Item ID from URL
    const updates = req.body;
    const userId = req.user?.id;

    const { data, error } = await supabase
      .from("Inventory")
      .update({
        name: updates.name,
        quantity: String(updates.quantity),
        unit: updates.unit
      })
      .eq("id", id)
      .eq("user_id", userId)
      .select();

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * DELETE: Remove an item from the pantry
 */
export const deleteFromInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const { error } = await supabase
      .from("Inventory")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw error;
    return res.status(200).json({ success: true, message: "Item deleted" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};