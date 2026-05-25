import User from '../models/User.js';
import Wishlist from '../models/Wishlist.js';

export const getWishlist = async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, products: [] });
  }
  res.json({ success: true, wishlist });
};

export const toggleWishlist = async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, products: [] });
  }
  const productId = req.params.productId;
  const index = wishlist.products.findIndex((p) => p.toString() === productId);
  if (index > -1) {
    wishlist.products.splice(index, 1);
  } else {
    wishlist.products.push(productId);
  }
  await wishlist.save();
  await wishlist.populate('products');
  res.json({ success: true, wishlist });
};

export const addAddress = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (req.body.isDefault) {
    user.addresses.forEach((a) => (a.isDefault = false));
  }
  user.addresses.push(req.body);
  await user.save();
  res.json({ success: true, addresses: user.addresses });
};

export const updateAddress = async (req, res) => {
  const user = await User.findById(req.user._id);
  const addr = user.addresses.id(req.params.addressId);
  if (!addr) {
    return res.status(404).json({ success: false, message: 'Address not found' });
  }
  Object.assign(addr, req.body);
  await user.save();
  res.json({ success: true, addresses: user.addresses });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json({ success: true, users });
};
