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

## Recent Fixes Applied

The following issues have been resolved:

1. **Missing Frontend Pages**: Created `Register.js`, `Dashboard.js`, and `Profile.js` components
2. **Missing Backend Controllers**: Created `courseController.js`, `assignmentController.js`, and `gradeController.js`
3. **Missing API Services**: Created `api.js` service file for frontend API calls
4. **Missing Auth Routes**: Added profile update route to auth routes
5. **Missing Redux Actions**: Added `updateProfile` action to auth slice
6. **Environment Configuration**: Created example environment files for both frontend and backend

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
│   ├── Layout.js            # Main layout component
│   └── PrivateRoute.js      # Protected route wrapper
├── pages/                   # Main page components
│   ├── Dashboard.js         # Main dashboard
│   ├── CourseList.js        # Course listing page
│   ├── CourseDetail.js      # Course details page
│   ├── Login.js             # Login page
│   ├── Register.js          # Registration page
│   └── Profile.js           # User profile page
├── services/
│   └── api.js               # API service functions
└── store/                   # Redux store
    ├── slices/              # Redux slices
    │   ├── authSlice.js     # Authentication state
    │   └── courseSlice.js   # Course state
    └── index.js             # Store configuration
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

3. Create a `.env` file in the backend directory:
```bash
cp env.example .env
```
Then edit the `.env` file with your configuration:
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
```bash
cp env.example .env
```
Then edit the `.env` file:
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
- PUT /api/auth/profile - Update user profile

### Courses
- GET /api/courses - Get all courses
- GET /api/courses/user/courses - Get user's courses
- POST /api/courses - Create a new course
- GET /api/courses/:id - Get course by ID
- PUT /api/courses/:id - Update course
- DELETE /api/courses/:id - Delete course
- POST /api/courses/:id/enroll - Enroll in course

### Assignments
- GET /api/assignments/course/:courseId - Get course assignments
- POST /api/assignments - Create assignment
- PUT /api/assignments/:courseId/:moduleId/:assignmentId - Update assignment
- DELETE /api/assignments/:courseId/:moduleId/:assignmentId - Delete assignment

### Grades
- GET /api/grades/course/:courseId - Get course grades
- GET /api/grades/student/:courseId - Get student grades
- POST /api/grades/submit/:courseId/:moduleId/:assignmentId - Submit assignment
- POST /api/grades/grade/:courseId/:moduleId/:assignmentId/:studentId - Grade assignment

## Project Structure

```
lms-project/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   │   ├── courseController.js
│   │   │   ├── assignmentController.js
│   │   │   └── gradeController.js
│   │   ├── models/           # Data models
│   │   │   ├── User.js
│   │   │   └── Course.js
│   │   ├── routes/           # API endpoints
│   │   │   ├── auth.js
│   │   │   ├── courses.js
│   │   │   ├── assignments.js
│   │   │   └── grades.js
│   │   ├── middleware/       # Auth & validators
│   │   │   └── auth.js
│   │   └── server.js         # Entry point
│   ├── env.example           # Environment template
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI
│   │   │   ├── Layout.js
│   │   │   └── PrivateRoute.js
│   │   ├── pages/           # Main views
│   │   │   ├── Dashboard.js
│   │   │   ├── CourseList.js
│   │   │   ├── CourseDetail.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Profile.js
│   │   ├── services/        # API calls
│   │   │   └── api.js
│   │   ├── store/           # State management
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   └── courseSlice.js
│   │   │   └── index.js
│   │   └── App.js           # Root component
│   ├── env.example          # Environment template
│   └── package.json
└── README.md
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**: Make sure MongoDB is running and the connection string is correct
2. **JWT Secret Missing**: Ensure JWT_SECRET is set in your backend .env file
3. **CORS Issues**: Check that the frontend URL is correctly configured in the backend
4. **Port Conflicts**: Make sure ports 3000 (frontend) and 5000 (backend) are available

### Development Tips

1. Use the provided environment templates (`env.example`) to set up your configuration
2. Check the browser console and server logs for detailed error messages
3. Ensure all dependencies are installed in both frontend and backend directories
4. Test API endpoints using tools like Postman before integrating with the frontend

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.