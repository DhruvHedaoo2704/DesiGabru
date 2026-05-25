import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const FREE_SHIPPING = 999;

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product, quantity = 1, size = '') => {
        const items = [...get().items];
        const key = `${product._id}-${size}`;
        const existing = items.find((i) => `${i._id}-${i.size}` === key);
        if (existing) {
          existing.quantity += quantity;
        } else {
          items.push({
            _id: product._id,
            name: product.name,
            image: product.images?.[0],
            price: product.price,
            quantity,
            size,
            slug: product.slug,
          });
        }
        set({ items, isOpen: true });
      },

      updateQuantity: (id, size, quantity) => {
        set({
          items: get().items.map((i) =>
            i._id === id && i.size === size ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        });
      },

      removeItem: (id, size = '') => {
        set({ items: get().items.filter((i) => !(i._id === id && i.size === size)) });
      },

      clearCart: () => set({ items: [], coupon: null }),

      applyCoupon: (coupon) => set({ coupon }),

      getSubtotal: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),

      getDiscount: () => {
        const coupon = get().coupon;
        const sub = get().getSubtotal();
        if (!coupon) return 0;
        return coupon.discountType === 'percent'
          ? (sub * coupon.discountValue) / 100
          : coupon.discountValue;
      },

      getShipping: () => (get().getSubtotal() >= FREE_SHIPPING ? 0 : 79),

      getTotal: () => {
        const sub = get().getSubtotal();
        const discount = get().getDiscount();
        const shipping = get().getShipping();
        const tax = Math.round((sub - discount) * 0.18);
        return sub - discount + shipping + tax;
      },

      getItemCount: () => get().items.reduce((s, i) => s + i.quantity, 0),

      getShippingProgress: () => Math.min(100, (get().getSubtotal() / FREE_SHIPPING) * 100),
    }),
    { name: 'cart-storage' }
  )
);
