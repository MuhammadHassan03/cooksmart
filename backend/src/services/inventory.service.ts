import { Request, Response } from "express";
import { supabase } from "../database/supabase.client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const analyzeIngredientsWithAI = async (itemName: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // AI ko mazeed context dena taake analytics behtar hon
    const prompt = `Analyze the food item "${itemName}". 
    Return ONLY a JSON object with:
    "category": (Dairy, Meat, Vegetable, Fruit, Bakery, Pantry, Beverage),
    "expiry_days": (integer, estimated shelf life),
    "storage_tip": (short tip to increase shelf life),
    "estimated_price": (average price in USD for 1 unit of this item).
    Example: {"category": "Dairy", "expiry_days": 7, "storage_tip": "Keep in the middle shelf", "estimated_price": 3.5}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text().replace(/```json|```/g, "")); // Cleaner parsing
  } catch (error) {
    return {
      category: "Pantry",
      expiry_days: 14,
      storage_tip: "Store in cool place",
      estimated_price: 1.0,
    };
  }
};

export const saveToInventory = async (req: Request, res: Response) => {
  try {
    const { items, source } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    if (source === 'scanner') {
    }

    const processedItems = await Promise.all(items.map(async (item: any) => {
      const ai = await analyzeIngredientsWithAI(item.name);
      
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + ai.expiry_days);

      return {
        user_id: userId,
        name: item.name.trim(),
        quantity: item.quantity || 1,
        unit: item.unit || "pcs",
        category: ai.category,
        expiry_date: expiryDate.toISOString().split('T')[0],
        storage_tip: ai.storage_tip,
        estimated_value: ai.estimated_price
      };
    }));

    const { data, error } = await supabase
      .from("pantry_items")
      .insert(processedItems)
      .select();

    if (error) throw error;
    return res.status(201).json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * READ: Get all items for the logged-in user
 */
export const getInventory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const { data, error } = await supabase
      .from("pantry_items")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateInventoryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Item ID from URL
    const updates = req.body;
    const userId = req.user?.id;

    const { data, error } = await supabase
      .from("pantry_items")
      .update({
        name: updates.name,
        quantity: String(updates.quantity),
        unit: updates.unit,
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
      .from("pantry_items")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw error;
    return res.status(200).json({ success: true, message: "Item deleted" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
