# Authentication-Based E-Commerce Dashboard (React)

A responsive **E-Commerce Dashboard built with React** that demonstrates authentication, protected routes, product browsing, and cart management **without using a backend**. All user data and sessions are handled on the client using **localStorage**.

## 🚀 Features

### 🔐 Authentication

- User **registration and login**
- Credentials stored in **localStorage**
- **Protected routes** – users cannot access any page without logging in
- **Session-based authentication (5 minutes)**

### 📊 Dashboard

- Welcome message with user name
- Navigation to:
  - Products
  - Cart
  - Profile
  - Logout

- Displays remaining **session time**
- Clean layout with **navbar and sidebar**

### 🛍 Product Listing

- Products fetched from a **public API**
- Responsive **grid layout**
- Each product card shows:
  - Product image
  - Title
  - Price
  - Add to Cart button

- **Loading state** and **error handling**

### 🛒 Cart Management

- Add products to cart
- Prevent duplicate items
- Increase / decrease quantity
- Remove items from cart
- Display **item subtotal and cart total**

### 👤 User Profile

- View registered user details
- Edit:
  - Name
  - Email
  - Password

### 🎨 UI / UX

- Fully **responsive design**
- Clean **Tailwind CSS styling**
- Dark / Light mode support
- Consistent layout and spacing
- Loading indicators and empty states

---

## 🛠 Tech Stack

- **React (Vite)**
- **React Router**
- **Tailwind CSS**
- **LocalStorage for authentication and cart**
- **Public Product API (DummyJSON / FakeStore API)**

---

## 📂 Folder Structure

```
src
│
├── components
│   ├── layout
│   └── ui
│
├── hooks
│
├── pages
│   ├── Login
│   ├── Register
│   ├── Products
│   ├── Cart
│   └── Profile
│
├── store
│   ├── auth
│   └── cart
│
├── utils
└── App.jsx
```

---

## 🔑 Authentication Flow

### 1️⃣ Registration

Users register using:

- Name
- Email
- Password

Data is stored in **localStorage** and the user is redirected to login.

### 2️⃣ Login

Users log in using their email and password.

If credentials are valid:

- User is redirected to **Dashboard**
- A **5-minute session** is created.

If credentials are invalid:

- An error message is shown.

### 3️⃣ Session Management

- Session is stored in **localStorage**
- Automatically expires after **5 minutes**
- User is logged out when session expires.

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/JuhiPatel2005/E-commerce-dashboard.git
```

Navigate into the project:

```bash
cd ecommerce-auth-dashboard
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## 🌐 Deployment

The project is deployed using:

- **Vercel**

Live Demo: https://e-commerce-dashboard-cyan.vercel.app/

---

## 🎯 Key Concepts Demonstrated

- Client-side authentication
- Protected routes in React
- State management using React hooks
- Cart logic implementation
- API data fetching and error handling
- Responsive UI with Tailwind CSS
- Session timeout management

---

## ⭐ Bonus Features

- Product search and filtering
- Dark / Light mode
- Persistent cart using localStorage
- Custom hooks for authentication and cart management

---

## 📌 Conclusion

This project demonstrates how a **fully functional e-commerce dashboard can be built using only frontend technologies** while maintaining authentication, session management, and clean UI architecture.

It is designed as a **React interview practical task** to showcase frontend development skills including **state management, routing, UI design, and code structure**.
