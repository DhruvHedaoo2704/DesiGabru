import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../store/useUIStore';

export default function Toast() {
  const toasts = useUIStore((s) => s.toasts);
  return (
    <div className="fixed top-24 right-4 z-[9999] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className={`glass px-5 py-3 rounded-xl text-sm font-medium ${
              t.type === 'error' ? 'border-red-500/50 text-red-300' : 'border-[#D4AF37]/40 text-[#D4AF37]'
            }`}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
