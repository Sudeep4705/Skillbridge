# 🚀 SkillBridge (MERN Stack Project)

SkillBridge is a role-based learning management system built using the MERN stack.
It enables institutions, trainers, and students to manage batches, sessions, and attendance efficiently.

---

## 🌐 Live URLs

* **Frontend:** https://skill-bri-dge.netlify.app
* **Backend:** https://skillbridge-2kec.onrender.com
* **API Base URL:** https://skillbridge-2kec.onrender.com

---

## 🔐 Demo Accounts (All Roles)

### 🏫 Institution

* Email: [demo1@gmail.com](demo1@gmail.com)
* Password: Demo1987654321@

### 👨‍🏫 Trainer

* Email: [demo2@gmail.com](demo2@gmail.com)
* Password: Demo2987654321@

### 👨‍🎓 Student

* Email: [demo3@gmail.com](demo3@gmail.com)
* Password: Demo3987654321@

### 📊 Programme Manager

* Email: [demo4@gmail.com](demo4@gmail.com)
* Password: Demo4987654321@

### 🛡️ Monitoring Officer

* Email: [demo5@gmail.com](demo5@gmail.com)
* Password: Demo5987654321@

---

## ⚙️ Setup Instructions (Run Locally)

### 🔹 1. Clone the repository

```bash
git clone https://github.com/Sudeep4705/Skillbridge
cd skillbridge
```

### 🔹 2. Backend Setup

```bash
cd backend
npm install
nodemon app.js
```

### 🔹 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 Schema Design Decisions

* **User Model**

  * Stores role-based users (Institution, Trainer, Student, Programme Manager, Monitoring Officer)
  * Role field is used for access control

* **Batch Model**

  * Contains:

    * `institutionId` → batch creator (institution)
    * `trainerIds` → assigned trainers
    * `studentIds` → enrolled students
  * This design supports multi-role relationships

* **Session Model**

  * Linked with `batchId`
  * Stores session timing and trainer info

* **Attendance Model**

  * Linked with `sessionId` and `studentId`
  * Prevents duplicate attendance marking

👉 Overall approach:
Relational references using MongoDB ObjectIds for flexibility and scalability.

---

## 🛠️ Stack Choices

### Frontend

* **React (Vite)** → fast development and performance
* **Tailwind CSS** → quick and clean UI styling

### Backend

* **Node.js + Express.js** → simple and scalable API handling

### Database

* **MongoDB (Mongoose)** → flexible schema design

### Authentication

* **JWT + Cookies**

  * Used cookies instead of localStorage for better security
  * Enabled `httpOnly`, `secure`, and `sameSite` for production

---

## ✅ Project Status

### ✔ Fully Working

* Authentication (login/logout)
* Role-based access control
* Batch creation (Trainer & Institution)
* Session creation (Trainer)
* Add students to batch
* Student attendance marking
* Attendance viewing (Trainer, Institution, Viewer roles)
* Deployment (Frontend + Backend)

---

### ⚠ Partially Done

* UI improvements (can be enhanced further)
* Student selection UX (basic dropdown implemented, can be upgraded to searchable)

---

### ❌ Skipped

* Advanced analytics/dashboard charts
* Pagination for large data
* Notifications system

---

## 🔮 One Thing I’d Do Differently

If I had more time, I would:

👉 Implement a **more advanced UI/UX system**

* Searchable dropdowns
* Better dashboard layout
* Real-time updates (WebSockets)

👉 Also improve:

* API optimization
* Error handling structure
* Reusable components

---

## 👨‍💻 Author

**Sudeep**
MERN Stack Developer

---
