# Clinix Sphere - Doctor Dashboard

Modern and intuitive web dashboard for doctors built with React, Tailwind CSS, and Shadcn UI principles.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Backend API running on `http://localhost:5000`

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your backend API URL
# VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
doctor-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   └── PrescriptionModal.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Appointments.jsx
│   │   └── Prescriptions.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Features

### Authentication
- ✅ Secure JWT-based login
- ✅ Doctor-only access control
- ✅ Auto-redirect on authentication

### Dashboard
- ✅ Overview statistics (Total, Pending, Completed, Cancelled)
- ✅ Recent appointments table
- ✅ Visual stat cards with icons

### Appointments Management
- ✅ View all assigned appointments
- ✅ Search by patient name
- ✅ Filter by status
- ✅ Update appointment status
- ✅ Detailed patient information

### Prescriptions
- ✅ Create prescriptions for completed appointments
- ✅ Add multiple medicines with dosage and duration
- ✅ View all created prescriptions
- ✅ Organized prescription cards

## 🎨 UI Components

### Design System
- **Colors:** Primary Blue (#3B82F6)
- **Font:** Inter
- **Components:** Cards, Buttons, Badges, Forms
- **Layout:** Sidebar navigation with header

### Status Badges
- **Pending:** Yellow
- **Confirmed:** Blue
- **Completed:** Green
- **Cancelled:** Red

## 🔧 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

## 🔐 Demo Credentials

```
Email: sarah.johnson@clinix.com
Password: doctor123
```

## 🌐 API Integration

The dashboard communicates with the backend API using Axios. All endpoints require authentication.

### API Configuration
Configure the API URL in `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### Endpoints Used
- `POST /auth/login` - Doctor login
- `GET /appointments` - Get doctor's appointments
- `PATCH /appointments/:id/status` - Update status
- `GET /prescriptions` - Get prescriptions
- `POST /prescriptions` - Create prescription

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Date Formatting:** date-fns

## 🔒 Security

- JWT token stored in localStorage
- Automatic token refresh on API calls
- Auto-logout on token expiration
- Protected routes with authentication guards

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- ✅ Desktop (1920px+)
- ✅ Laptop (1024px+)
- ✅ Tablet (768px+)
- ✅ Mobile (320px+)

## 🎯 User Flow

1. Doctor logs in with credentials
2. Dashboard shows appointment statistics
3. Navigate to Appointments to view and manage
4. Update appointment status
5. Once marked "Completed", create prescription
6. Navigate to Prescriptions to view all

## 🐛 Troubleshooting

### Common Issues

**API Connection Error:**
- Ensure backend is running on correct port
- Check VITE_API_URL in .env file
- Verify CORS is enabled on backend

**Login Issues:**
- Only doctor accounts can access
- Verify credentials are correct
- Check backend logs for errors

**Build Errors:**
- Clear node_modules and reinstall
- Ensure Node.js version is 16+

## 📄 License

MIT

---

**Built with ❤️ for modern healthcare management**
