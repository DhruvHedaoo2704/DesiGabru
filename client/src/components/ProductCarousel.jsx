import { useState, useRef, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from './ProductCard';

export default function ProductCarousel({ products = [], loading = false }) {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const cardWidth = container.firstElementChild?.offsetWidth || 280;
    const gap = 24; // gap is 24px (md:gap-6)
    
    const scrollOffset = direction === 'left' 
      ? - (cardWidth + gap) * 2 
      : (cardWidth + gap) * 2;
    
    container.scrollBy({
      left: scrollOffset,
      behavior: 'smooth',
    });
  };

  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      // Run once on load
      setTimeout(checkScroll, 100);
      // Handle window resize
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [products]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="aspect-square bg-bg-secondary rounded-2xl animate-pulse border border-glass-border" />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-400 py-10">No products available.</p>;
  }

  return (
    <div className="relative group/carousel px-4">
      {/* Navigation Buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center glass border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] shadow-lg backdrop-blur-md cursor-pointer transition-all hover:scale-110 opacity-100 md:opacity-0 group-hover/carousel:opacity-100 duration-300"
          aria-label="Slide Left"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center glass border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] shadow-lg backdrop-blur-md cursor-pointer transition-all hover:scale-110 opacity-100 md:opacity-0 group-hover/carousel:opacity-100 duration-300"
          aria-label="Slide Right"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Sliding Track */}
      <div
        ref={containerRef}
        onScroll={checkScroll}
        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-none py-4 px-2 -mx-2 scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            className="w-[calc(80vw-16px)] sm:w-[calc(45vw-16px)] md:w-[calc(30vw-20px)] lg:w-[calc(25vw-24px)] shrink-0 min-w-[200px] max-w-[280px]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
