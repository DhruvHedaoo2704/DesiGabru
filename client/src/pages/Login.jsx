import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useAuthStore } from '../store/useAuthStore';
import { useUIStore } from '../store/useUIStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((s) => s.login);
  const addToast = useUIStore((s) => s.addToast);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      addToast('Welcome back!');
      const user = useAuthStore.getState().user;
      navigate(user?.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      addToast(result.message, 'error');
    }
  };

  return (
    <>
      <SEO title="Login" />
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-center" style={{ fontFamily: 'Orbitron' }}>
            Welcome <span className="text-gradient-gold">Back</span>
          </h1>
          <input className="input-field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input-field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Link to="/forgot-password" className="text-sm text-[#D4AF37] block text-right">Forgot password?</Link>
          <button type="submit" className="btn-primary w-full">Login</button>
          <p className="text-center text-sm text-gray-400">
            No account? <Link to="/register" className="text-[#D4AF37]">Register</Link>
          </p>
          <p className="text-center text-xs text-gray-500">Demo: demo@desiigabru.com / demo123</p>
        </form>
      </div>
    </>
  );
}
