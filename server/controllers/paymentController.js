import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';

const getRazorpay = () =>
  new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

export const createRazorpayOrder = async (req, res) => {
  const order = await Order.findById(req.body.orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  const razorpay = getRazorpay();
  const options = {
    amount: Math.round(order.totalPrice * 100),
    currency: 'INR',
    receipt: `order_${order._id}`,
    notes: { orderId: order._id.toString() },
  };

  const razorpayOrder = await razorpay.orders.create(options);
  res.json({
    success: true,
    razorpayOrder,
    key: process.env.RAZORPAY_KEY_ID,
    amount: order.totalPrice,
  });
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expected !== razorpay_signature) {
    return res.status(400).json({ success: false, message: 'Invalid payment signature' });
  }

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: razorpay_payment_id,
    status: 'captured',
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  };
  order.status = 'confirmed';
  order.trackingSteps[1] = { label: 'Confirmed', date: new Date(), completed: true };
  await order.save();

  res.json({ success: true, order });
};
