import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import { getBundles } from '../services/api';
import { normalizeProducts } from '../utils/normalizeProducts';

export default function Bundles() {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBundles()
      .then((r) => {
        const list = normalizeProducts(r.data);
        setBundles(list);
      })
      .catch(() => setBundles([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title="Bundles & Combos" description="Save big with grooming bundles" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Orbitron' }}>
          Bundles & <span className="text-gradient-gold">Combos</span>
        </h1>
        <p className="text-gray-400 mb-12">Curated kits. Maximum vibe. Minimum spend.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {loading
            ? [...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-bg-secondary rounded-2xl animate-pulse border border-glass-border" />
              ))
            : bundles.map((b, i) => (
                <motion.div
                  key={b._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard product={b} />
                </motion.div>
              ))}
        </div>
        {!loading && bundles.length === 0 && (
          <p className="text-center text-gray-400 py-20">No bundles available at the moment.</p>
        )}
      </div>
    </>
  );
}
