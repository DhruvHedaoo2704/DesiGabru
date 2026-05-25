import { Link, Outlet, Navigate } from 'react-router-dom';
import { FiGrid, FiPackage, FiShoppingCart, FiUsers, FiTag, FiFileText, FiLogOut } from 'react-icons/fi';
import { useAuthStore } from '../store/useAuthStore';

const links = [
  { to: '/admin', icon: FiGrid, label: 'Dashboard' },
  { to: '/admin/products', icon: FiPackage, label: 'Products' },
  { to: '/admin/orders', icon: FiShoppingCart, label: 'Orders' },
  { to: '/admin/users', icon: FiUsers, label: 'Users' },
  { to: '/admin/coupons', icon: FiTag, label: 'Coupons' },
  { to: '/admin/blogs', icon: FiFileText, label: 'Blogs' },
];

export default function AdminLayout() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#050505] flex">
      <aside className="w-64 glass border-r border-[#D4AF37]/10 p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8" style={{ fontFamily: 'Orbitron' }}>
          <span className="text-gradient-gold">ADMIN</span>
        </h2>
        <nav className="space-y-2">
          {links.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors text-sm"
            >
              <Icon /> {label}
            </Link>
          ))}
        </nav>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 mt-8 text-red-400 text-sm w-full"
        >
          <FiLogOut /> Logout
        </button>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
