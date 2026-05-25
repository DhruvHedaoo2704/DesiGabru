import { useEffect, useState } from 'react';
import { getCoupons, createCoupon } from '../../services/api';

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    code: '',
    discountType: 'percent',
    discountValue: 10,
    minOrderAmount: 500,
    maxUses: 100,
    expiresAt: '2027-12-31',
  });

  const load = () =>
    getCoupons()
      .then((r) => setCoupons(r.data.coupons))
      .catch(() => setCoupons([]));

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createCoupon(form);
      load();
      setForm({ ...form, code: '' });
    } catch {
      alert('API required');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Orbitron' }}>Coupons</h1>
      <form onSubmit={handleCreate} className="glass p-6 rounded-2xl mb-8 grid md:grid-cols-3 gap-4">
        <input className="input-field" placeholder="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required />
        <input className="input-field" type="number" placeholder="Discount value" value={form.discountValue} onChange={(e) => setForm({ ...form, discountValue: +e.target.value })} />
        <button type="submit" className="btn-primary">Create Coupon</button>
      </form>
      <div className="space-y-3">
        {coupons.map((c) => (
          <div key={c._id} className="glass p-4 rounded-xl flex justify-between">
            <span className="font-mono text-[#D4AF37]">{c.code}</span>
            <span>{c.discountValue}{c.discountType === 'percent' ? '%' : '₹'} off</span>
          </div>
        ))}
      </div>
    </div>
  );
}
