import { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../../services/api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders()
      .then((r) => setOrders(r.data.orders))
      .catch(() => setOrders([]));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders((o) => o.map((ord) => (ord._id === id ? { ...ord, status } : ord)));
    } catch {
      alert('API required');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Orbitron' }}>Orders</h1>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o._id} className="glass p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-sm">#{o._id?.slice(-8)}</p>
              <p className="text-gray-400 text-sm">{o.user?.email || o.user}</p>
            </div>
            <p className="text-[#D4AF37] font-bold">₹{o.totalPrice}</p>
            <select
              value={o.status}
              onChange={(e) => updateStatus(o._id, e.target.value)}
              className="input-field w-auto text-sm"
            >
              {['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        ))}
        {orders.length === 0 && <p className="text-gray-400">No orders yet.</p>}
      </div>
    </div>
  );
}
