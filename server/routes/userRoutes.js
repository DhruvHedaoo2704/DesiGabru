import express from 'express';
import {
  getWishlist,
  toggleWishlist,
  addAddress,
  updateAddress,
  getAllUsers,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/wishlist', protect, getWishlist);
router.post('/wishlist/:productId', protect, toggleWishlist);
router.post('/addresses', protect, addAddress);
router.put('/addresses/:addressId', protect, updateAddress);
router.get('/', protect, authorize('admin'), getAllUsers);

export default router;
