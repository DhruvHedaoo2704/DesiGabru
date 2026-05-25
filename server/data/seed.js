import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Blog from '../models/Blog.js';
import Coupon from '../models/Coupon.js';
import { products, categories, blogs, coupons } from './products.js';

dotenv.config();
connectDB();

const seed = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await Blog.deleteMany();
    await Coupon.deleteMany();

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@desiigabru.com',
      password: 'admin123',
      role: 'admin',
    });

    await User.create({
      name: 'Demo User',
      email: 'demo@desiigabru.com',
      password: 'demo123',
      loyaltyPoints: 250,
    });

    await Category.insertMany(categories);

    const createdProducts = await Product.insertMany(products);

    const kit = createdProducts.find((p) => p.slug === 'cyber-king-grooming-kit');
    const duo = createdProducts.find((p) => p.slug === 'alpha-beard-duo');
    if (kit) {
      kit.bundleItems = createdProducts
        .filter((p) => !p.isBundle)
        .slice(0, 5)
        .map((p) => p._id);
      await kit.save();
    }
    if (duo) {
      duo.bundleItems = createdProducts
        .filter((p) => ['royal-beard-elixir', 'midnight-beard-balm'].includes(p.slug))
        .map((p) => p._id);
      await duo.save();
    }

    await Blog.insertMany(blogs.map((b) => ({ ...b, author: admin._id })));
    await Coupon.insertMany(coupons);

    console.log('✅ Database seeded successfully');
    console.log('Admin: admin@desiigabru.com / admin123');
    console.log('Demo:  demo@desiigabru.com / demo123');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
