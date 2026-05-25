import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { resetPassword } from '../services/api';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(token, password);
      navigate('/login');
    } catch {
      alert('Reset failed or token expired');
    }
  };

  return (
    <>
      <SEO title="Reset Password" />
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-center" style={{ fontFamily: 'Orbitron' }}>New Password</h1>
          <input className="input-field" type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          <button type="submit" className="btn-primary w-full">Reset Password</button>
        </form>
      </div>
    </>
  );
}
