import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useUIStore } from '../store/useUIStore';
import { createOrder, createRazorpayOrder, verifyPayment } from '../services/api';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getSubtotal, getDiscount, getShipping, getTotal, clearCart, coupon, applyCoupon } =
    useCartStore();
  const user = useAuthStore((s) => s.user);
  const addToast = useUIStore((s) => s.addToast);
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.name || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!items.length) {
      addToast('Cart is empty', 'error');
      return;
    }
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const orderItems = items.map((i) => ({
        product: i._id,
        name: i.name,
        image: i.image,
        price: i.price,
        size: i.size,
        quantity: i.quantity,
      }));

      const { data: orderData } = await createOrder({
        orderItems,
        shippingAddress: form,
        paymentMethod: 'Razorpay',
        couponCode: coupon?.code,
      });

      const loaded = await loadRazorpay();
      if (!loaded) {
        addToast('Razorpay failed to load. Demo mode: order placed.', 'error');
        clearCart();
        navigate('/dashboard');
        return;
      }

      const { data: payData } = await createRazorpayOrder(orderData.order._id);

      const options = {
        key: payData.key,
        amount: payData.razorpayOrder.amount,
        currency: 'INR',
        name: 'Desii Gabru',
        description: 'Premium Grooming',
        order_id: payData.razorpayOrder.id,
        handler: async (response) => {
          await verifyPayment({
            ...response,
            orderId: orderData.order._id,
          });
          clearCart();
          addToast('Payment successful!');
          navigate('/dashboard');
        },
        prefill: { name: form.fullName, email: user.email, contact: form.phone },
        theme: { color: '#D4AF37' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      addToast(err.response?.data?.message || 'Checkout failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Checkout" />
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <h1 className="text-3xl font-bold mb-10" style={{ fontFamily: 'Orbitron' }}>Checkout</h1>
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#D4AF37]">Shipping Address</h2>
            {['fullName', 'phone', 'street', 'city', 'state', 'postalCode'].map((field) => (
              <input
                key={field}
                className="input-field capitalize"
                placeholder={field.replace(/([A-Z])/g, ' $1')}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                required
              />
            ))}
          </div>

          <div>
            <motion.div
              className="glass p-6 rounded-2xl mb-6 perspective-1000"
              whileHover={{ rotateY: 5 }}
            >
              <div className="h-40 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B87333] p-6 flex flex-col justify-between text-[#050505]">
                <div className="text-xs font-bold">DESII GABRU</div>
                <div className="text-lg font-mono tracking-widest">•••• •••• •••• 4242</div>
                <div className="flex justify-between text-sm font-semibold">
                  <span>{form.fullName || 'YOUR NAME'}</span>
                  <span>12/28</span>
                </div>
              </div>
            </motion.div>

            <div className="glass p-6 rounded-2xl space-y-3">
              <div className="flex gap-2 mb-4">
                <input
                  className="input-field flex-1 text-sm"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  type="button"
                  className="btn-outline text-sm px-4"
                  onClick={() => {
                    if (couponCode.toUpperCase() === 'GABRU10') {
                      applyCoupon({ code: 'GABRU10', discountType: 'percent', discountValue: 10 });
                      addToast('Coupon applied!');
                    } else {
                      addToast('Invalid coupon', 'error');
                    }
                  }}
                >
                  Apply
                </button>
              </div>
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>₹{getSubtotal()}</span></div>
              <div className="flex justify-between text-sm"><span>Discount</span><span>-₹{getDiscount()}</span></div>
              <div className="flex justify-between text-sm"><span>Shipping</span><span>₹{getShipping()}</span></div>
              <div className="flex justify-between text-sm"><span>Tax (18%)</span><span>₹{Math.round((getSubtotal() - getDiscount()) * 0.18)}</span></div>
              <div className="flex justify-between font-bold text-lg border-t border-[#D4AF37]/20 pt-3">
                <span>Total</span>
                <span className="text-[#D4AF37]">₹{getTotal()}</span>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full mt-4">
                {loading ? 'Processing...' : 'Pay with Razorpay'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
