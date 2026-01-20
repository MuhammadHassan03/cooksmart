
export interface InventoryItem {
  id: string | number
  name: string
  quantity: string | number
  unit: string
  category: string
  created_at: string
  expiry_date: string | null
  is_opened: boolean
  user_id: string
}

export type Ingredient = {
  name: string
  quantity: string
  unit: string
}

export type IngredientItemProps = {
  item: Ingredient
  index: number
  onEdit: (index: number) => void
  onDelete: (index: number) => void
  colors: {
    surface: string
    text: string
    textSecondary: string
    warning: string
    primary: string
    border: string
  }
}