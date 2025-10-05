# 🏥 Clinix Sphere

**Doctor–Patient Appointment & Digital Prescription System**

A modern, full-stack healthcare management platform enabling seamless appointment booking and digital prescription management.

## 🌟 Overview

**Clinix Sphere** consists of three main components:

- **Backend API** — Node.js + Express + MongoDB with JWT authentication
- **Doctor Dashboard** — React.js web app with Tailwind CSS & Shadcn UI
- **Patient Mobile App** — React Native (Expo) cross-platform mobile application

## 🏗️ Project Structure

```
Clinix-Sphere/
├── backend/              # Node.js + Express API
├── doctor-dashboard/     # React.js web application for doctors
├── patient-app/          # React Native (Expo) mobile app for patients
└── README.md            # This file
```

## 🔧 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT + bcrypt
- **Validation:** express-validator
- **Testing:** Jest + Supertest

### Doctor Dashboard (Web)
- **Framework:** React.js
- **Styling:** Tailwind CSS + Shadcn UI
- **HTTP Client:** Axios
- **State Management:** Context API
- **Icons:** Lucide React

### Patient App (Mobile)
- **Framework:** React Native (Expo)
- **Navigation:** React Navigation v6
- **HTTP Client:** Axios
- **UI Components:** React Native Paper / Custom styled components
- **State Management:** Context API

## 🚀 Features

### 👤 Authentication
- ✅ JWT-based authentication
- ✅ Role-based access control (Doctor/Patient)
- ✅ Secure password hashing with bcrypt
- ✅ Protected routes and middleware

### 📅 Appointment Management
**For Patients:**
- Browse all available doctors
- Book appointments with date, time, and reason
- Track appointment status (Pending, Confirmed, Completed, Cancelled)
- View appointment history

**For Doctors:**
- View all assigned appointments
- Update appointment status
- Filter and search appointments

### 💊 Digital Prescription System
**For Doctors:**
- Create detailed prescriptions after completing appointments
- Add symptoms, diagnosis, and multiple medicines
- Include dosage instructions and notes

**For Patients:**
- View all prescriptions linked to appointments
- Access prescription details anytime

## 📋 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login and get JWT token | No |
| GET | `/api/doctors` | Get all doctors | Yes |
| POST | `/api/appointments` | Create new appointment | Yes (Patient) |
| GET | `/api/appointments` | Get user's appointments | Yes |
| PATCH | `/api/appointments/:id/status` | Update appointment status | Yes (Doctor) |
| POST | `/api/prescriptions` | Create prescription | Yes (Doctor) |
| GET | `/api/prescriptions` | Get prescriptions | Yes |

## 🎨 UI Design

### Doctor Dashboard
- **Theme:** Light with soft shadows and rounded corners
- **Primary Color:** Blue (#3B82F6)
- **Layout:** Sidebar navigation with dashboard, appointments, and prescriptions
- **Components:** Clean forms, data tables with status badges, modal dialogs
- **Typography:** Inter/Poppins font family

### Patient Mobile App
- **Theme:** Minimal, clean, and modern
- **Color Scheme:** Blue (#2563EB) + White + Soft Gray
- **Screens:** Auth, Doctor list, Appointment booking, My appointments, Prescriptions
- **UX:** Intuitive navigation with bottom tabs and stack navigation

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas cloud database)
- npm or yarn
- Expo CLI (for mobile app development)
- Git

### 1️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

**Default Port:** `http://localhost:5000`

### 2️⃣ Doctor Dashboard Setup

```bash
cd doctor-dashboard
npm install
cp .env.example .env
# Edit .env with backend API URL
npm start
```

**Default Port:** `http://localhost:3000`

### 3️⃣ Patient App Setup

```bash
cd patient-app
npm install
cp .env.example .env
# Edit .env with backend API URL
npx expo start
```

**Run on:**
- iOS Simulator: Press `i`
- Android Emulator: Press `a`
- Physical device: Scan QR code with Expo Go app

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Test Scenarios Covered
- ✅ User registration (Doctor & Patient)
- ✅ User login with JWT issuance
- ✅ Appointment creation
- ✅ Appointment status updates
- ✅ Prescription creation
- ✅ Unauthorized access (401)
- ✅ Forbidden access (403)

## 📊 Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: Enum ['doctor', 'patient'],
  specialty: String (doctors only),
  phone: String,
  createdAt: Date
}
```

### Appointment
```javascript
{
  patient: ObjectId (ref: User),
  doctor: ObjectId (ref: User),
  date: Date,
  time: String,
  reason: String,
  status: Enum ['pending', 'confirmed', 'completed', 'cancelled'],
  createdAt: Date
}
```

### Prescription
```javascript
{
  appointment: ObjectId (ref: Appointment),
  doctor: ObjectId (ref: User),
  patient: ObjectId (ref: User),
  symptoms: String,
  diagnosis: String,
  medicines: [{
    name: String,
    dosage: String,
    duration: String
  }],
  notes: String,
  createdAt: Date
}
```

## 🔐 Environment Variables

### Backend
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Doctor Dashboard
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Patient App
```
EXPO_PUBLIC_API_URL=http://localhost:5000/api
```

## 🎯 User Flows

### Patient Journey
1. Register/Login → Home screen with doctor list
2. Select doctor → Book appointment (date, time, reason)
3. View "My Appointments" → Track status
4. Once completed → View prescription details

### Doctor Journey
1. Login → Dashboard with appointment statistics
2. View appointments → Update status
3. Mark as "Completed" → Prescription form opens
4. Fill prescription details → Submit
5. Patient can now view prescription

## 🛡️ Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ Role-based authorization middleware
- ✅ Input validation and sanitization
- ✅ Protected API endpoints
- ✅ CORS configuration

## 🌐 Deployment

### Live Application

- **GitHub Repository:** [https://github.com/Harshitkumar07/Clinix-Sphere](https://github.com/Harshitkumar07/Clinix-Sphere)
- **Backend API:** `https://your-backend.vercel.app` *(Update after deployment)*
- **Doctor Dashboard:** `https://your-dashboard.vercel.app` *(Update after deployment)*
- **Patient Mobile App:** Available via Expo Go *(Update QR code after deployment)*

### Deployment Guides

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md):
- ✅ **GitHub:** Push your code to GitHub repository
- ✅ **Vercel:** Deploy backend API and doctor dashboard
- ✅ **Expo:** Publish React Native patient app
- ✅ **MongoDB Atlas:** Cloud database setup

### Quick Deploy Commands

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy Clinix Sphere"
git push origin main

# 2. Deploy Backend (via Vercel CLI)
cd backend
vercel --prod

# 3. Deploy Doctor Dashboard (via Vercel CLI)
cd doctor-dashboard
vercel --prod

# 4. Publish Patient App (via Expo)
cd patient-app
expo publish
```

## 📱 Screenshots & Demo

*(Add screenshots here after deployment)*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Built with ❤️ for modern healthcare management

## 📞 Support

For issues and questions, please open an issue in the repository.

---

**Happy Coding! 🚀**
