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
        <div className="glass p-6 rounded-2xl mb-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B87333] flex items-center justify-center text-3xl font-bold text-[#050505]">
            {user?.name?.[0] || 'G'}
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Orbitron' }}>{user?.name}</h1>
            <p className="text-gray-400">{user?.email}</p>
            <p className="text-[#D4AF37] text-sm mt-1">{user?.loyaltyPoints || 0} loyalty points</p>
          </div>
        </div>

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
