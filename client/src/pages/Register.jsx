import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useAuthStore } from '../store/useAuthStore';
import { useUIStore } from '../store/useUIStore';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const register = useAuthStore((s) => s.register);
  const addToast = useUIStore((s) => s.addToast);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(form.name, form.email, form.password);
    if (result.success) {
      addToast('Account created!');
      navigate('/dashboard');
    } else {
      addToast(result.message, 'error');
    }
  };

  return (
    <>
      <SEO title="Register" />
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-center" style={{ fontFamily: 'Orbitron' }}>
            Join the <span className="text-gradient-gold">Tribe</span>
          </h1>
          {['name', 'email', 'password'].map((f) => (
            <input
              key={f}
              className="input-field capitalize"
              type={f === 'password' ? 'password' : f === 'email' ? 'email' : 'text'}
              placeholder={f}
              value={form[f]}
              onChange={(e) => setForm({ ...form, [f]: e.target.value })}
              required
            />
          ))}
          <button type="submit" className="btn-primary w-full">Create Account</button>
          <p className="text-center text-sm text-gray-400">
            Have an account? <Link to="/login" className="text-[#D4AF37]">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}
