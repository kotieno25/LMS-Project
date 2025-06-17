# Learning Management System (LMS)

A full-stack Learning Management System similar to Canvas LMS, built with the MERN stack.

## Features

- User authentication (Student, Instructor, Admin roles)
- Course management
- Module and content organization
- Assignment and quiz support
- File uploads
- Discussion forums
- Grade management
- Responsive design

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads

### Frontend
- React
- Redux Toolkit
- Material-UI
- Formik & Yup
- React Router
- Axios

## System Structure and Navigation

### User Roles and Access

1. **Student**
   - View available courses
   - Enroll in courses
   - Access course content
   - Submit assignments
   - Participate in discussions
   - View grades

2. **Instructor**
   - Create and manage courses
   - Add/Edit/Delete modules
   - Create assignments and quizzes
   - Grade submissions
   - Manage course enrollments
   - View student progress

3. **Admin**
   - All instructor privileges
   - Manage user accounts
   - System-wide settings
   - Access analytics

### Navigation Flow

1. **Authentication**
   - Login: `/login`
   - Registration: `/register`
   - Password Reset: `/reset-password`

2. **Dashboard**
   - Main dashboard: `/`
   - Course overview
   - Upcoming assignments
   - Recent activities
   - Quick access to enrolled courses

3. **Course Management**
   - Course listing: `/courses`
   - Course details: `/courses/:id`
   - Module view: `/courses/:id/modules/:moduleId`
   - Assignment view: `/courses/:id/assignments/:assignmentId`

4. **User Profile**
   - Profile page: `/profile`
   - Edit profile
   - View enrolled courses
   - View grades and progress

### Component Structure

```
frontend/src/
├── components/
│   ├── Layout/              # Main layout components
│   │   ├── Header.js        # Top navigation bar
│   │   ├── Sidebar.js       # Side navigation
│   │   └── Footer.js        # Footer component
│   ├── Course/             # Course-related components
│   │   ├── CourseCard.js    # Course preview card
│   │   ├── ModuleList.js    # List of course modules
│   │   └── AssignmentList.js # List of assignments
│   ├── Common/             # Reusable components
│   │   ├── Button.js        # Custom button component
│   │   ├── Input.js         # Custom input component
│   │   └── Modal.js         # Modal dialog component
│   └── Auth/               # Authentication components
│       ├── LoginForm.js     # Login form
│       └── RegisterForm.js  # Registration form
├── pages/                  # Main page components
│   ├── Dashboard.js        # Main dashboard
│   ├── CourseList.js       # Course listing page
│   ├── CourseDetail.js     # Course details page
│   └── Profile.js          # User profile page
└── store/                  # Redux store
    ├── slices/             # Redux slices
    │   ├── authSlice.js    # Authentication state
    │   └── courseSlice.js  # Course state
    └── index.js            # Store configuration
```

### Data Flow

1. **Authentication Flow**
   ```
   User Action → Auth Form → Redux Action → API Call → Store Update → UI Update
   ```

2. **Course Management Flow**
   ```
   User Action → Course Component → Redux Action → API Call → Store Update → UI Update
   ```

3. **Content Management Flow**
   ```
   User Action → Content Component → Redux Action → API Call → Store Update → UI Update
   ```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd lms-project
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lms
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

5. Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

1. Start MongoDB:
```bash
mongod
```

2. Start the backend server:
```bash
cd backend
npm run dev
```

3. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Courses
- GET /api/courses - Get all courses
- POST /api/courses - Create a new course
- GET /api/courses/:id - Get course by ID
- PUT /api/courses/:id - Update course
- DELETE /api/courses/:id - Delete course
- POST /api/courses/:id/enroll - Enroll in course

## Project Structure

```
lms-project/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── models/           # Data models
│   │   ├── routes/           # API endpoints
│   │   ├── middleware/       # Auth & validators
│   │   ├── config/           # DB & env config
│   │   └── server.js         # Entry point
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI
│   │   ├── pages/           # Main views
│   │   ├── store/           # State management
│   │   ├── services/        # API calls
│   │   ├── utils/           # Helpers
│   │   └── App.js           # Root component
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.