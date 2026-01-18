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