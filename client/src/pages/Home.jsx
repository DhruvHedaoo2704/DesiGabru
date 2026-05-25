import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import SEO from '../components/SEO';
import Hero3D from '../components/Hero3D';
import Particles from '../components/Particles';
import ProductCard from '../components/ProductCard';
import { ProductSkeleton } from '../components/Skeleton';
import { getTrending, getFeatured } from '../services/api';
import { dummyProducts, testimonials } from '../utils/dummyData';
import { normalizeProducts } from '../utils/normalizeProducts';

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

  return (
    <>
      <SEO title="Home" description="Premium cyber-luxury men's grooming" />
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Particles count={40} />
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 py-20">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[#B87333] text-sm tracking-[0.3em] uppercase mb-4">Cyber Luxury Grooming</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6" style={{ fontFamily: 'Orbitron' }}>
              For the Man Who{' '}
              <span className="text-gradient-gold block">Owns His Vibe</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-lg">
              Engineered for the modern Desi king. Matte black aesthetics meet gold-standard formulations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary flex items-center gap-2">
                Shop Collection <FiArrowRight />
              </Link>
              <Link to="/bundles" className="btn-outline">View Bundles</Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
            <Hero3D />
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Orbitron' }}>
            <span className="text-gradient-gold">Trending</span> Now
          </h2>
          <p className="text-gray-400">What the tribe is rocking</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {loading
            ? [...Array(4)].map((_, i) => <ProductSkeleton key={i} />)
            : trending.slice(0, 4).map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.slice(0, 4).map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
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
