import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Coupon from '../models/Coupon.js';

export const getDashboardStats = async (req, res) => {
  const [totalOrders, totalProducts, totalUsers, orders] = await Promise.all([
    Order.countDocuments(),
    Product.countDocuments(),
    User.countDocuments({ role: 'user' }),
    Order.find({ isPaid: true }).select('totalPrice createdAt status'),
  ]);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const pendingOrders = await Order.countDocuments({ status: 'pending' });
  const lowStock = await Product.find({ stock: { $lt: 10 } }).select('name stock');

  const last30Days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayStart = new Date(d.setHours(0, 0, 0, 0));
    const dayEnd = new Date(d.setHours(23, 59, 59, 999));
    const dayOrders = orders.filter(
      (o) => o.createdAt >= dayStart && o.createdAt <= dayEnd
    );
    last30Days.push({
      date: dayStart.toISOString().split('T')[0],
      revenue: dayOrders.reduce((s, o) => s + o.totalPrice, 0),
      orders: dayOrders.length,
    });
  }

  res.json({
    success: true,
    stats: {
      totalOrders,
      totalProducts,
      totalUsers,
      totalRevenue,
      pendingOrders,
      lowStock,
      salesChart: last30Days,
    },
  });
};

export const getCoupons = async (req, res) => {
  const coupons = await Coupon.find({}).sort('-createdAt');
  res.json({ success: true, coupons });
};

export const createCoupon = async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json({ success: true, coupon });
};

export const updateCoupon = async (req, res) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, coupon });
};

export const deleteCoupon = async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Coupon deleted' });
};

export const validateCoupon = async (req, res) => {
  const coupon = await Coupon.findOne({
    code: req.params.code.toUpperCase(),
    isActive: true,
    expiresAt: { $gt: new Date() },
  });
  if (!coupon || coupon.usedCount >= coupon.maxUses) {
    return res.status(400).json({ success: false, message: 'Invalid or expired coupon' });
  }
  res.json({ success: true, coupon });
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'User deleted' });
};
