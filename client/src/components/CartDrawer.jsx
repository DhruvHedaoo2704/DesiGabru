import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { useCartStore } from '../store/useCartStore';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal, getShippingProgress, getTotal } =
    useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 h-full w-full max-w-md glass z-[101] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#D4AF37]/20">
              <h2 className="font-display text-xl font-bold text-gradient-gold" style={{ fontFamily: 'Orbitron' }}>
                Your Cart
              </h2>
              <button onClick={closeCart} className="p-2 hover:text-[#D4AF37]">
                <FiX size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <FiShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Your cart is empty</p>
                  <Link to="/products" onClick={closeCart} className="btn-primary inline-block mt-4 text-sm">
                    Shop Now
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item._id}-${item.size}`} className="flex gap-4 glass p-3 rounded-xl">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-[#D4AF37] font-bold">₹{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                          className="p-1 glass rounded"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className="p-1 glass rounded"
                        >
                          <FiPlus size={14} />
                        </button>
                        <button
                          onClick={() => removeItem(item._id, item.size)}
                          className="ml-auto text-red-400 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-[#D4AF37]/20 space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Free shipping at ₹999</span>
                    <span>{Math.round(getShippingProgress())}%</span>
                  </div>
                  <div className="h-1.5 bg-[#111] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B87333] transition-all"
                      style={{ width: `${getShippingProgress()}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-[#D4AF37]">₹{getTotal()}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="btn-primary w-full text-center block"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
