import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import { getProductBySlug, getProducts } from '../services/api';
import { products } from '../../../server/data/products.js';
import { useCartStore } from '../store/useCartStore';
import { useUIStore } from '../store/useUIStore';
import { PageLoader } from '../components/Skeleton';

const tabs = ['Description', 'Ingredients', 'Reviews', 'Usage Guide'];

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useUIStore((s) => s.addToast);
  const addRecentlyViewed = useUIStore((s) => s.addRecentlyViewed);

  useEffect(() => {
    const load = () => {
      setLoading(true);
      const localProducts = products.map((p, index) => ({
        ...p,
        _id: p._id || String(index + 1),
      }));
      const p = localProducts.find((x) => x.slug === slug);
      if (p) {
        setProduct(p);
        addRecentlyViewed(p);
        const rel = localProducts.filter((x) => x.category === p.category && x.slug !== slug).slice(0, 4);
        setRelated(rel);
      } else {
        setProduct(null);
        setRelated([]);
      }
      setLoading(false);
    };
    load();
  }, [slug, addRecentlyViewed]);

  if (loading) return <PageLoader />;
  if (!product) return <p className="text-center py-20">Product not found</p>;

  return (
    <>
      <SEO title={product.name} description={product.description} />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            className="glass rounded-3xl overflow-hidden aspect-square relative"
            whileHover={{ scale: 1.02 }}
          >
            <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            <span className="absolute bottom-4 left-4 text-xs glass px-3 py-1 rounded-full">
              3D Viewer — drag to rotate (coming soon)
            </span>
          </motion.div>

          <div>
            <p className="text-[#B87333] uppercase text-sm tracking-wider">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4" style={{ fontFamily: 'Orbitron' }}>
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <FiStar className="text-[#D4AF37]" />
              <span>{product.ratings || 4.5}</span>
              <span className="text-gray-500">({product.numReviews || 0} reviews)</span>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-[#D4AF37]">₹{product.price}</span>
              {product.comparePrice > product.price && (
                <span className="text-gray-500 line-through">₹{product.comparePrice}</span>
              )}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center glass rounded-xl">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3"><FiMinus /></button>
                <span className="w-12 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3"><FiPlus /></button>
              </div>
              <button
                onClick={() => {
                  addItem(product, qty);
                  addToast('Added to cart');
                }}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <FiShoppingBag /> Add to Cart
              </button>
            </div>
            <Link
              to="/checkout"
              onClick={() => addItem(product, qty)}
              className="btn-outline w-full text-center block mb-8"
            >
              Buy Now
            </Link>

            <div className="flex gap-2 border-b border-[#D4AF37]/20 mb-4 overflow-x-auto">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setTab(i)}
                  className={`px-4 py-2 text-sm whitespace-nowrap ${
                    tab === i ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="text-gray-400 text-sm leading-relaxed">
              {tab === 0 && <p>{product.description}</p>}
              {tab === 1 && (
                <ul className="list-disc pl-5 space-y-1">
                  {(product.ingredients || ['Premium botanical blend']).map((ing) => (
                    <li key={ing}>{ing}</li>
                  ))}
                </ul>
              )}
              {tab === 2 && <p>Reviews coming soon. Be the first to review!</p>}
              {tab === 3 && <p>{product.usageGuide || 'Apply as directed for best results.'}</p>}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'Orbitron' }}>You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
