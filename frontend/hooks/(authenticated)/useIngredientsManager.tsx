import { inventoryQueries } from "@/database/queries/inventory.queries";
import { useState, useRef, useCallback } from "react";
import { Alert } from "react-native";
import { useRequest } from "@/hooks/useRequest";
import { apiQueue } from "@/utils/apiQueue";
import api from "@/services/api";
import { router } from "expo-router";

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export function useIngredientsManager(initialUnit: string = "pcs") {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState(initialUnit);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const lastDeleted = useRef<Ingredient | null>(null);

  // Memoize clearForm so it doesn't trigger effect changes
  const clearForm = useCallback(() => {
    setName("");
    setQuantity("");
    setUnit(initialUnit);
    setEditingIndex(null);
  }, [initialUnit]);

  // Optimization: Functional updates prevent the hook from needing 'ingredients' as a dependency
  const hydrateIngredients = useCallback((scannedItems: any[]) => {
    const formatted = scannedItems.map((item) => ({
      name: item.item || item.name,
      quantity: String(item.quantity || ""),
      unit: item.unit || "unit",
    }));

    setIngredients((prev) => {
      // Prevent duplicates during hydration
      const existingNames = new Set(prev.map((i) => i.name.toLowerCase()));
      const uniqueNewItems = formatted.filter(
        (i) => !existingNames.has(i.name.toLowerCase()),
      );
      return [...prev, ...uniqueNewItems];
    });
  }, []);

  const addOrUpdateIngredient = useCallback(() => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const newItem: Ingredient = { name: trimmed, quantity, unit };

    setIngredients((prev) => {
      if (editingIndex !== null) {
        const updated = [...prev];
        updated[editingIndex] = newItem;
        return updated;
      }

      if (prev.some((i) => i.name.toLowerCase() === trimmed.toLowerCase())) {
        Alert.alert("Already added", `"${trimmed}" is already in your list.`);
        return prev;
      }

      return [...prev, newItem];
    });

    clearForm();
  }, [name, quantity, unit, editingIndex, clearForm]);

  const deleteIngredient = useCallback((index: number) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setIngredients((prev) => {
            lastDeleted.current = prev[index];
            return prev.filter((_, i) => i !== index);
          });
        },
      },
    ]);
  }, []);

  const startEdit = useCallback((index: number) => {
    setIngredients((prev) => {
      const item = prev[index];
      setName(item.name);
      setQuantity(item.quantity);
      setUnit(item.unit);
      setEditingIndex(index);
      return prev;
    });
  }, []);

  const setFromSuggestion = useCallback(
    ({ name, quantity, unit }: Ingredient) => {
      setName(name);
      setQuantity(quantity);
      setUnit(unit);
    },
    [],
  );

  const saveToLocalPentry = async (ingredients: Ingredient[]) => {
    try {
      inventoryQueries.addIngredients(ingredients);
      setIngredients([]);
    } catch (error) {
      console.error("Error adding ingredients:", error);
      Alert.alert("Error", "Failed to add ingredients to pantry");
    }
  };

  const syncPentrytoCloud = async (ingredientsToSync: Ingredient[]) => {
    await apiQueue.enqueue(
      async () => {
        // 1. API Call
        const response = await api.post("/inventory/add", ingredientsToSync);

        // 2. Success check (Senior Approach)
        if (response.data && response.data.success) {
          // Backend se jo IDs wapis aayi hain unko local DB mein sync mark karo
          // Agar backend IDs nahi bhej raha, toh names ke base par bhi kar sakte hain
          const syncedIds = response.data.items.map((i: any) => i.id);

          inventoryQueries.markAsSynced(syncedIds);
          console.log("Successfully synced and updated local flags.");
        }
      },
      {
        url: "/inventory/add",
        method: "POST",
        data: ingredientsToSync,
      },
    );
  };

  return {
    name,
    quantity,
    unit,
    ingredients,
    setName,
    setQuantity,
    setUnit,
    setIngredients,
    addOrUpdateIngredient,
    deleteIngredient,
    startEdit,
    setFromSuggestion,
    hydrateIngredients,
    isEditing: editingIndex !== null,
    saveToLocalPentry,
  };
}
