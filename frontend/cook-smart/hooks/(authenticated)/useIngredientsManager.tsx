import { useState, useRef } from "react"
import { Alert } from "react-native"

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

  const clearForm = () => {
    setName("")
    setQuantity("")
    setUnit(initialUnit)
    setEditingIndex(null)
  }

  const addOrUpdateIngredient = () => {
    const trimmed = name.trim()
    if (!trimmed) return

    const newItem: Ingredient = {
      name: trimmed,
      quantity,
      unit,
    }

    if (editingIndex !== null) {
      const updated = [...ingredients]
      updated[editingIndex] = newItem
      setIngredients(updated)
      clearForm()
      return
    }

    const duplicate = ingredients.find(
      (i) => i.name.toLowerCase() === trimmed.toLowerCase()
    )
    if (duplicate) {
      Alert.alert("Already added", `"${trimmed}" is already in your list.`)
      return
    }

    setIngredients([...ingredients, newItem])
    clearForm()
  }

  const deleteIngredient = (index: number) => {
    Alert.alert("Delete Ingredient", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          lastDeleted.current = ingredients[index]
          setIngredients((prev) => prev.filter((_, i) => i !== index))
        },
      },
    ])
  }

  const startEdit = (index: number) => {
    const item = ingredients[index]
    setName(item.name)
    setQuantity(item.quantity)
    setUnit(item.unit)
    setEditingIndex(index)
  }

  const setFromSuggestion = (suggested: string) => {
    setName(suggested)
  }

  return {
    name,
    quantity,
    unit,
    ingredients,
    setName,
    setQuantity,
    setUnit,
    addOrUpdateIngredient,
    deleteIngredient,
    startEdit,
    setFromSuggestion,
    isEditing: editingIndex !== null,
  }
}
