# Clinix Sphere - Backend API

RESTful API for the Clinix Sphere healthcare management system built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
# Add your MongoDB URI and JWT secret

# Seed database with sample doctors and patients
npm run seed

# Start development server
npm run dev
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── auth.controller.js   # Authentication logic
│   ├── doctor.controller.js # Doctor endpoints
│   ├── appointment.controller.js
│   └── prescription.controller.js
├── middleware/
│   ├── auth.middleware.js   # JWT verification
│   └── validator.middleware.js
├── models/
│   ├── User.model.js        # User schema (Doctor/Patient)
│   ├── Appointment.model.js
│   └── Prescription.model.js
├── routes/
│   ├── auth.routes.js
│   ├── doctor.routes.js
│   ├── appointment.routes.js
│   └── prescription.routes.js
├── tests/
│   └── auth.test.js         # Jest tests
├── utils/
│   └── seeder.js            # Database seeder
├── .env.example
├── package.json
└── server.js                # Entry point
```

## 🔐 Environment Variables

Create a `.env` file with the following:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "patient",
  "phone": "+1234567890"
}
```

**Login Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Doctors

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/doctors` | Get all doctors | Yes |
| GET | `/api/doctors/:id` | Get doctor by ID | Yes |

**Query Parameters:**
- `specialty` - Filter by specialty
- `search` - Search by name

### Appointments

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| POST | `/api/appointments` | Create appointment | Yes | Patient |
| GET | `/api/appointments` | Get appointments | Yes | Both |
| GET | `/api/appointments/:id` | Get appointment by ID | Yes | Both |
| PATCH | `/api/appointments/:id/status` | Update status | Yes | Doctor |
| DELETE | `/api/appointments/:id` | Cancel appointment | Yes | Both |

**Create Appointment Request:**
```json
{
  "doctorId": "doctor_id_here",
  "date": "2024-01-15",
  "time": "10:00 AM",
  "reason": "Regular checkup"
}
```

**Update Status Request:**
```json
{
  "status": "completed"
}
```

Status values: `pending`, `confirmed`, `completed`, `cancelled`

### Prescriptions

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| POST | `/api/prescriptions` | Create prescription | Yes | Doctor |
| GET | `/api/prescriptions` | Get prescriptions | Yes | Both |
| GET | `/api/prescriptions/:id` | Get prescription by ID | Yes | Both |
| PATCH | `/api/prescriptions/:id` | Update prescription | Yes | Doctor |

**Create Prescription Request:**
```json
{
  "appointmentId": "appointment_id_here",
  "symptoms": "Fever, headache, body pain",
  "diagnosis": "Viral fever",
  "medicines": [
    {
      "name": "Paracetamol",
      "dosage": "500mg",
      "duration": "3 days, twice daily"
    },
    {
      "name": "Vitamin C",
      "dosage": "1000mg",
      "duration": "5 days, once daily"
    }
  ],
  "notes": "Rest and drink plenty of fluids"
}
```

## 🔒 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

The token is returned upon successful login or registration.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in CI mode
npm run test:ci
```

## 🌱 Database Seeding

Seed the database with sample doctors and patients:

```bash
node utils/seeder.js
```

**Test Credentials:**
- **Doctor:** `sarah.johnson@clinix.com` / `doctor123`
- **Patient:** `john.doe@example.com` / `patient123`

## 🛠️ Scripts

```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
npm test         # Run Jest tests
npm run seed     # Seed database
```

## 📊 Database Models

### User
- name, email, password (hashed)
- role (doctor/patient)
- specialty (doctors only)
- phone, experience, avatar

### Appointment
- patient (ref: User)
- doctor (ref: User)
- date, time, reason
- status (pending/confirmed/completed/cancelled)

### Prescription
- appointment (ref: Appointment)
- doctor, patient (ref: User)
- symptoms, diagnosis
- medicines (array: name, dosage, duration)
- notes

## ⚠️ Error Handling

All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [...]
}
```

**HTTP Status Codes:**
- 200 - Success
- 201 - Created
- 400 - Bad Request
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 500 - Server Error

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT authentication
- ✅ Role-based authorization
- ✅ Input validation with express-validator
- ✅ CORS enabled
- ✅ Environment variables for secrets

## 📝 License

MIT

---

**Happy Coding! 🚀**
