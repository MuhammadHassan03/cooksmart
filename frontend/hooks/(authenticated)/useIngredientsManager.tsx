import { inventoryQueries } from "@/database/queries/inventory.queries"
import { useState, useRef, useCallback } from "react"
import { Alert } from "react-native"
import { useRequest } from "@/hooks/useRequest";
import { apiQueue } from "@/utils/apiQueue";
import api from "@/services/api";


export interface Ingredient {
  name: string
  quantity: string
  unit: string
}

export function useIngredientsManager(initialUnit: string = "pcs") {
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [unit, setUnit] = useState(initialUnit)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const lastDeleted = useRef<Ingredient | null>(null)

  // Memoize clearForm so it doesn't trigger effect changes
  const clearForm = useCallback(() => {
    setName("")
    setQuantity("")
    setUnit(initialUnit)
    setEditingIndex(null)
  }, [initialUnit])

  // Optimization: Functional updates prevent the hook from needing 'ingredients' as a dependency
  const hydrateIngredients = useCallback((scannedItems: any[]) => {
    const formatted = scannedItems.map(item => ({
      name: item.item || item.name,
      quantity: String(item.quantity || ""), 
      unit: item.unit || "unit"
    }));
    
    setIngredients((prev) => {
      // Prevent duplicates during hydration
      const existingNames = new Set(prev.map(i => i.name.toLowerCase()));
      const uniqueNewItems = formatted.filter(i => !existingNames.has(i.name.toLowerCase()));
      return [...prev, ...uniqueNewItems];
    });
  }, []);

  const addOrUpdateIngredient = useCallback(() => {
    const trimmed = name.trim()
    if (!trimmed) return

    const newItem: Ingredient = { name: trimmed, quantity, unit }

    setIngredients((prev) => {
      if (editingIndex !== null) {
        const updated = [...prev]
        updated[editingIndex] = newItem
        return updated
      }

      if (prev.some((i) => i.name.toLowerCase() === trimmed.toLowerCase())) {
        Alert.alert("Already added", `"${trimmed}" is already in your list.`)
        return prev
      }

      return [...prev, newItem]
    })
    
    clearForm()
  }, [name, quantity, unit, editingIndex, clearForm])

  const deleteIngredient = useCallback((index: number) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setIngredients((prev) => {
            lastDeleted.current = prev[index]
            return prev.filter((_, i) => i !== index)
          })
        },
      },
    ])
  }, [])

  const startEdit = useCallback((index: number) => {
    setIngredients((prev) => {
      const item = prev[index]
      setName(item.name)
      setQuantity(item.quantity)
      setUnit(item.unit)
      setEditingIndex(index)
      return prev
    })
  }, [])

  const setFromSuggestion = useCallback(({ name, quantity, unit }: Ingredient) => {
    setName(name)
    setQuantity(quantity)
    setUnit(unit)
  }, [])

  const saveToPentry = async (ingredients: Ingredient[]) => {
    try {
      inventoryQueries.addIngredients(ingredients);
      

    } catch (error) {
      console.error("Error adding ingredients:", error);
      Alert.alert("Error", "Failed to add ingredients to pantry");
    }
  }

  return {
    name, quantity, unit, ingredients,
    setName, setQuantity, setUnit, setIngredients,
    addOrUpdateIngredient, deleteIngredient,
    startEdit, setFromSuggestion, hydrateIngredients,
    isEditing: editingIndex !== null,
    saveToPentry
  }
}