import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi';
import { useCartStore } from '../store/useCartStore';
import { useUIStore } from '../store/useUIStore';

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useUIStore((s) => s.toggleWishlist);
  const isWishlisted = useUIStore((s) => s.isWishlisted);
  const addToast = useUIStore((s) => s.addToast);

  const discount =
    product.comparePrice > product.price
      ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
      : 0;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative glass rounded-2xl overflow-hidden"
    >
      {discount > 0 && (
        <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#D4AF37] to-[#B87333] text-[#050505] text-xs font-bold px-2 py-1 rounded-full">
          -{discount}%
        </span>
      )}
      <button
        onClick={() => {
          toggleWishlist(product._id);
          addToast(isWishlisted(product._id) ? 'Removed from wishlist' : 'Added to wishlist');
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full glass hover:text-[#D4AF37] transition-colors"
      >
        <FiHeart className={isWishlisted(product._id) ? 'fill-[#D4AF37] text-[#D4AF37]' : ''} />
      </button>

      <Link to={`/product/${product.slug}`} className="block">
        <div className="aspect-square overflow-hidden bg-[#111]">
           <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1616390323981-fd529c7d7f9a?w=800&q=80&auto=format&fit=crop';
            }}
          />
        </div>
        <div className="p-4">
          <p className="text-xs text-[#B87333] uppercase tracking-wider mb-1">{product.category}</p>
          <h3 className="font-semibold text-sm md:text-base group-hover:text-[#D4AF37] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
            <FiStar className="text-[#D4AF37]" />
            <span>{product.ratings || 4.5}</span>
            <span>({product.numReviews || 0})</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[#D4AF37] font-bold">₹{product.price}</span>
            {product.comparePrice > product.price && (
              <span className="text-gray-500 line-through text-sm">₹{product.comparePrice}</span>
            )}
          </div>
        </div>
      </Link>

      <button
        onClick={() => {
          addItem(product);
          addToast(`${product.name} added to cart`);
        }}
        className="absolute bottom-4 right-4 p-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B87333] text-[#050505] opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
      >
        <FiShoppingBag />
      </button>
    </motion.div>
  );
}
