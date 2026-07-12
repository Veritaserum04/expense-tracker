# ExpenseFlow

A modern full-stack expense management application that helps users securely track, manage, and analyze their daily expenses with interactive dashboards and insightful analytics.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38BDF8?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Live Demo

🌐 **Frontend**

https://expenseflow-av.vercel.app

⚙️ **Backend API**

https://expense-tracker-backend-k88k.onrender.com

---

# 📖 Overview

ExpenseFlow is a secure and user-friendly expense management platform that enables users to record, organize, and analyze their financial transactions.

The application provides real-time insights through interactive charts, powerful filtering options, and an intuitive dashboard, making personal expense management simple and efficient.

---

#  Features

###  Authentication

- Secure JWT Authentication
- User Registration
- User Login
- Protected Routes

###  Expense Management

- Add Expenses
- Edit Expenses
- Delete Expenses
- Category Management
- Date Tracking

###  Dashboard Analytics

- Dashboard Summary Cards
- Monthly Expense Bar Chart
- Category-wise Pie Chart

###  Smart Filtering

- Search by Expense Title
- Filter by Category
- Filter by Date Range

###  Export

- Export Expenses to CSV

###  UI

- Fully Responsive
- Modern Tailwind CSS Design
- Toast Notifications
- Clean Dashboard Interface

---

#  Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- React Hot Toast
- Recharts

## Backend

- Node.js
- Express.js
- Prisma ORM
- JWT Authentication
- bcrypt

## Database

- PostgreSQL (Neon)

## Deployment

- Vercel
- Render

---

# 📂 Project Structure

```
ExpenseFlow
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── prisma
│   ├── src
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Veritaserum04/expense-tracker.git
```

Move into the project

```bash
cd expense-tracker
```

---

## Backend

```bash
cd backend

npm install

npx prisma generate

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Environment Variables

Backend `.env`

```env
DATABASE_URL=your_database_url

JWT_SECRET=your_secret_key
```

---

# Future Enhancements

- Dark Mode
- Budget Planning
- Recurring Expenses
- Expense Insights using AI
- Monthly Budget Alerts
- PDF Export
- Multi-Currency Support

---

# Author

**Amrutha V**

GitHub

https://github.com/Veritaserum04


# Support

If you like this project, consider giving it a ⭐ on GitHub!
