# Desii Gabru — Premium MERN E-Commerce

Cyber-luxury men's grooming brand built with the MERN stack. Matte black UI, gold accents, 3D hero, Razorpay payments, admin panel, and full authentication.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 19, Vite, Tailwind CSS v4, Framer Motion, Three.js/R3F, Zustand, React Router |
| Backend | Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Razorpay, Nodemailer, Cloudinary |
| Deploy | Vercel (client), Render (server), MongoDB Atlas |

## Project Structure

```
Desi Gabru/
├── client/          # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── store/
│       ├── services/
│       └── utils/
├── server/          # Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── data/        # Seed script
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### 1. Backend

```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and secrets
npm install
npm run seed    # Seeds products, blogs, coupons, admin user
npm run dev     # http://localhost:5000
```

### 2. Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev     # http://localhost:5173
```

## Demo Accounts (after seed)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@desiigabru.com | admin123 |
| User | demo@desiigabru.com | demo123 |

## API Routes

- `POST /api/auth/register` — Register
- `POST /api/auth/login` — Login
- `GET /api/products` — List products (filter, search, sort)
- `GET /api/products/trending` — Trending products
- `GET /api/products/bundles` — Bundle products
- `POST /api/cart` — Add to cart (auth)
- `POST /api/orders` — Create order (auth)
- `POST /api/payment/razorpay/create` — Create Razorpay order
- `POST /api/payment/razorpay/verify` — Verify payment
- `GET /api/admin/dashboard` — Admin analytics
- `POST /api/contact/ai` — AI grooming assistant

## Environment Variables

### Server (`server/.env`)

```
MONGODB_URI=mongodb://localhost:27017/desii-gabru
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
SMTP_HOST=smtp.gmail.com
SMTP_EMAIL=your@gmail.com
SMTP_PASSWORD=app_password
```

### Client (`client/.env`)

```
VITE_API_URL=http://localhost:5000/api
```

## Deployment

### Frontend (Vercel)

1. Import `client` folder
2. Set `VITE_API_URL` to your Render API URL
3. Build command: `npm run build`
4. Output: `dist`

### Backend (Render)

1. New Web Service → root: `server`
2. Build: `npm install`
3. Start: `npm start`
4. Add env vars from `.env.example`
5. Use MongoDB Atlas connection string

### MongoDB Atlas

1. Create free cluster
2. Add IP `0.0.0.0/0` for dev (restrict in production)
3. Copy connection string to `MONGODB_URI`

## Features

- Homepage with 3D product bottle, particles, countdown, testimonials
- Product catalog with filters, search, sort
- Product detail with tabs, reviews, related products
- Bundles page with save badges
- Slide-in cart with shipping progress bar
- Razorpay checkout
- User dashboard with order tracking timeline
- Blog + FAQ accordion
- AI grooming chat assistant
- Admin: products, orders, users, coupons, analytics
- Dark/light mode, wishlist, recently viewed
- JWT auth, forgot/reset password
- Coupon codes (try `GABRU10`)

## License

MIT — Built for Desii Gabru brand showcase.
