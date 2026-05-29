# 🎓 Student Management System

A full-stack **MERN** (MongoDB, Express, React, Node.js) application for managing student records through a secure admin dashboard. Features complete CRUD operations, JWT authentication, file uploads, Zod validation, and a premium responsive dark-themed UI.

---

## 📁 Project Structure

```
student-management-system/
├── server/                          # Backend API
│   ├── src/
│   │   ├── config/db.js             # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js     # Login, profile
│   │   │   └── studentController.js  # CRUD + search/filter
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js     # JWT verification
│   │   │   ├── errorMiddleware.js    # Centralized error handler
│   │   │   ├── uploadMiddleware.js   # Multer photo uploads
│   │   │   └── validateMiddleware.js # Zod validation runner
│   │   ├── models/
│   │   │   ├── Admin.js              # Admin user schema
│   │   │   └── Student.js           # Student schema (all fields)
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── studentRoutes.js
│   │   ├── utils/
│   │   │   ├── ApiError.js           # Custom error class
│   │   │   └── ApiResponse.js        # Standard response helpers
│   │   ├── validators/
│   │   │   ├── authValidator.js      # Zod auth schemas
│   │   │   └── studentValidator.js   # Zod student schemas
│   │   └── app.js                    # Express app config
│   ├── uploads/                      # Photo uploads directory
│   ├── server.js                     # Entry point
│   ├── seed.js                       # Default admin seeder
│   ├── .env.example
│   └── package.json
│
├── client/                          # Frontend React App
│   ├── src/
│   │   ├── api/axios.js              # Axios instance + interceptors
│   │   ├── components/
│   │   │   ├── layout/               # Sidebar, Header, DashboardLayout
│   │   │   ├── students/             # Table, Form, Card, Search, Filter, DeleteModal
│   │   │   └── ui/                   # Button, Input, Select, Modal, Loader, Pagination
│   │   ├── context/AuthContext.jsx   # Auth state + persistence
│   │   ├── hooks/                    # useStudents, useDebounce
│   │   ├── pages/                    # Login, Dashboard, StudentsList, Add, Edit, View
│   │   ├── routes/                   # AppRoutes, ProtectedRoute
│   │   ├── utils/constants.js        # Dropdown options
│   │   ├── validators/studentSchema.js  # Zod form schemas
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css                 # Tailwind + custom styles
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## ⚡ Tech Stack

| Layer          | Technology                                            |
|----------------|-------------------------------------------------------|
| **Frontend**   | React 18, Vite 5, Tailwind CSS 3, React Router 6     |
| **Forms**      | React Hook Form + Zod + @hookform/resolvers           |
| **HTTP**       | Axios with interceptors                               |
| **Icons**      | Lucide React                                          |
| **Backend**    | Node.js, Express.js                                   |
| **Database**   | MongoDB + Mongoose                                    |
| **Auth**       | JWT (jsonwebtoken) + bcryptjs                         |
| **Uploads**    | Multer (disk storage, image-only, 2MB limit)          |
| **Validation** | Zod (both client and server)                          |
| **Security**   | Helmet, CORS, input sanitization                      |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ installed
- **MongoDB** running locally or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string
- **npm** (comes with Node.js)

### Step 1: Clone & Navigate

```bash
cd d:\goldenresponse\student-management-system
```

### Step 2: Setup the Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
copy .env.example .env
```

Edit the `.env` file with your values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student_management
JWT_SECRET=change_this_to_a_strong_random_secret_key_12345
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

> **Using MongoDB Atlas?** Replace the `MONGODB_URI` with your Atlas connection string:
> `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/student_management`

```bash
# Seed the default admin account
npm run seed

# Start the development server
npm run dev
```

The server will start on `http://localhost:5000`.

### Step 3: Setup the Frontend

```bash
# Open a new terminal
cd d:\goldenresponse\student-management-system\client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:5173`.

### Step 4: Login

Open `http://localhost:5173` in your browser and login with:

| Field    | Value              |
|----------|--------------------|
| Email    | `admin@example.com`|
| Password | `Admin@123`        |

---

## 🔐 Environment Variables

### Server `.env`

| Variable       | Description                        | Default                                      |
|----------------|------------------------------------|----------------------------------------------|
| `PORT`         | Server port                        | `5000`                                       |
| `MONGODB_URI`  | MongoDB connection string          | `mongodb://localhost:27017/student_management`|
| `JWT_SECRET`   | Secret key for signing JWTs        | *(must be changed!)*                         |
| `JWT_EXPIRES_IN`| JWT token expiry duration         | `7d`                                         |
| `NODE_ENV`     | Environment (development/production)| `development`                               |

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All student endpoints require the `Authorization` header:
```
Authorization: Bearer <jwt_token>
```

---

### Auth Endpoints

#### `POST /api/auth/login`
Authenticate admin and receive JWT token.

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "_id": "6838abc123def456",
      "name": "Admin",
      "email": "admin@example.com"
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

#### `GET /api/auth/profile`
Get current admin profile. **Requires Auth.**

**Response (200):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "_id": "6838abc123def456",
    "name": "Admin",
    "email": "admin@example.com",
    "createdAt": "2026-05-29T10:00:00.000Z"
  }
}
```

---

### Student Endpoints (All Require Auth)

#### `POST /api/students`
Create a new student record. Supports multipart/form-data for photo upload.

**Request (multipart/form-data):**
```
fullName: John Doe
email: john.doe@example.com
dateOfBirth: 2002-05-15
gender: Male
mobileNumber: 9876543210
alternateMobile: 9123456780
fatherName: Robert Doe
motherName: Jane Doe
fatherMobile: 9876543211
motherMobile: 9876543212
guardianName: Uncle Bob
guardianContact: 9876543213
tenthPercentage: 85.5
twelfthPercentage: 78.2
boardOfEducation: CBSE
currentCourse: B.Tech Computer Science
rollNumber: CS2024001
admissionNumber: ADM2024001
passingYear: 2028
caste: General
category: General
bloodGroup: B+
address: 123 Main Street, Sector 15
city: New Delhi
state: Delhi
country: India
pincode: 110001
photograph: [file: student_photo.jpg]
```

**Response (201):**
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "_id": "6838xyz789ghi012",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "dateOfBirth": "2002-05-15T00:00:00.000Z",
    "gender": "Male",
    "photograph": "/uploads/student-1717000000000-a1b2c3.jpg",
    "mobileNumber": "9876543210",
    "rollNumber": "CS2024001",
    "admissionNumber": "ADM2024001",
    "...": "all other fields"
  }
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Email format is invalid" },
    { "field": "mobileNumber", "message": "Mobile number must contain 10 digits" },
    { "field": "twelfthPercentage", "message": "12th percentage cannot exceed 100" }
  ]
}
```

---

#### `GET /api/students`
Get all students with pagination, sorting, filtering, and search.

**Query Parameters:**

| Param          | Type   | Default       | Description                            |
|----------------|--------|---------------|----------------------------------------|
| `page`         | number | `1`           | Page number                            |
| `limit`        | number | `10`          | Records per page                       |
| `sort`         | string | `-createdAt`  | Sort field (prefix `-` for descending) |
| `search`       | string | —             | Search in name, email, rollNumber      |
| `gender`       | string | —             | Filter by gender                       |
| `category`     | string | —             | Filter by category                     |
| `currentCourse`| string | —             | Filter by course                       |
| `passingYear`  | number | —             | Filter by passing year                 |

**Example Request:**
```
GET /api/students?page=1&limit=5&sort=fullName&search=john&gender=Male&category=General
```

**Response (200):**
```json
{
  "success": true,
  "message": "Students retrieved successfully",
  "data": {
    "students": [
      {
        "_id": "6838xyz789ghi012",
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "gender": "Male",
        "currentCourse": "B.Tech Computer Science",
        "rollNumber": "CS2024001",
        "photograph": "/uploads/student-1717000000000-a1b2c3.jpg",
        "...": "all fields"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 5,
      "totalPages": 1
    }
  }
}
```

---

#### `GET /api/students/search?q=searchterm`
Search students by name, email, or roll number.

**Example:**
```
GET /api/students/search?q=john&page=1&limit=10
```

---

#### `GET /api/students/:id`
Get a single student by ID.

**Response (200):**
```json
{
  "success": true,
  "message": "Student retrieved successfully",
  "data": {
    "_id": "6838xyz789ghi012",
    "fullName": "John Doe",
    "...": "all student fields"
  }
}
```

**Error (404):**
```json
{
  "success": false,
  "message": "Student not found"
}
```

---

#### `PUT /api/students/:id`
Update a student record. Supports multipart/form-data for photo update.

**Request (multipart/form-data):** Send only the fields you want to update.
```
fullName: John M. Doe
currentCourse: M.Tech Computer Science
photograph: [file: new_photo.jpg]
```

**Response (200):**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "_id": "6838xyz789ghi012",
    "fullName": "John M. Doe",
    "currentCourse": "M.Tech Computer Science",
    "...": "all updated fields"
  }
}
```

---

#### `DELETE /api/students/:id`
Delete a student record and their uploaded photo.

**Response (200):**
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

---

## 🛡️ Security Features

- **Password Hashing**: All passwords hashed with bcryptjs (10 salt rounds)
- **JWT Authentication**: Secure token-based auth on all API endpoints
- **Protected Routes**: Both frontend (React Router guards) and backend (middleware)
- **Helmet**: HTTP security headers
- **CORS**: Configured for frontend origin only
- **Input Validation**: Zod schemas on both client and server
- **File Upload Validation**: Image-only (JPEG/PNG/WebP), max 2MB
- **Centralized Error Handling**: No sensitive data leaked in error responses

---

## 🎨 UI Features

- **Dark Premium Theme**: Slate/gray backgrounds with indigo/violet accent gradients
- **Glassmorphism**: Frosted glass card effects with backdrop blur
- **Responsive**: Works on desktop, tablet, and mobile
- **Animated**: Page transitions, stagger animations, counters, hover effects
- **Custom Scrollbar**: Styled scrollbar matching the dark theme
- **Loading States**: Skeleton loaders, spinners, button loading states
- **Toast Notifications**: Success/error feedback via react-hot-toast
- **Confirmation Modals**: "Are you sure?" before deleting records
- **Search & Filter**: Debounced search, multi-filter dropdowns
- **Photo Upload**: Drag-and-drop zone with image preview

---

## 🧪 Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin@123"}'
```

### Create Student (with photo)
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "fullName=Jane Smith" \
  -F "email=jane.smith@example.com" \
  -F "dateOfBirth=2001-08-20" \
  -F "gender=Female" \
  -F "mobileNumber=9876543210" \
  -F "fatherName=David Smith" \
  -F "motherName=Mary Smith" \
  -F "fatherMobile=9876543211" \
  -F "motherMobile=9876543212" \
  -F "tenthPercentage=92" \
  -F "twelfthPercentage=88" \
  -F "boardOfEducation=CBSE" \
  -F "currentCourse=B.Tech Computer Science" \
  -F "rollNumber=CS2024002" \
  -F "admissionNumber=ADM2024002" \
  -F "passingYear=2028" \
  -F "category=General" \
  -F "bloodGroup=O+" \
  -F "address=456 Park Avenue" \
  -F "city=Mumbai" \
  -F "state=Maharashtra" \
  -F "country=India" \
  -F "pincode=400001" \
  -F "photograph=@/path/to/photo.jpg"
```

### Get All Students (paginated)
```bash
curl http://localhost:5000/api/students?page=1&limit=10 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Search Students
```bash
curl "http://localhost:5000/api/students/search?q=jane" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Single Student
```bash
curl http://localhost:5000/api/students/STUDENT_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Student
```bash
curl -X PUT http://localhost:5000/api/students/STUDENT_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "fullName=Jane M. Smith" \
  -F "currentCourse=M.Tech AI"
```

### Delete Student
```bash
curl -X DELETE http://localhost:5000/api/students/STUDENT_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📊 HTTP Status Codes

| Code | Meaning                | When Used                           |
|------|------------------------|-------------------------------------|
| 200  | OK                     | Successful GET, PUT, DELETE         |
| 201  | Created                | Successful POST (new resource)      |
| 400  | Bad Request            | Validation failures                 |
| 401  | Unauthorized           | Missing/invalid token, bad login    |
| 403  | Forbidden              | Insufficient permissions            |
| 404  | Not Found              | Resource doesn't exist              |
| 409  | Conflict               | Duplicate key (email, rollNumber)   |
| 500  | Internal Server Error  | Unexpected server failures          |

---

## 📝 License

This project is for educational and portfolio purposes.
