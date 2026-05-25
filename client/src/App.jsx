import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import { PageLoader } from './components/Skeleton';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Bundles = lazy(() => import('./pages/Bundles'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminCoupons = lazy(() => import('./pages/admin/AdminCoupons'));
const AdminBlogs = lazy(() => import('./pages/admin/AdminBlogs'));

function Lazy({ children }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Lazy><Home /></Lazy>} />
        <Route path="products" element={<Lazy><Products /></Lazy>} />
        <Route path="product/:slug" element={<Lazy><ProductDetail /></Lazy>} />
        <Route path="bundles" element={<Lazy><Bundles /></Lazy>} />
        <Route path="checkout" element={<Lazy><Checkout /></Lazy>} />
        <Route path="blog" element={<Lazy><Blog /></Lazy>} />
        <Route path="blog/:slug" element={<Lazy><BlogDetail /></Lazy>} />
        <Route path="contact" element={<Lazy><Contact /></Lazy>} />
        <Route path="login" element={<Lazy><Login /></Lazy>} />
        <Route path="register" element={<Lazy><Register /></Lazy>} />
        <Route path="forgot-password" element={<Lazy><ForgotPassword /></Lazy>} />
        <Route path="reset-password/:token" element={<Lazy><ResetPassword /></Lazy>} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Lazy><Dashboard /></Lazy>
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Lazy><AdminDashboard /></Lazy>} />
        <Route path="products" element={<Lazy><AdminProducts /></Lazy>} />
        <Route path="orders" element={<Lazy><AdminOrders /></Lazy>} />
        <Route path="users" element={<Lazy><AdminUsers /></Lazy>} />
        <Route path="coupons" element={<Lazy><AdminCoupons /></Lazy>} />
        <Route path="blogs" element={<Lazy><AdminBlogs /></Lazy>} />
      </Route>
    </Routes>
  );
}
