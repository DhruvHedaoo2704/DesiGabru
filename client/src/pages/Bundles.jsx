import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiPackage } from 'react-icons/fi';
import SEO from '../components/SEO';
import { getBundles } from '../services/api';
import { normalizeProducts } from '../utils/normalizeProducts';
import { useCartStore } from '../store/useCartStore';
import { useUIStore } from '../store/useUIStore';

export default function Bundles() {
  const [bundles, setBundles] = useState([]);
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useUIStore((s) => s.addToast);

  useEffect(() => {
    getBundles()
      .then((r) => {
        const list = normalizeProducts(r.data);
        setBundles(list);
      })
      .catch(() => setBundles([]));
  }, []);

  return (
    <>
      <SEO title="Bundles & Combos" description="Save big with grooming bundles" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Orbitron' }}>
          Bundles & <span className="text-gradient-gold">Combos</span>
        </h1>
        <p className="text-gray-400 mb-12">Curated kits. Maximum vibe. Minimum spend.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {bundles.map((b, i) => (
            <motion.div
              key={b._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl overflow-hidden group relative"
            >
              {b.bundleSavePercent > 0 && (
                <span className="absolute top-4 right-4 z-10 bg-[#D4AF37] text-[#050505] font-bold px-3 py-1 rounded-full text-sm">
                  SAVE {b.bundleSavePercent}%
                </span>
              )}
              <div className="grid md:grid-cols-2">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={b.images?.[0]} 
                    alt={b.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1616390323981-fd529c7d7f9a?w=800&q=80&auto=format&fit=crop';
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <FiPackage className="text-[#D4AF37] mb-3" size={28} />
                  <h3 className="text-xl font-bold mb-2">{b.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {Array.isArray(b.description) ? b.description.join(' ') : b.description}
                  </p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-[#D4AF37]">₹{b.price}</span>
                    <span className="text-gray-500 line-through">₹{b.comparePrice}</span>
                  </div>
                  <div className="flex gap-3">
                    <Link to={`/product/${b.slug}`} className="btn-outline text-sm flex-1 text-center">
                      Details
                    </Link>
                    <button
                      onClick={() => {
                        addItem(b);
                        addToast('Bundle added to cart');
                      }}
                      className="btn-primary text-sm flex-1"
                    >
                      Add Bundle
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
