import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

export const getCart = async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  res.json({ success: true, cart });
};

export const addToCart = async (req, res) => {
  const { productId, quantity = 1, size = '' } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const cart = await getOrCreateCart(req.user._id);
  const existing = cart.items.find(
    (i) => i.product.toString() === productId && i.size === size
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size,
      quantity,
    });
  }

  await cart.save();
  res.json({ success: true, cart });
};

export const updateCartItem = async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  const item = cart.items.id(req.params.itemId);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }
  item.quantity = req.body.quantity;
  await cart.save();
  res.json({ success: true, cart });
};

export const removeFromCart = async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  cart.items = cart.items.filter((i) => i._id.toString() !== req.params.itemId);
  await cart.save();
  res.json({ success: true, cart });
};

export const clearCart = async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  cart.items = [];
  await cart.save();
  res.json({ success: true, cart });
};

export const applyCoupon = async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  cart.couponCode = req.body.code;
  await cart.save();
  res.json({ success: true, cart });
};
