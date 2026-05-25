import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiMinus, FiPlus, FiShoppingBag, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import { getProductBySlug, getProducts } from '../services/api';
import { useCartStore } from '../store/useCartStore';
import { useUIStore } from '../store/useUIStore';
import { PageLoader } from '../components/Skeleton';

const tabs = ['Description', 'Product Details', 'Ingredients', 'Reviews', 'Usage Guide'];

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useUIStore((s) => s.addToast);
  const addRecentlyViewed = useUIStore((s) => s.addRecentlyViewed);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await getProductBySlug(slug);
        console.log('📡 [Frontend] API response received:', data);
        if (data?.success && data?.product) {
          const p = data.product;
          console.log('📦 [Frontend] Product loaded successfully:', p.name, 'with productDetails:', p.productDetails);
          setProduct(p);
          addRecentlyViewed(p);
          setActiveImgIdx(0); // Reset active image on product change
          
          // Get other products in the same category
          const prodsRes = await getProducts({ category: p.category });
          if (prodsRes?.data?.products) {
            const rel = prodsRes.data.products.filter((x) => x.slug !== slug).slice(0, 4);
            setRelated(rel);
          } else {
            setRelated([]);
          }
        } else {
          setProduct(null);
          setRelated([]);
        }
      } catch (err) {
        console.error('Error fetching product detail:', err);
        setProduct(null);
        setRelated([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug, addRecentlyViewed]);

  const handlePrevImg = (e) => {
    e.stopPropagation();
    if (!product?.images || product.images.length <= 1) return;
    setActiveImgIdx((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImg = (e) => {
    e.stopPropagation();
    if (!product?.images || product.images.length <= 1) return;
    setActiveImgIdx((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <PageLoader />;
  if (!product) return <p className="text-center py-20">Product not found</p>;

  const seoDescription = Array.isArray(product?.description)
    ? product.description.join(' ')
    : product?.description || '';

  return (
    <>
      <SEO title={product?.name} description={seoDescription} />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            className="glass rounded-3xl overflow-hidden aspect-square relative"
            whileHover={{ scale: 1.02 }}
          >
            <img 
              src={product?.images?.[activeImgIdx] || product?.images?.[0]} 
              alt={product?.name} 
              className="w-full h-full object-cover" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1616390323981-fd529c7d7f9a?w=800&q=80&auto=format&fit=crop';
              }}
            />

            {/* Image Navigation Arrows */}
            {product?.images && product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImg}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/60 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-lg"
                  aria-label="Previous image"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImg}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/60 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-lg"
                  aria-label="Next image"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                  {product.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImgIdx(idx);
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        activeImgIdx === idx 
                          ? 'bg-[#D4AF37] scale-125 shadow-[0_0_8px_rgba(212,175,55,0.8)]' 
                          : 'bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            <span className="absolute bottom-4 left-4 text-xs glass px-3 py-1 rounded-full">
              3D Viewer — drag to rotate (coming soon)
            </span>
          </motion.div>

          <div>
            <p className="text-[#B87333] uppercase text-sm tracking-wider">{product?.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4" style={{ fontFamily: 'Orbitron' }}>
              {product?.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <FiStar className="text-[#D4AF37]" />
              <span>{product?.ratings || 4.5}</span>
              <span className="text-gray-500">({product?.numReviews || 0} reviews)</span>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-[#D4AF37]">₹{product?.price}</span>
              {product?.comparePrice > product?.price && (
                <span className="text-gray-500 line-through">₹{product?.comparePrice}</span>
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
              {tab === 0 && (
                <div className="space-y-3">
                  {Array.isArray(product?.description) ? (
                    product.description.map((line, idx) => {
                      const trimmed = line.trim();
                      const isTitle = trimmed.endsWith(':') || 
                                      /^(key features|ingredients|our big promise|usage guide|directions|features|promise|how to use)$/i.test(trimmed.replace(/\s*:\s*$/, ''));
                      return (
                        <p key={idx} className={isTitle ? 'text-[#D4AF37] font-semibold mt-4 text-base' : 'text-gray-300'}>
                          {line}
                        </p>
                      );
                    })
                  ) : (
                    <p>{product?.description}</p>
                  )}
                </div>
              )}
              {tab === 1 && (
                <div className="space-y-3">
                  {Array.isArray(product?.productDetails) ? (
                    product.productDetails.map((line, idx) => {
                      const trimmed = line.trim();
                      const isTitle = trimmed.endsWith(':') || 
                                      /^(key features|ingredients|our big promise|usage guide|directions|features|promise|how to use)$/i.test(trimmed.replace(/\s*:\s*$/, ''));
                      return (
                        <p key={idx} className={isTitle ? 'text-[#D4AF37] font-semibold mt-3 text-base' : 'text-gray-300'}>
                          {line}
                        </p>
                      );
                    })
                  ) : (
                    <p>{product?.productDetails || 'No details available.'}</p>
                  )}
                </div>
              )}
              {tab === 2 && (
                <ul className="list-disc pl-5 space-y-1">
                  {(product?.ingredients || ['Premium botanical blend']).map((ing) => (
                    <li key={ing}>{ing}</li>
                  ))}
                </ul>
              )}
              {tab === 3 && <p>Reviews coming soon. Be the first to review!</p>}
              {tab === 4 && <p>{product?.usageGuide || 'Apply as directed for best results.'}</p>}
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
