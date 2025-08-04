export type Ingredient = {
  name: string
  quantity: string
  unit: string
}

export function createIngredient(name: string, quantity: string, unit: string): Ingredient {
  return {
    name: name.trim(),
    quantity,
    unit,
  }
}

export function isDuplicateIngredient(
  ingredients: Ingredient[],
  name: string
): boolean {
  return ingredients.some(i => i.name.toLowerCase() === name.trim().toLowerCase())
}

export function updateIngredientAt(
  ingredients: Ingredient[],
  index: number,
  updated: Ingredient
): Ingredient[] {
  const copy = [...ingredients]
  copy[index] = updated
  return copy
}

export function deleteIngredientAt(
  ingredients: Ingredient[],
  index: number
): Ingredient[] {
  return ingredients.filter((_, i) => i !== index)
}

