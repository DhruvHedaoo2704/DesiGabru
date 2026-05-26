import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiSearch,
  FiMic,
} from 'react-icons/fi';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useUIStore } from '../store/useUIStore';

const navLinks = [
  { to: '/products', label: 'Shop', children: ['Beard', 'Face', 'Hair', 'perfume'] },
  { to: '/bundles', label: 'Bundles' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const openCart = useCartStore((s) => s.openCart);
  const itemCount = useCartStore((s) => s.getItemCount());
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);

  const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl md:text-2xl tracking-wider" style={{ fontFamily: 'Orbitron' }}>
          <span className="text-gradient-gold">DESII</span>
          <span className="text-white ml-1">GABRU</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.to}
              className="relative"
              onMouseEnter={() => link.children && setDropdown(link.label)}
              onMouseLeave={() => setDropdown(null)}
            >
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-[#D4AF37] ${
                    isActive ? 'text-[#D4AF37]' : 'text-gray-300'
                  }`
                }
              >
                {link.label}
              </NavLink>
              <AnimatePresence>
                {dropdown === link.label && link.children && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 glass rounded-xl p-3 min-w-[140px]"
                  >
                    {link.children.map((c) => (
                      <Link
                        key={c}
                        to={`/products?category=${c.toLowerCase()}`}
                        className="block px-3 py-2 text-sm hover:text-[#D4AF37] rounded-lg hover:bg-white/5"
                      >
                        {c}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:text-[#D4AF37] hidden sm:block">
            <FiSearch />
          </button>
          <button onClick={toggleTheme} className="p-2 hover:text-[#D4AF37]">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          {user ? (
            <div 
              className="relative hidden sm:block"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <button className="p-2 hover:text-[#D4AF37] flex items-center gap-1.5 cursor-pointer">
                <FiUser />
                {user.avatar ? (
                  <img src={user.avatar} className="w-5 h-5 rounded-full object-cover border border-[#D4AF37]/20" />
                ) : null}
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 glass rounded-xl p-3 min-w-[160px] shadow-xl z-50 flex flex-col gap-1"
                  >
                    <div className="px-3 py-1.5 text-xs text-gray-400 border-b border-white/5 mb-1 font-semibold truncate">
                      {user.name}
                    </div>
                    <Link
                      to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                      className="px-3 py-2 text-sm hover:text-[#D4AF37] rounded-lg hover:bg-white/5 text-left block"
                      onClick={() => setProfileOpen(false)}
                    >
                      {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                        navigate('/');
                      }}
                      className="w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-lg text-left cursor-pointer"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className="p-2 hover:text-[#D4AF37] hidden sm:block"
            >
              <FiUser />
            </Link>
          )}
          <button onClick={openCart} className="p-2 hover:text-[#D4AF37] relative">
            <FiShoppingBag />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-[#050505] text-xs font-bold rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-[#D4AF37]/10 px-4 py-3"
          >
            <div className="max-w-xl mx-auto flex gap-2 relative">
              <input
                type="search"
                placeholder="Search products..."
                autoFocus
                className="input-field pr-12"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit();
                  }
                }}
              />
              <button 
                onClick={handleSearchSubmit} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37] p-2 transition-colors cursor-pointer"
                title="Search"
              >
                <FiSearch size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="lg:hidden border-t border-[#D4AF37]/10 overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 hover:text-[#D4AF37]">
                  {l.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="py-2 hover:text-[#D4AF37]">
                    Dashboard
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin/dashboard" onClick={() => setOpen(false)} className="py-2 hover:text-[#D4AF37]">
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                      navigate('/');
                    }}
                    className="py-2 text-red-400 hover:text-red-300 text-left cursor-pointer font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="py-2 hover:text-[#D4AF37]">
                  Account
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
