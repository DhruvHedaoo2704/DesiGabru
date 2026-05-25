import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { forgotPassword } from '../services/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
    } catch {
      /* demo */
    }
    setSent(true);
  };

  return (
    <>
      <SEO title="Forgot Password" />
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-center" style={{ fontFamily: 'Orbitron' }}>Reset Password</h1>
          {sent ? (
            <p className="text-gray-400 text-center">If that email exists, a reset link has been sent.</p>
          ) : (
            <>
              <input className="input-field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button type="submit" className="btn-primary w-full">Send Reset Link</button>
            </>
          )}
          <Link to="/login" className="text-[#D4AF37] text-sm block text-center">Back to Login</Link>
        </form>
      </div>
    </>
  );
}
