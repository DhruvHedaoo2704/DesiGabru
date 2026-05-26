import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiHeart, FiMapPin, FiAward } from 'react-icons/fi';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import { getMyOrders } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';
import { useUIStore } from '../store/useUIStore';

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const wishlist = useUIStore((s) => s.wishlist);
  const recentlyViewed = useUIStore((s) => s.recentlyViewed);
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState('orders');

  useEffect(() => {
    getMyOrders()
      .then((r) => setOrders(r.data.orders))
      .catch(() => setOrders([]));
  }, []);

  const tabs = [
    { id: 'orders', icon: FiPackage, label: 'Orders' },
    { id: 'wishlist', icon: FiHeart, label: 'Wishlist' },
    { id: 'addresses', icon: FiMapPin, label: 'Addresses' },
    { id: 'loyalty', icon: FiAward, label: 'Loyalty' },
  ];

  return (
    <>
      <SEO title="My Dashboard" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {/* Premium VIP Elite Club Hero Card */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="relative overflow-hidden glass p-8 rounded-3xl mb-12 flex flex-col md:flex-row items-center gap-8 border border-[#D4AF37]/30 shadow-xl shadow-[#D4AF37]/5 group"
        >
          {/* Animated golden gradient visual overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
          
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#B87333] to-[#D4AF37] p-[3px] shadow-lg shadow-[#D4AF37]/20">
              <div className="w-full h-full rounded-full bg-[#0d0d0d] flex items-center justify-center text-4xl font-extrabold text-[#D4AF37]" style={{ fontFamily: 'Orbitron' }}>
                {user?.name?.[0] || 'G'}
              </div>
            </div>
            {/* VIP Status Dot */}
            <span className="absolute bottom-1 right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-black"></span>
            </span>
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h1 className="text-3xl font-black tracking-wide text-gradient-gold" style={{ fontFamily: 'Orbitron' }}>
                {user?.name}
              </h1>
              <span className="text-[10px] tracking-widest font-bold bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full border border-[#D4AF37]/30 uppercase">
                ✦ Elite VIP ✦
              </span>
            </div>
            <p className="text-gray-400 text-sm font-medium">{user?.email}</p>
            <p className="text-xs text-gray-500 max-w-xl leading-relaxed">
              Welcome back to your ultimate grooming console. Level up your style ritual with premium formulations engineered for the modern Desi king.
            </p>
          </div>

          <div className="glass bg-white/5 border border-[#D4AF37]/10 p-6 rounded-2xl min-w-[200px] text-center shadow-inner relative overflow-hidden group-hover:border-[#D4AF37]/30 transition-colors">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Loyalty Console
            </div>
            <div className="text-3xl font-black text-[#D4AF37]" style={{ fontFamily: 'Orbitron' }}>
              {user?.loyaltyPoints || 0}
            </div>
            <div className="text-xs text-gray-500 mt-1">Available Points</div>
            <div className="w-full bg-[#111] h-1.5 rounded-full mt-3 overflow-hidden border border-[#D4AF37]/10">
              <div 
                className="bg-gradient-to-r from-[#D4AF37] to-[#B87333] h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, ((user?.loyaltyPoints || 0) / 1000) * 100)}%` }}
              />
            </div>
            <div className="text-[9px] text-gray-500 mt-1.5 flex justify-between">
              <span>Tier Progress</span>
              <span>{user?.loyaltyPoints || 0}/1000 pts</span>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-2 mb-8 overflow-x-auto">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm whitespace-nowrap ${
                tab === id ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'glass'
              }`}
            >
              <Icon /> {label}
            </button>
          ))}
        </div>

        {tab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <p className="text-gray-400">No orders yet. Start shopping!</p>
            ) : (
              orders.map((order) => (
                <motion.div key={order._id} className="glass p-6 rounded-2xl">
                  <div className="flex justify-between mb-4">
                    <span className="font-mono text-sm">#{order._id?.slice(-8)}</span>
                    <span className={`text-sm capitalize px-3 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-500/20 text-green-400' : 'bg-[#D4AF37]/20 text-[#D4AF37]'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-[#D4AF37] font-bold mb-4">₹{order.totalPrice}</p>
                  <div className="flex gap-2 overflow-x-auto">
                    {(order.trackingSteps || []).map((step, i) => (
                      <div key={i} className="flex items-center gap-2 shrink-0">
                        <div className={`w-3 h-3 rounded-full ${step.completed ? 'bg-[#D4AF37]' : 'bg-gray-600'}`} />
                        <span className="text-xs text-gray-400">{step.label}</span>
                        {i < (order.trackingSteps?.length || 0) - 1 && (
                          <div className="w-8 h-px bg-gray-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {tab === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <p className="text-gray-400">Your wishlist is empty.</p>
            ) : (
              <p className="text-gray-400">{wishlist.length} items saved — browse products to add more.</p>
            )}
          </div>
        )}

        {tab === 'addresses' && (
          <p className="text-gray-400">Add addresses during checkout or contact support.</p>
        )}

        {tab === 'loyalty' && (
          <div className="glass p-8 rounded-2xl text-center">
            <FiAward className="mx-auto text-[#D4AF37] mb-4" size={48} />
            <p className="text-4xl font-bold text-[#D4AF37]">{user?.loyaltyPoints || 0}</p>
            <p className="text-gray-400 mt-2">Earn 10 points per ₹100 spent</p>
          </div>
        )}

        {recentlyViewed.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold mb-6">Recently Viewed</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recentlyViewed.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
