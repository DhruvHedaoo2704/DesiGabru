import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import SEO from '../components/SEO';
import Hero3D from '../components/Hero3D';
import Particles from '../components/Particles';
import ProductCard from '../components/ProductCard';
import { ProductSkeleton } from '../components/Skeleton';
import { getTrending, getFeatured } from '../services/api';
import { testimonials } from '../data/staticData.js';
import { normalizeProducts } from '../utils/normalizeProducts';
import ProductCarousel from '../components/ProductCarousel';
import slidePerfumeImg from './image.png';

const heroSlides = [
  {
    tagline: "✦ The New Era of Desii Attitude ✦",
    title: "For the Man Who Bends the Rules",
    description: "Formulated exclusively for the modern Desi icon. Cyber-luxury matte aesthetics meet gold-standard organic nourishment. Cleanse, stylize, and conquer.",
    actionText: "Shop Collection",
    actionLink: "/products",
    show3D: true
  },
  {
    tagline: "✦ Luxury Fine Fragrances ✦",
    title: "Unleash Your Dominant Aura",
    description: "Discover premium cologne formulas with deep woody notes and long-lasting projection. Engineered to make a statement that lingers all night.",
    actionText: "Explore Scents",
    actionLink: "/products?category=perfume",
    image: slidePerfumeImg
  },
  {
    tagline: "✦ Engineered Style Combos ✦",
    title: "Sculpt Your Ultimate Ritual",
    description: "Get high-performance beard growth oils, de-tan face pack packs, and matte hair waxes matched into curated, cost-saving bundles.",
    actionText: "Grab Bundle",
    actionLink: "/bundles",
    image: "https://images.unsplash.com/photo-1626015713026-d837d172406f?w=800&q=80&auto=format&fit=crop"
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const textFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

function Countdown() {
  const [time, setTime] = useState({ h: 12, m: 45, s: 30 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 23, m: 59, s: 59 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex gap-4 justify-center">
      {['h', 'm', 's'].map((k) => (
        <div key={k} className="glass px-4 py-3 rounded-xl text-center min-w-[70px]">
          <div className="text-2xl font-bold text-[#D4AF37]" style={{ fontFamily: 'Orbitron' }}>
            {String(time[k]).padStart(2, '0')}
          </div>
          <div className="text-xs text-gray-400 uppercase">{k === 'h' ? 'Hours' : k === 'm' ? 'Min' : 'Sec'}</div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slideIdx, setSlideIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const [t, f] = await Promise.all([getTrending(), getFeatured()]);
        const trendingList = normalizeProducts(t.data);
        const featuredList = normalizeProducts(f.data);
        setTrending(trendingList);
        setFeatured(featuredList);
      } catch {
        setTrending([]);
        setFeatured([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setSlideIdx((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setSlideIdx((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <>
      <SEO title="Home" description="Premium cyber-luxury men's grooming" />
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Luxury Backlight Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#D4AF37]/5 via-[#B87333]/1 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute right-[-10%] top-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse-slow" />
        
        <Particles count={50} />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-10 py-16">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slideIdx}
              custom={direction}
              variants={{
                enter: (dir) => ({
                  x: dir > 0 ? 100 : -100,
                  opacity: 0
                }),
                center: {
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.5, ease: 'easeInOut' }
                },
                exit: (dir) => ({
                  x: dir < 0 ? 100 : -100,
                  opacity: 0,
                  transition: { duration: 0.4, ease: 'easeInOut' }
                })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid lg:grid-cols-2 gap-12 items-center w-full min-h-[50vh]"
            >
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col justify-center"
              >
                <motion.p variants={textFadeUp} className="text-[#D4AF37] text-xs font-bold tracking-[0.4em] uppercase mb-4">
                  {heroSlides[slideIdx].tagline}
                </motion.p>
                <motion.h1 
                  variants={textFadeUp} 
                  className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6" 
                  style={{ fontFamily: 'Orbitron' }}
                >
                  {heroSlides[slideIdx].title}
                </motion.h1>
                <motion.p variants={textFadeUp} className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
                  {heroSlides[slideIdx].description}
                </motion.p>
                <motion.div variants={textFadeUp} className="flex flex-wrap gap-4">
                  <Link to={heroSlides[slideIdx].actionLink} className="btn-primary flex items-center gap-2 group shadow-lg shadow-[#D4AF37]/10 hover:shadow-[#D4AF37]/20 transition-all">
                    {heroSlides[slideIdx].actionText}
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/bundles" className="btn-outline hover:bg-white/5 transition-all">
                    View Bundles
                  </Link>
                </motion.div>
              </motion.div>
              
              <div className="relative flex items-center justify-center h-[350px] md:h-[450px]">
                {/* Glowing Aura Ring behind slide item */}
                <div className="absolute w-[320px] h-[320px] rounded-full border border-[#D4AF37]/10 bg-[#D4AF37]/2 blur-[60px] animate-pulse-slow pointer-events-none" />
                
                {heroSlides[slideIdx].show3D ? (
                  <div className="w-full relative z-10 h-full">
                    <Hero3D />
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                    className="relative z-10 rounded-3xl overflow-hidden glass p-4 max-w-md w-full shadow-2xl border border-white/10 group"
                  >
                    <img 
                      src={heroSlides[slideIdx].image} 
                      alt="Desii Gabru Premium Lineup" 
                      className="w-full h-[280px] md:h-[340px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1616390323981-fd529c7d7f9a?w=800&q=80&auto=format&fit=crop';
                      }}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Slideshow Controls */}
          <div className="flex justify-between items-center mt-8 relative z-20">
            <div className="flex gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > slideIdx ? 1 : -1);
                    setSlideIdx(i);
                  }}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border border-[#D4AF37]/20 ${
                    slideIdx === i ? 'bg-[#D4AF37] w-10 shadow-lg shadow-[#D4AF37]/20' : 'bg-white/10 hover:bg-white/30'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={handlePrev} 
                className="w-12 h-12 rounded-full border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:bg-white/5 transition-all text-xl font-bold glass"
              >
                ‹
              </button>
              <button 
                onClick={handleNext} 
                className="w-12 h-12 rounded-full border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:bg-white/5 transition-all text-xl font-bold glass"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Orbitron' }}>
            <span className="text-gradient-gold">Trending</span> Now
          </h2>
          <p className="text-gray-400">What the tribe is rocking</p>
        </div>
        <ProductCarousel products={trending} loading={loading} />
      </section>

      <section className="py-16 glass mx-4 md:mx-6 rounded-3xl max-w-7xl lg:mx-auto mb-20">
        <div className="text-center px-6">
          <h3 className="text-2xl font-bold mb-2 text-[#D4AF37]" style={{ fontFamily: 'Orbitron' }}>
            Flash Sale Ends In
          </h3>
          <p className="text-gray-400 mb-6">Extra 15% off bundles — limited time</p>
          <Countdown />
          <Link to="/bundles" className="btn-primary inline-block mt-8">Grab the Deal</Link>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'Orbitron' }}>
          Featured <span className="text-gradient-gold">Elite</span>
        </h2>
        <ProductCarousel products={featured} loading={loading} />
      </section>

      <section className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'Orbitron' }}>Tribe Voices</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl"
            >
              <p className="text-gray-300 italic mb-4">"{t.text}"</p>
              <p className="font-semibold text-[#D4AF37]">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Orbitron' }}>Our Story</h2>
        <p className="text-gray-400 leading-relaxed">
          Born at the intersection of Desi heritage and cyber-futurist design, Desii Gabru crafts grooming
          rituals for men who refuse to blend in. Every formula is lab-tested, every bottle is a statement.
        </p>
      </section>
    </>
  );
}
