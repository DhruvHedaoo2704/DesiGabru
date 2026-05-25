import { useEffect, useState } from 'react';
import { getDashboard } from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboard()
      .then((r) => setStats(r.data.stats))
      .catch(() =>
        setStats({
          totalOrders: 0,
          totalProducts: 8,
          totalUsers: 2,
          totalRevenue: 0,
          pendingOrders: 0,
          salesChart: [],
        })
      );
  }, []);

  const cards = [
    { label: 'Revenue', value: `₹${stats?.totalRevenue?.toLocaleString() || 0}`, color: '#D4AF37' },
    { label: 'Orders', value: stats?.totalOrders || 0 },
    { label: 'Products', value: stats?.totalProducts || 0 },
    { label: 'Users', value: stats?.totalUsers || 0 },
    { label: 'Pending', value: stats?.pendingOrders || 0 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Orbitron' }}>Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {cards.map((c) => (
          <div key={c.label} className="glass p-6 rounded-2xl">
            <p className="text-gray-400 text-sm">{c.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: c.color || '#F5F5F5' }}>
              {c.value}
            </p>
          </div>
        ))}
      </div>
      {stats?.lowStock?.length > 0 && (
        <div className="glass p-6 rounded-2xl">
          <h3 className="font-semibold text-[#D4AF37] mb-4">Low Stock Alert</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {stats.lowStock.map((p) => (
              <li key={p._id}>{p.name} — {p.stock} left</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
