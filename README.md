---

**Student Name**: Akash Prasad M  
**Roll No**: CB.SC.U4CSE23703  
**Student Name**: Akash B 
**Roll No**: CB.SC.U4CSE23703  
**Student Name**: Charanjith   
**Roll No**: CB.SC.U4CSE23713  
**Project**: CareSphere - Modern Hospital Management System

---

# CareSphere - Hospital Management System

CareSphere is a modern, full-stack Hospital Management System (HMS) built using the **MERN Stack**. It provides a comprehensive solution for managing patient records, appointments, and hospital workflows with a focus on ease of use and predictive analytics.

## 🚀 Key Features

*   **Multi-Role Dashboards**: Specialized premium interfaces for **Doctors, Patients, and Receptionists**.
*   **Patient Management**: Full CRUD operations for patient records with advanced filtering.
*   **Appointment Lifecycle**: Integrated scheduling system with status tracking.
*   **AI Chatbot Assistant**: Intelligent symptom triage and FAQ assistant for patients.
*   **Predictive Analytics (ML)**: 
    *   **Patient Volume Forecasting**: Linear regression model for predicting admission trends.
    *   **Medical Supply Forecast**: Real-time monitoring and demand prediction for hospital inventory.
    *   **No-Show Risk Analysis**: Data-driven risk assessment for scheduled appointments.
*   **Modern UI/UX**: Responsive design built with **React**, **Tailwind CSS**, and **Framer Motion** for a premium "Glassmorphism" aesthetic.

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, Recharts |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose ODM (Atlas Cloud Integration) |
| **Security** | JWT Authentication, Bcrypt Password Hashing, CORS Protection |
| **Analytics** | Regression.js + Custom ML Heuristics |

## 📁 Project Architecture

```text
mern-hospital-management/
├── server/                 # Backend Core (Express.js)
│   ├── config/             # Connection & Environment Setup
│   ├── controllers/        # Business Logic & CRUD Handlers
│   ├── models/             # Mongoose Schemas (User, Patient, Doctor, Appointment)
│   ├── routes/             # API endpoints
│   └── server.js           # Entry point (Port 5000)
├── src/                    # Frontend (React + Vite)
│   ├── components/         # Reusable UI components
│   ├── pages/              # Dashboard and Auth pages
│   ├── context/            # Auth state management
│   ├── App.jsx             # Main routing logic
│   └── main.jsx            # React entry point
├── public/                 # Static assets
├── tailwind.config.js      # CSS configuration
└── vite.config.js          # Build tool configuration
```

## 📡 Essential API Reference

| Method | Endpoint | Purpose |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Secure JWT-based Authentication |
| `PUT` | `/api/auth/profile/:email` | Dynamic Profile Management (Case-Insensitive) |
| `GET` | `/api/patients` | Comprehensive Patient Directory Access |
| `GET` | `/api/doctors` | Real-time Specialist Availability |
| `GET` | `/api/forecast` | ML-driven Inventory Demand Prediction |
| `GET` | `/api/stats` | Live Hospital Capacity & Billing Metrics |

## 🚦 Setup Instructions

### 1. Database Configuration
Ensure you have a MongoDB instance running. Configure the `MONGO_URI` in the `.env` file within the `server` directory.

### 2. Backend Initialization
```bash
cd server
npm install
npm start
```

### 3. Frontend Initialization
```bash
# In a new terminal from the root folder
npm install
npm run dev
```

### 4. Default Port Access
*   **Backend**: `http://localhost:5000`
*   **Frontend**: `http://localhost:5173`

---

**Developed with ❤️ by Akash Prasad M (CB.SC.U4CSE23703)**
