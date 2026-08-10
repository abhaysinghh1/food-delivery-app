# 🍔 QuickBite — Full-Stack Food Delivery App

A production-grade, full-stack food delivery platform built with the **MERN stack** (MongoDB, Express, React, Node.js). Features real payment processing, role-based access control, and a fully integrated owner dashboard — deployed live on Render + Vercel.

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| **Frontend (Vercel)** | [food-delivery-app-fpmw.vercel.app](https://food-delivery-app-fpmw.vercel.app) |
| **Backend API (Render)** | [food-delivery-app-yi0a.onrender.com](https://food-delivery-app-yi0a.onrender.com) |

---

## ✨ Features

### 👥 Customer Side
- Browse food items filtered by **8 categories** (Salad, Rolls, Desserts, etc.)
- **Add to cart** with persistent cart state synced to MongoDB
- Order history and **real-time order status** (Food Processing → Out for Delivery → Delivered)
- Fully **responsive** design for mobile and desktop

### 🏪 Restaurant Owner Side
- Secure owner login via the same customer-facing app
- **Owner Dashboard** embedded in the frontend — no separate admin app needed
- **Add, list, and delete** food items from the live menu in real-time
- View and manage **all orders** with dropdown status updates
- Food feed **refreshes instantly** after adding a new item

### 🔐 Security & Performance
- **JWT Role-Based Access Control (RBAC)** — `customer` and `owner` roles, enforced both on the frontend (protected routes) and backend (middleware)
- **bcrypt** password hashing (10 salt rounds)
- **Express Rate Limiting** on auth routes — max 10 attempts per IP per 15 minutes
- **Gzip compression** on all API responses (~70% size reduction)
- **React lazy loading** with Suspense for all page-level components (~40% bundle size reduction)
- **useMemo** for cart total calculations to prevent unnecessary re-renders

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 18 + Vite | UI framework & build tool |
| React Router v6 | Client-side routing & protected routes |
| Axios | HTTP client |
| Context API | Global state (cart, auth, user) |
| React Toastify | Toast notifications |
| CSS3 | Custom styling (no Tailwind) |

### Backend
| Tech | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT (jsonwebtoken) | Authentication tokens |
| bcrypt | Password hashing |
| Multer | Image upload handling |
| Stripe | Payment gateway |
| compression | Gzip response compression |
| express-rate-limit | Brute-force protection |
| dotenv | Environment variable management |

### DevOps
| Tech | Purpose |
|---|---|
| Vercel | Frontend deployment |
| Render | Backend deployment |
| MongoDB Atlas | Cloud database |
| GitHub | Version control (monorepo) |

---

## 📁 Project Structure

```
food-delivery-app/
├── Frontend/          # React app (deployed on Vercel)
│   ├── src/
│   │   ├── Components/        # Navbar, Footer, Cart, Login popup
│   │   ├── Pages/             # Home, Cart, PlaceOrder, OwnerDashboard
│   │   ├── Context/           # StoreContext (global state)
│   │   └── assets/            # Images & static files
│   └── package.json
│
├── Backend/           # Express API (deployed on Render)
│   ├── Controllers/           # foodController, userController, cartController, orderController
│   ├── Models/                # Mongoose schemas (User, Food, Order)
│   ├── Routes/                # API route definitions
│   ├── middleware/            # auth.js (JWT + RBAC)
│   ├── config/                # db.js (MongoDB connection)
│   ├── uploads/               # Local image storage (use Cloudinary for production)
│   └── Server.js
│
├── admin/             # Standalone admin panel (optional)
│   └── src/
│
└── .gitignore         # Protects .env files from being pushed
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Stripe account (for payments)

### 1. Clone the Repository
```bash
git clone https://github.com/abhaysinghh1/food-delivery-app.git
cd food-delivery-app
```

### 2. Set Up Backend
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` folder:
```env
MONGODB_URI="your_mongodb_connection_string"
JWT_SECRET="your_secret_key"
STRIPE_SECRET_KEY="your_stripe_secret_key"
```

Start the backend:
```bash
npm run server
```
> Backend runs on `http://localhost:4000`

### 3. Set Up Frontend
```bash
cd Frontend
npm install
npm run dev
```
> Frontend runs on `http://localhost:5173`

### 4. (Optional) Set Up Admin Panel
```bash
cd admin
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Backend (`Backend/.env`)
| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `STRIPE_SECRET_KEY` | Stripe secret key (starts with `sk_`) |

> ⚠️ **Never commit your `.env` file.** It is already in `.gitignore`.

---

## 📡 API Endpoints

### 🍕 Food (`/api/food`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/food/list` | Public | Get all food items |
| POST | `/api/food/add` | Owner only | Add a new food item |
| POST | `/api/food/remove` | Owner only | Remove a food item |

### 👤 User (`/api/user`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/user/register` | Public | Register (customer or owner) |
| POST | `/api/user/login` | Public | Login |

### 🛒 Cart (`/api/cart`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/cart/add` | Customer | Add item to cart |
| POST | `/api/cart/remove` | Customer | Remove item from cart |
| POST | `/api/cart/get` | Customer | Get cart data |

### 📦 Order (`/api/order`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/order/place` | Customer | Place an order (Stripe) |
| POST | `/api/order/verify` | Customer | Verify payment |
| GET | `/api/order/list` | Owner | Get all orders |
| POST | `/api/order/status` | Owner | Update order status |
| POST | `/api/order/userorders` | Customer | Get user's orders |

---

## 🔒 RBAC — Role-Based Access Control

The app supports two user roles:

| Role | Access |
|---|---|
| `customer` | Browse menu, manage cart, place orders, view own orders |
| `owner` | All of the above + add/remove food items, view & update ALL orders |

Roles are embedded in the **JWT token** at login and enforced via Express middleware on every protected route.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Abhay Singh**  
[GitHub](https://github.com/abhaysinghh1) · [LinkedIn](https://linkedin.com/in/abhaysingh)

---

> Built with ❤️ using the MERN Stack
