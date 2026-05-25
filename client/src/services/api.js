import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(err);
  }
);

export default api;

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const logout = () => api.post('/auth/logout');
export const getMe = () => api.get('/auth/me');
export const updateProfile = (data) => api.put('/auth/profile', data);
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
export const resetPassword = (token, password) =>
  api.put(`/auth/reset-password/${token}`, { password });

// Products
export const getProducts = (params) => api.get('/products', { params });
export const getProduct = (id) => api.get(`/products/${id}`);
export const getProductBySlug = (slug) => api.get(`/products/${slug}`);
export const getFeatured = () => api.get('/products/featured');
export const getTrending = () => api.get('/products/trending');
export const getBundles = () => api.get('/products/bundles');
export const createReview = (id, data) => api.post(`/products/${id}/reviews`, data);

// Cart
export const getCart = () => api.get('/cart');
export const addToCart = (data) => api.post('/cart', data);
export const updateCartItem = (itemId, quantity) =>
  api.put(`/cart/${itemId}`, { quantity });
export const removeFromCart = (itemId) => api.delete(`/cart/${itemId}`);

// Orders
export const createOrder = (data) => api.post('/orders', data);
export const getMyOrders = () => api.get('/orders/my');
export const getOrder = (id) => api.get(`/orders/${id}`);

// Payment
export const createRazorpayOrder = (orderId) =>
  api.post('/payment/razorpay/create', { orderId });
export const verifyPayment = (data) => api.post('/payment/razorpay/verify', data);

// Users
export const getWishlist = () => api.get('/users/wishlist');
export const toggleWishlist = (productId) => api.post(`/users/wishlist/${productId}`);
export const addAddress = (data) => api.post('/users/addresses', data);

// Blogs
export const getBlogs = (params) => api.get('/blogs', { params });
export const getBlog = (slug) => api.get(`/blogs/${slug}`);

// Contact
export const sendContact = (data) => api.post('/contact', data);
export const aiChat = (message) => api.post('/contact/ai', { message });

// Admin
export const getDashboard = () => api.get('/admin/dashboard');
export const getAllOrders = () => api.get('/orders');
export const updateOrderStatus = (id, status) =>
  api.put(`/orders/${id}/status`, { status });
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const getCoupons = () => api.get('/admin/coupons');
export const createCoupon = (data) => api.post('/admin/coupons', data);
export const validateCoupon = (code) => api.get(`/admin/coupons/validate/${code}`);
export const getAllUsers = () => api.get('/users');
