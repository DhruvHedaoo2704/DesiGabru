import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiYoutube, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-[#111] border-t border-[#D4AF37]/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Orbitron' }}>
            <span className="text-gradient-gold">DESII</span> GABRU
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premium cyber-luxury grooming for the man who owns his vibe.
          </p>
          <div className="flex gap-4 mt-6">
            {[FiInstagram, FiTwitter, FiYoutube, FiMail].map((Icon, i) => (
              <a key={i} href="#" className="p-2 glass rounded-full hover:text-[#D4AF37] transition-colors">
                <Icon />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-[#D4AF37] mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/products?category=beard" className="hover:text-[#D4AF37]">Beard Care</Link></li>
            <li><Link to="/products?category=face" className="hover:text-[#D4AF37]">Face Care</Link></li>
            <li><Link to="/products?category=hair" className="hover:text-[#D4AF37]">Hair Styling</Link></li>
            <li><Link to="/products?category=perfume" className="hover:text-[#D4AF37]">Perfume</Link></li>
            <li><Link to="/bundles" className="hover:text-[#D4AF37]">Bundles</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-[#D4AF37] mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/blog" className="hover:text-[#D4AF37]">Blog & FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-[#D4AF37]">Contact</Link></li>
            <li><Link to="/dashboard" className="hover:text-[#D4AF37]">Track Order</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-[#D4AF37] mb-4">Newsletter</h4>
          <p className="text-sm text-gray-400 mb-3">Get 10% off your first order</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Subscribed! Use code GABRU10');
            }}
            className="flex gap-2"
          >
            <input type="email" placeholder="Your email" className="input-field flex-1 text-sm" required />
            <button type="submit" className="btn-primary text-sm px-4">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-[#D4AF37]/10 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Desii Gabru. All rights reserved.
      </div>
    </footer>
  );
}
