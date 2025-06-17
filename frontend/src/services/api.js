import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.post('/auth/me'),
};

// Courses API
export const coursesAPI = {
  getAllCourses: (params) => api.get('/courses', { params }),
  getCourseById: (id) => api.get(`/courses/${id}`),
  createCourse: (courseData) => api.post('/courses', courseData),
  updateCourse: (id, courseData) => api.put(`/courses/${id}`, courseData),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
  enrollInCourse: (id) => api.post(`/courses/${id}/enroll`),
  getUserCourses: () => api.get('/courses/user/courses'),
};

// Assignments API
export const assignmentsAPI = {
  getCourseAssignments: (courseId) => api.get(`/assignments/course/${courseId}`),
  createAssignment: (assignmentData) => api.post('/assignments', assignmentData),
  updateAssignment: (courseId, moduleId, assignmentId, data) => 
    api.put(`/assignments/${courseId}/${moduleId}/${assignmentId}`, data),
  deleteAssignment: (courseId, moduleId, assignmentId) => 
    api.delete(`/assignments/${courseId}/${moduleId}/${assignmentId}`),
};

// Grades API
export const gradesAPI = {
  getCourseGrades: (courseId) => api.get(`/grades/course/${courseId}`),
  getStudentGrades: (courseId) => api.get(`/grades/student/${courseId}`),
  submitAssignment: (courseId, moduleId, assignmentId, submission) => 
    api.post(`/grades/submit/${courseId}/${moduleId}/${assignmentId}`, { submission }),
  gradeAssignment: (courseId, moduleId, assignmentId, studentId, gradeData) => 
    api.post(`/grades/grade/${courseId}/${moduleId}/${assignmentId}/${studentId}`, gradeData),
};

export default api; 