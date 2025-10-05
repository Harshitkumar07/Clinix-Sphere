# Clinix Sphere - Patient Mobile App

Cross-platform mobile application for patients built with React Native and Expo.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (iOS/Android)
- Backend API running

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your backend API URL
# For local development on physical device:
# EXPO_PUBLIC_API_URL=http://YOUR_COMPUTER_IP:5000/api
# Example: EXPO_PUBLIC_API_URL=http://192.168.1.100:5000/api

# Start Expo development server
npm start
```

### Running the App

#### On iOS Simulator
```bash
npm run ios
```

#### On Android Emulator
```bash
npm run android
```

#### On Physical Device
1. Start the development server: `npm start`
2. Open Expo Go app on your phone
3. Scan the QR code displayed in terminal

## 📁 Project Structure

```
patient-app/
├── assets/              # Images, fonts, etc.
├── src/
│   ├── components/      # Reusable components
│   ├── context/
│   │   └── AuthContext.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── screens/
│   │   ├── Auth/
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── Home/
│   │   │   ├── HomeScreen.js
│   │   │   ├── DoctorDetailsScreen.js
│   │   │   └── BookAppointmentScreen.js
│   │   ├── Appointment/
│   │   │   └── AppointmentsScreen.js
│   │   ├── Prescription/
│   │   │   ├── PrescriptionsScreen.js
│   │   │   └── PrescriptionDetailsScreen.js
│   │   └── Profile/
│   │       └── ProfileScreen.js
│   ├── services/
│   │   └── api.js
│   └── theme.js
├── App.js
├── app.json
├── babel.config.js
└── package.json
```

## 🎨 Features

### Authentication
- ✅ Patient registration
- ✅ Login with JWT
- ✅ Secure token storage
- ✅ Auto-login on app restart

### Home & Doctors
- ✅ Browse all doctors
- ✅ Search by name or specialty
- ✅ View doctor details
- ✅ See doctor experience and contact info

### Appointments
- ✅ Book appointments with doctors
- ✅ Select date and time
- ✅ View all appointments
- ✅ Track appointment status
- ✅ Status badges (Pending, Confirmed, Completed, Cancelled)

### Prescriptions
- ✅ View all prescriptions
- ✅ See prescribed medicines
- ✅ View dosage and duration
- ✅ Doctor notes and diagnosis

### Profile
- ✅ View account information
- ✅ Logout functionality

## 🎨 UI/UX

### Design
- **Color Scheme:** Blue (#2563eb) primary with clean white backgrounds
- **Components:** React Native Paper (Material Design)
- **Icons:** Ionicons via @expo/vector-icons
- **Typography:** System fonts with clear hierarchy

### Navigation
- **Bottom Tabs:** Home, Appointments, Prescriptions, Profile
- **Stack Navigation:** For screen hierarchies
- **Smooth Transitions:** Native navigation animations

## 🔧 Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser
```

## 🔐 Demo Credentials

```
Email: john.doe@example.com
Password: patient123
```

## 🌐 API Configuration

### Local Development
When running on a physical device, use your computer's IP address:

```env
# Find your IP:
# Windows: ipconfig
# Mac/Linux: ifconfig

EXPO_PUBLIC_API_URL=http://192.168.1.100:5000/api
```

### Emulator/Simulator
```env
# Android Emulator
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000/api

# iOS Simulator (localhost works)
EXPO_PUBLIC_API_URL=http://localhost:5000/api
```

## 📱 Supported Platforms

- ✅ iOS (11.0+)
- ✅ Android (5.0+)
- ✅ Web (experimental)

## 🛠️ Tech Stack

- **Framework:** React Native with Expo
- **Navigation:** React Navigation v6
- **UI Library:** React Native Paper
- **HTTP Client:** Axios
- **Storage:** AsyncStorage
- **Icons:** Expo Vector Icons
- **Date Handling:** date-fns

## 🎯 User Flow

1. **Register/Login** → Patient creates account or signs in
2. **Browse Doctors** → Search and view doctor profiles
3. **Book Appointment** → Select doctor, date, time, and reason
4. **Track Appointments** → View status updates
5. **View Prescriptions** → Access digital prescriptions after visits
6. **Profile** → Manage account settings

## 🔒 Security

- JWT token authentication
- Secure token storage in AsyncStorage
- Auto-logout on token expiration
- Protected API endpoints
- No sensitive data in app state

## 🐛 Troubleshooting

### Common Issues

**Cannot connect to API:**
- Ensure backend is running
- Check API URL in .env (use computer IP for physical devices)
- Verify firewall isn't blocking connections

**Metro bundler issues:**
```bash
# Clear cache and restart
npx expo start -c
```

**Module not found:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

**iOS build errors:**
```bash
# For Mac users
cd ios && pod install && cd ..
```

## 📊 State Management

- **Auth State:** Context API for user authentication
- **Local State:** React hooks (useState, useEffect)
- **Navigation State:** React Navigation

## 🎨 Theming

The app uses React Native Paper's theming system with custom colors defined in `src/theme.js`.

### Primary Colors
- Primary: `#2563eb`
- Success: `#10b981`
- Warning: `#f59e0b`
- Error: `#ef4444`

## 📄 License

MIT

---

**Built with ❤️ for seamless healthcare access**
