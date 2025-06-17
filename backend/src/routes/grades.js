const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const {
  getCourseGrades,
  submitAssignment,
  gradeAssignment,
  getStudentGrades
} = require('../controllers/gradeController');

// Get grades for a course
router.get('/course/:courseId', auth, getCourseGrades);

// Get student grades
router.get('/student/:courseId', auth, getStudentGrades);

// Submit assignment
router.post('/submit/:courseId/:moduleId/:assignmentId', auth, submitAssignment);

// Grade assignment (instructor only)
router.post('/grade/:courseId/:moduleId/:assignmentId/:studentId', [
  auth,
  checkRole(['instructor', 'admin'])
], gradeAssignment);

module.exports = router; 