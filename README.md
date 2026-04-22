# 💰 Expense Manager

A full-stack MERN (MongoDB, Express, React, Node.js) application for tracking daily expenses with a modern, glassmorphism UI.

🚀 **Live Demo:** https://expense-manager-frontend-3b6l.onrender.com

---

## ✨ Features

* 🔐 User Authentication (JWT + Bcrypt)
* 💸 Add, view, and delete expenses in real-time
* 📊 Dashboard with spending insights
* 📱 Fully responsive (mobile + desktop)
* 🎨 Modern glassmorphism UI with dark mode

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Deployment:** Render

---

## 📸 Screenshots

<img width="1265" height="904" alt="image" src="https://github.com/user-attachments/assets/d62891c5-683b-4705-a4c3-65d7b18d9559" />

<img width="1256" height="892" alt="image" src="https://github.com/user-attachments/assets/ab26b81e-a801-4873-8ce8-bf2b97759d24" />


* Dashboard view
* Add Expense UI
* Mobile responsive view

---

## 📁 Project Structure

Expense_Manager/
│── backend/
│── frontend/
│── README.md

---

## 🚀 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/aditya-mishra-007/Expense_Manager.git
cd Expense_Manager
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file in the **backend** folder:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

---

### 4. Run the Application

#### Start Backend

```bash
cd backend
npm start
```

#### Start Frontend

```bash
cd frontend
npm run dev
```

---

## 🔌 API Endpoints

* POST /api/auth/register
* POST /api/auth/login
* GET /api/expenses
* POST /api/expenses
* DELETE /api/expenses/:id

---

## 🌐 Deployment

* Frontend & Backend hosted on Render
* Database hosted on MongoDB Atlas

---

## 🎯 Purpose of the Project

Built to practice full-stack development using the MERN stack, implement secure authentication, and deploy a real-world application.

---

## 👨‍💻 Author

**Aditya Mishra**
GitHub: https://github.com/aditya-mishra-007
