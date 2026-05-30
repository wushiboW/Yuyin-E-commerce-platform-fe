import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  specs?: Record<string, string>;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

function calculateTotals(items: CartItem[]) {
  return {
    totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      
      addItem: (item) => {
        const items = get().items;
        const existingIndex = items.findIndex((i) => i.id === item.id);
        
        if (existingIndex >= 0) {
          const updatedItems = [...items];
          updatedItems[existingIndex].quantity += item.quantity;
          set({ items: updatedItems, ...calculateTotals(updatedItems) });
        } else {
          const updatedItems = [...items, item];
          set({ items: updatedItems, ...calculateTotals(updatedItems) });
        }
      },
      
      removeItem: (id) => {
        const items = get().items.filter((item) => item.id !== id);
        set({ items, ...calculateTotals(items) });
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        const items = get().items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
        set({ items, ...calculateTotals(items) });
      },
      
      clearCart: () => set({ items: [], totalQuantity: 0, totalPrice: 0 }),
    }),
    {
      name: 'yuyin-cart-storage',
    }
  )
);

export default useCartStore;
