import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import SEO from '../components/SEO';
import { getBlogs } from '../services/api';
import { dummyBlogs, faqs } from '../utils/dummyData';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getBlogs()
      .then((r) => setBlogs(r.data.blogs))
      .catch(() => setBlogs(dummyBlogs));
  }, []);

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SEO title="Blog & FAQ" description="Grooming tips and frequently asked questions" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Orbitron' }}>
          Blog & <span className="text-gradient-gold">FAQ</span>
        </h1>
        <input
          type="search"
          placeholder="Search articles..."
          className="input-field max-w-md mb-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filtered.map((blog, i) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/blog/${blog.slug}`} className="glass rounded-2xl overflow-hidden block group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-[#B87333] mb-2">{blog.readTime} min read</p>
                  <h3 className="font-bold group-hover:text-[#D4AF37] transition-colors">{blog.title}</h3>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">{blog.excerpt}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'Orbitron' }}>FAQ</h2>
        <div className="max-w-2xl space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left font-medium"
              >
                {faq.q}
                <FiChevronDown className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-gray-400 text-sm">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
