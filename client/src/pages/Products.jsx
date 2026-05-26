import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import { ProductSkeleton } from '../components/Skeleton';
import { getProducts } from '../services/api';
import { normalizeProducts } from '../utils/normalizeProducts';

const categories = ['all', 'beard', 'face', 'hair', 'perfume'];

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceMax, setPriceMax] = useState(1500);
  const [sort, setSort] = useState('newest');

  const category = params.get('category') || 'all';
  const keyword = params.get('keyword') || '';

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const query = { limit: 1000 };
        if (category !== 'all') query.category = category;
        if (keyword) query.keyword = keyword;
        const { data } = await getProducts(query);
        const list = normalizeProducts(data);
        setProducts(list);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category, keyword]);

  const filtered = useMemo(() => {
    const safe = Array.isArray(products) ? products : [];
    let list = safe.filter((p) => p?.price <= priceMax);
    if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => (b.ratings || 0) - (a.ratings || 0));
    return list;
  }, [products, priceMax, sort]);

  return (
    <>
      <SEO title="Shop" description="Browse premium grooming products" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Orbitron' }}>
          The <span className="text-gradient-gold">Collection</span>
        </h1>
        <p className="text-gray-400 mb-10">Filter. Sort. Own your ritual.</p>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 shrink-0">
            <div className="glass p-6 rounded-2xl space-y-6 sticky top-24">
              <div>
                <h3 className="font-semibold text-[#D4AF37] mb-3">Category</h3>
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      const p = new URLSearchParams(params);
                      if (c === 'all') p.delete('category');
                      else p.set('category', c);
                      setParams(p);
                    }}
                    className={`block w-full text-left py-2 px-3 rounded-lg text-sm capitalize transition-colors ${
                      category === c ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'hover:bg-white/5'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div>
                <h3 className="font-semibold text-[#D4AF37] mb-3">Max Price: ₹{priceMax}</h3>
                <input
                  type="range"
                  min="200"
                  max="1500"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
              </div>
              <div>
                <h3 className="font-semibold text-[#D4AF37] mb-3">Sort</h3>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {loading
                ? [...Array(6)].map((_, i) => <ProductSkeleton key={i} />)
                : filtered.map((p, i) => (
                    <motion.div
                      key={p._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <ProductCard product={p} />
                    </motion.div>
                  ))}
            </div>
            {!loading && filtered.length === 0 && (
              <p className="text-center text-gray-400 py-20">No products match your filters.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
