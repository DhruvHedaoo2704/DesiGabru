import Order from '../models/Order.js';
import Product from '../models/Product.js';

const TAX_RATE = 0.18;
const FREE_SHIPPING_THRESHOLD = 999;

export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, couponCode } = req.body;

  if (!orderItems?.length) {
    return res.status(400).json({ success: false, message: 'No order items' });
  }

  const itemsPrice = orderItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
  let discount = 0;
  if (couponCode) {
    const Coupon = (await import('../models/Coupon.js')).default;
    const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
    if (coupon && coupon.expiresAt > new Date() && coupon.usedCount < coupon.maxUses) {
      discount =
        coupon.discountType === 'percent'
          ? (itemsPrice * coupon.discountValue) / 100
          : coupon.discountValue;
      coupon.usedCount += 1;
      await coupon.save();
    }
  }

  const shippingPrice = itemsPrice >= FREE_SHIPPING_THRESHOLD ? 0 : 79;
  const taxPrice = Math.round((itemsPrice - discount) * TAX_RATE);
  const totalPrice = itemsPrice + shippingPrice + taxPrice - discount;

  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock = Math.max(0, product.stock - item.quantity);
      await product.save();
    }
  }

  const trackingSteps = [
    { label: 'Order Placed', date: new Date(), completed: true },
    { label: 'Confirmed', date: null, completed: false },
    { label: 'Processing', date: null, completed: false },
    { label: 'Shipped', date: null, completed: false },
    { label: 'Delivered', date: null, completed: false },
  ];

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    discount,
    totalPrice,
    couponCode,
    trackingSteps,
  });

  res.status(201).json({ success: true, order });
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
  res.json({ success: true, orders });
};

export const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized' });
  }
  res.json({ success: true, order });
};

export const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = req.body;
  order.status = 'confirmed';
  order.trackingSteps[1] = { label: 'Confirmed', date: new Date(), completed: true };
  await order.save();
  res.json({ success: true, order });
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email').sort('-createdAt');
  res.json({ success: true, orders });
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  order.status = req.body.status;
  if (req.body.status === 'shipped') {
    order.trackingSteps[3] = { label: 'Shipped', date: new Date(), completed: true };
  }
  if (req.body.status === 'delivered') {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.trackingSteps[4] = { label: 'Delivered', date: new Date(), completed: true };
  }
  await order.save();
  res.json({ success: true, order });
};
