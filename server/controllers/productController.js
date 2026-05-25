import Product from '../models/Product.js';
import { APIFeatures } from '../utils/apiFeatures.js';

export const getProducts = async (req, res) => {
  const features = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;
  const total = await Product.countDocuments(
    req.query.category ? { category: req.query.category } : {}
  );

  res.json({ success: true, count: products.length, total, products });
};

export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('bundleItems', 'name images price');
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product });
};

export const getProductBySlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate('bundleItems');
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product });
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product });
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, message: 'Product removed' });
};

export const getFeatured = async (req, res) => {
  const products = await Product.find({ isFeatured: true }).limit(8);
  res.json({ success: true, products });
};

export const getTrending = async (req, res) => {
  const products = await Product.find({ isTrending: true }).limit(8);
  res.json({ success: true, products });
};

export const getBundles = async (req, res) => {
  const products = await Product.find({ isBundle: true });
  res.json({ success: true, products });
};

export const createReview = async (req, res) => {
  const { rating, comment, title } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  const already = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
  if (already) {
    return res.status(400).json({ success: false, message: 'Already reviewed' });
  }
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
    title,
  };
  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.ratings =
    product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;
  await product.save();
  res.status(201).json({ success: true, message: 'Review added' });
};

export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const products = await Product.find({ category });
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

