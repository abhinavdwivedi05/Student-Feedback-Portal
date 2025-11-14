# 🎓 Student Feedback Portal
_A Full-Stack Feedback Management System using Node.js, Express, MongoDB, HTML, CSS, JavaScript_

![Node](https://img.shields.io/badge/Backend-Node.js-blue)
![Express](https://img.shields.io/badge/API-Express.js-yellow)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20%2F%20CSS%20%2F%20JS-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📌 Project Overview
The **Student Feedback Portal** is a full-stack application designed for collecting structured course feedback from students and providing analytics & management features to administrators.

This system digitalizes the feedback process and enhances transparency, accuracy, and administration efficiency.

---

## 🚀 Features

### 👨‍🎓 Student Module
- Register & Login  
- View available courses  
- Submit feedback (rating + comments)  
- Edit previously submitted feedback  

### 👨‍💼 Admin Module
- Admin login  
- Add/manage courses  
- View all feedback in table  
- Visual analytics dashboard (Chart.js)  
- Export feedback as CSV  

---

## 🛠️ Tech Stack

### Frontend
- HTML  
- CSS  
- JavaScript  
- Chart.js  

### Backend
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT Authentication  
- bcrypt.js  

---

## 📁 Folder Structure

```
student-feedback-portal/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── index.html
    ├── signup.html
    ├── student-dashboard.html
    ├── feedback.html
    ├── admin-dashboard.html
    ├── analytics.html
    ├── css/
    └── js/
```

---

## 🖼️ Screenshots

> Add your screenshots inside `/screenshots` folder.

```
![Login Page](screenshots/login.png)
![Student Dashboard](screenshots/student_dashboard.png)
![Admin Dashboard](screenshots/admin_dashboard.png)
![Analytics](screenshots/analytics.png)
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/student-feedback-portal.git
cd student-feedback-portal
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/feedback_db
JWT_SECRET=your_secret_key
```

Run backend:
```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

#### Option A: Open Directly
Open:
```
frontend/index.html
```

#### Option B: Serve using node
```bash
cd frontend
npx serve -p 3000
```

App Runs At:
```
http://localhost:3000
```

---

## 📡 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register user |
| POST | `/api/auth/login` | Login |

### 📘 Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses/` | Get all courses |
| POST | `/api/courses/add` | Add course (admin) |

### ⭐ Feedback
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/feedback/submit` | Submit/update feedback |
| GET | `/api/feedback/all` | Admin – view all feedback |
| GET | `/api/feedback/export` | Export CSV |

---

## 📈 UML Diagrams

> Upload diagrams inside `/uml` folder.

- Use Case Diagram → `/uml/usecase.png`  
- Class Diagram → `/uml/classdiagram.png`  
- Sequence Diagram → `/uml/sequencediagram.png`

---

## 📄 Documentation

Add files inside `/docs` folder:

- SRS Document → `docs/SRS_with_Diagrams.pdf`
- Project Report → `docs/Student_Feedback_Project_Report.pdf`
- Viva PPT → `docs/Student_Feedback_Portal_Presentation.pptx`

---

## 🔐 Admin Setup

Signup normally → then change role in MongoDB Compass:

```
role: "admin"
```

---

## 👨‍💻 Author
**Abhinav Dwivedi**  
Full Stack Developer | Student Project  
GitHub: https://github.com/<your-username>

---

## 📜 License
This project is under the **MIT License**.

---

## ⭐ Support
If this project helped you, please ⭐ the repository!

