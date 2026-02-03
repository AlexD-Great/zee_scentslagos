# Frontend Integration Guide for Backend Developer

## 🎯 Overview

This document explains how the frontend is structured and what API endpoints the backend needs to implement for full integration.

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   └── Footer.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   └── ...
├── store/              # State management (Zustand)
│   ├── useAuthStore.js
│   └── useCartStore.js
├── utils/              # Utilities
│   └── api.js          # API client and endpoints
└── App.jsx             # Main app component
```

---

## 🔧 Environment Variables

The frontend expects these environment variables in `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_API_TIMEOUT=30000
VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
VITE_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-xxxxx
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx
```

---

## 🔐 Authentication Flow

### How It Works:
1. User submits login/register form
2. Frontend calls `/auth/login` or `/auth/register`
3. Backend returns `{ user, token }`
4. Frontend stores token in localStorage
5. Frontend adds token to all subsequent requests via `Authorization: Bearer {token}`

### Required Endpoints:

#### POST `/auth/register`
**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+234 800 000 0000",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+234 800 000 0000",
    "createdAt": "2026-02-03T00:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/auth/login`
**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/auth/logout`
**Headers:** `Authorization: Bearer {token}`
**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### GET `/auth/profile`
**Headers:** `Authorization: Bearer {token}`
**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+234 800 000 0000",
    "addresses": [...],
    "orders": [...]
  }
}
```

---

## 🛍️ Products API

### GET `/products`
**Query Params:**
- `page` (number): Page number
- `limit` (number): Items per page
- `category` (string): Filter by category
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price
- `sort` (string): Sort by (price_asc, price_desc, name, newest)

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "id": "prod_123",
      "name": "Midnight Oud",
      "description": "A luxurious oriental fragrance...",
      "price": 45000,
      "comparePrice": 55000,
      "category": "Men",
      "images": [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
      ],
      "inStock": true,
      "stockQuantity": 50,
      "rating": 4.5,
      "reviewCount": 120,
      "tags": ["oriental", "woody", "spicy"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### GET `/products/:id`
**Response:**
```json
{
  "success": true,
  "product": {
    "id": "prod_123",
    "name": "Midnight Oud",
    "description": "A luxurious oriental fragrance...",
    "price": 45000,
    "category": "Men",
    "images": [...],
    "inStock": true,
    "stockQuantity": 50,
    "rating": 4.5,
    "reviews": [...]
  }
}
```

---

## 🛒 Shopping Cart API

### GET `/cart`
**Headers:** `Authorization: Bearer {token}`
**Response:**
```json
{
  "success": true,
  "cart": {
    "id": "cart_123",
    "items": [
      {
        "id": "item_123",
        "product": {
          "id": "prod_123",
          "name": "Midnight Oud",
          "price": 45000,
          "image": "https://example.com/image.jpg"
        },
        "quantity": 2,
        "price": 45000,
        "subtotal": 90000
      }
    ],
    "subtotal": 90000,
    "tax": 6750,
    "shipping": 2500,
    "total": 99250
  }
}
```

### POST `/cart/items`
**Headers:** `Authorization: Bearer {token}`
**Request:**
```json
{
  "productId": "prod_123",
  "quantity": 2
}
```

**Response:**
```json
{
  "success": true,
  "item": {
    "id": "item_123",
    "product": {...},
    "quantity": 2,
    "price": 45000
  }
}
```

### PUT `/cart/items/:itemId`
**Headers:** `Authorization: Bearer {token}`
**Request:**
```json
{
  "quantity": 3
}
```

### DELETE `/cart/items/:itemId`
**Headers:** `Authorization: Bearer {token}`

---

## 💳 Checkout & Orders API

### POST `/orders`
**Headers:** `Authorization: Bearer {token}`
**Request:**
```json
{
  "items": [
    {
      "productId": "prod_123",
      "quantity": 2,
      "price": 45000
    }
  ],
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "Lagos",
    "state": "Lagos",
    "zipCode": "100001",
    "phone": "+234 800 000 0000"
  },
  "paymentMethod": "paystack",
  "subtotal": 90000,
  "tax": 6750,
  "shipping": 2500,
  "total": 99250
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "order_123",
    "orderNumber": "ORD-2026-0001",
    "status": "pending",
    "items": [...],
    "total": 99250,
    "createdAt": "2026-02-03T00:00:00Z"
  }
}
```

### GET `/orders`
**Headers:** `Authorization: Bearer {token}`
**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "id": "order_123",
      "orderNumber": "ORD-2026-0001",
      "status": "delivered",
      "total": 99250,
      "createdAt": "2026-02-03T00:00:00Z",
      "items": [...]
    }
  ]
}
```

---

## 💰 Payment Integration

### Paystack

#### POST `/payments/paystack/initialize`
**Request:**
```json
{
  "orderId": "order_123",
  "amount": 99250,
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "authorization_url": "https://checkout.paystack.com/xxxxx",
  "access_code": "xxxxx",
  "reference": "ref_xxxxx"
}
```

#### GET `/payments/paystack/verify/:reference`
**Response:**
```json
{
  "success": true,
  "status": "success",
  "order": {
    "id": "order_123",
    "status": "paid"
  }
}
```

### Similar endpoints for Flutterwave, Stripe, and Crypto

---

## 📝 Product Reviews

### GET `/products/:productId/reviews`
**Response:**
```json
{
  "success": true,
  "reviews": [
    {
      "id": "review_123",
      "user": {
        "firstName": "John",
        "lastName": "D."
      },
      "rating": 5,
      "comment": "Amazing fragrance!",
      "createdAt": "2026-02-01T00:00:00Z"
    }
  ]
}
```

### POST `/products/:productId/reviews`
**Headers:** `Authorization: Bearer {token}`
**Request:**
```json
{
  "rating": 5,
  "comment": "Amazing fragrance!"
}
```

---

## 🔄 Error Handling

The frontend expects errors in this format:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": {
    "field1": "Field-specific error",
    "field2": "Another error"
  }
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## 🚀 Testing the Integration

### 1. Start Backend Server
```bash
# Your backend should run on http://localhost:5000
```

### 2. Update Frontend .env
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Frontend
```bash
npm run dev
```

### 4. Test Flow
1. Register a new user
2. Login
3. Browse products
4. Add items to cart
5. Proceed to checkout
6. Complete payment

---

## 📊 State Management

The frontend uses **Zustand** for state management:

- **useAuthStore**: Manages user authentication state
- **useCartStore**: Manages shopping cart state

Both stores automatically sync with localStorage and the backend API.

---

## 🔒 Security Notes

1. **Never expose secret keys** in the frontend
2. Only use **public keys** for payment gateways
3. **Validate all inputs** on the backend
4. **Sanitize user data** before storing
5. Use **HTTPS** in production
6. Implement **rate limiting** on sensitive endpoints
7. Use **JWT tokens** with expiration

---

## 📞 Frontend API Client

All API calls go through `src/utils/api.js`:

```javascript
import { authAPI, productsAPI, cartAPI } from './utils/api'

// Example usage:
const products = await productsAPI.getAll({ page: 1, limit: 20 })
const user = await authAPI.login({ email, password })
await cartAPI.add(productId, quantity)
```

---

## 🎨 Frontend Features Implemented

✅ User Authentication (Login/Register)
✅ Shopping Cart with Add/Remove/Update
✅ Product Listing with Search & Filters
✅ Checkout Flow
✅ Order Management
✅ User Dashboard
✅ Product Reviews
✅ Wishlist
✅ Payment Integration (Paystack, Flutterwave, Stripe, Crypto)
✅ Responsive Design
✅ Loading States & Error Handling
✅ Toast Notifications

---

## 🤝 Communication

**Frontend Developer:** Handles UI/UX, state management, API integration
**Backend Developer:** Handles database, business logic, API endpoints, authentication

**Coordination Points:**
1. API endpoint structure
2. Request/response formats
3. Error handling
4. Authentication flow
5. Payment gateway integration
6. Testing and debugging

---

**Questions? Contact the frontend developer for clarification on any endpoint requirements.**
