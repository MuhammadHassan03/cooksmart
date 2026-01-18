// @/store/useInventoryStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { InventoryItem } from '@/utils/types/inventory'

interface InventoryState {
  items: InventoryItem[]
  isLoading: boolean
  // Actions
  setItems: (items: InventoryItem[]) => void
  addItem: (item: InventoryItem) => void
  updateItemLocal: (id: string | number, updates: Partial<InventoryItem>) => void
  removeItemLocal: (id: string | number) => void
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      items: [],
      isLoading: false,

      // Saare items aik saath update karne ke liye (Supabase fetch ke baad)
      setItems: (items) => set({ items, isLoading: false }),

      // Naya item list mein top par add karne ke liye
      addItem: (item) => set((state) => ({ 
        items: [item, ...state.items] 
      })),

      // Kisi item ki quantity ya expiry update karne ke liye
      updateItemLocal: (id, updates) => set((state) => ({
        items: state.items.map((item) => 
          item.id === id ? { ...item, ...updates } : item
        ),
      })),

      // Item delete karne ke liye
      removeItemLocal: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),
    }),
    {
      name: 'cooksmart-local-storage', // Phone storage mein is naam se save hoga
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)