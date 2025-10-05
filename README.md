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
- **File Storage:** Vercel Blob Storage (for profile photos)
- **File Upload:** Multer
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

### 👤 Authentication & User Profile
- ✅ JWT-based authentication
- ✅ Role-based access control (Doctor/Patient)
- ✅ Secure password hashing with bcrypt
- ✅ Protected routes and middleware
- ✅ Profile photo upload with Vercel Blob Storage
- ✅ Update user profile information

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
| GET | `/api/users/profile` | Get current user profile | Yes |
| PATCH | `/api/users/profile` | Update user profile | Yes |
| POST | `/api/users/profile/photo` | Upload profile photo | Yes |
| DELETE | `/api/users/profile/photo` | Delete profile photo | Yes |
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
  profilePhoto: String (Vercel Blob URL),
  bio: String,
  experience: Number,
  location: String,
  education: String,
  licenseNumber: String,
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
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here
```

### Doctor Dashboard
```env
VITE_API_URL=http://localhost:5000/api
```

### Patient App
```env
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
- **Backend API:** `https://clinix-sphere-amber.vercel.app`
- **Doctor Dashboard:** *(Update after deployment)*
- **Patient Mobile App:** Available via Expo Go

---

## 🚀 Detailed Deployment Guide

### Prerequisites
- [Vercel Account](https://vercel.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier available)
- GitHub repository
- Vercel CLI (optional): `npm install -g vercel`

---

### 📦 Step 1: Prepare Backend for Deployment

#### 1.1 Install Dependencies
```bash
cd backend
npm install
```

#### 1.2 Configure Vercel Blob Storage

The app uses **Vercel Blob Storage** for profile photo uploads (serverless-compatible).

**Get your Blob token:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select or create your project
3. Navigate to **Storage** tab
4. Click **Create Database** → Select **Blob**
5. Name it (e.g., "clinix-uploads")
6. Copy the **BLOB_READ_WRITE_TOKEN**

#### 1.3 Set Environment Variables in Vercel

Go to your Vercel project → **Settings** → **Environment Variables**

Add the following variables:

| Variable | Value | Environments |
|----------|-------|-------------|
| `MONGODB_URI` | Your MongoDB Atlas connection string | All |
| `JWT_SECRET` | Your secure JWT secret key | All |
| `JWT_EXPIRES_IN` | `7d` | All |
| `NODE_ENV` | `production` | Production |
| `CORS_ORIGIN` | Your frontend URLs (comma-separated) | All |
| `BLOB_READ_WRITE_TOKEN` | Token from Vercel Blob | All |

**Example CORS_ORIGIN:**
```
https://your-dashboard.vercel.app,https://clinix-sphere-amber.vercel.app
```

#### 1.4 Deploy Backend to Vercel

**Option A - GitHub Integration (Recommended):**
1. Push code to GitHub
2. Import repository in Vercel
3. Vercel auto-detects settings from `vercel.json`
4. Deploy!

**Option B - Vercel CLI:**
```bash
cd backend
vercel --prod
```

---

### 🖥️ Step 2: Deploy Doctor Dashboard

#### 2.1 Update Environment Variables

Edit `doctor-dashboard/.env`:
```env
VITE_API_URL=https://clinix-sphere-amber.vercel.app/api
```

#### 2.2 Deploy to Vercel

**Option A - GitHub:**
1. Push to GitHub
2. Import in Vercel
3. Add environment variable `VITE_API_URL` in Vercel settings
4. Deploy

**Option B - CLI:**
```bash
cd doctor-dashboard
vercel --prod
```

---

### 📱 Step 3: Deploy Patient Mobile App (Expo)

#### 3.1 Update API URL

Edit `patient-app/.env`:
```env
EXPO_PUBLIC_API_URL=https://clinix-sphere-amber.vercel.app/api
```

#### 3.2 Publish to Expo

```bash
cd patient-app
npx expo publish
```

Or build standalone apps:
```bash
# Android APK
npx expo build:android

# iOS IPA
npx expo build:ios
```

---

### 🔧 Step 4: Post-Deployment Configuration

#### 4.1 Update CORS Settings

In Vercel, update `CORS_ORIGIN` environment variable with your deployed frontend URLs.

#### 4.2 Test Endpoints

Test your API:
```bash
curl https://clinix-sphere-amber.vercel.app/api/auth/login
```

#### 4.3 Seed Database (Optional)

```bash
# Run locally with production DB
cd backend
MONGODB_URI=your_atlas_uri npm run seed
```

---

### 🎯 Deployment Checklist

- [ ] MongoDB Atlas cluster created and whitelisted (IP: 0.0.0.0/0 for Vercel)
- [ ] Vercel Blob Storage created and token obtained
- [ ] All environment variables set in Vercel
- [ ] Backend deployed and accessible
- [ ] Doctor dashboard deployed with correct API URL
- [ ] Patient app published to Expo
- [ ] CORS configured for all frontend URLs
- [ ] Test user registration and login
- [ ] Test profile photo upload
- [ ] Test appointment creation
- [ ] Test prescription creation

---

### 🐛 Troubleshooting

#### Error: `ENOENT: no such file or directory, mkdir '/var/task/backend/uploads'`
**Solution:** This is fixed! The app now uses Vercel Blob Storage. Ensure `BLOB_READ_WRITE_TOKEN` is set in Vercel environment variables.

#### Error: `MongoNetworkError`
**Solution:** Whitelist Vercel IPs in MongoDB Atlas:
1. Go to MongoDB Atlas → Network Access
2. Add IP: `0.0.0.0/0` (Allow from anywhere)

#### Error: `CORS policy`
**Solution:** Add your frontend URL to `CORS_ORIGIN` environment variable in Vercel.

#### Vercel Blob Upload Fails
**Solution:**
1. Check if `BLOB_READ_WRITE_TOKEN` is set correctly
2. Verify token hasn't expired
3. Check Vercel Blob dashboard for storage quota

---

### 📊 Vercel Blob Storage - Free Tier

- **Storage:** 1 GB
- **Bandwidth:** 100 GB/month
- **Perfect for:** Profile photos, documents, images

---

### 🔄 Redeployment

For updates, simply push to GitHub:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel automatically redeploys on push.

---

### 📖 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Blob Storage Docs](https://vercel.com/docs/storage/vercel-blob)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [Expo Publishing Guide](https://docs.expo.dev/archive/classic-updates/publishing/)

For detailed step-by-step instructions, see **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)**

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
