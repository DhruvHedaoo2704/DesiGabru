import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
  persist(
    (set, get) => ({
      theme: 'dark',
      wishlist: [],
      recentlyViewed: [],
      toasts: [],

      toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),

      toggleWishlist: (productId) => {
        const list = get().wishlist;
        const exists = list.includes(productId);
        set({
          wishlist: exists
            ? list.filter((id) => id !== productId)
            : [...list, productId],
        });
      },

      isWishlisted: (productId) => get().wishlist.includes(productId),

      addRecentlyViewed: (product) => {
        const filtered = get().recentlyViewed.filter((p) => p._id !== product._id);
        set({ recentlyViewed: [product, ...filtered].slice(0, 8) });
      },

      addToast: (message, type = 'success') => {
        const id = Date.now();
        set({ toasts: [...get().toasts, { id, message, type }] });
        setTimeout(() => {
          set({ toasts: get().toasts.filter((t) => t.id !== id) });
        }, 3500);
      },
    }),
    { name: 'ui-storage', partialize: (s) => ({ theme: s.theme, wishlist: s.wishlist }) }
  )
);
