const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { auth, checkRole } = require('../middleware/auth');
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  getUserCourses
} = require('../controllers/courseController');

// Get all courses (with filters)
router.get('/', auth, getAllCourses);

// Get user's courses
router.get('/user/courses', auth, getUserCourses);

// Create new course
router.post('/', [
  auth,
  checkRole(['instructor', 'admin']),
  body('name').notEmpty(),
  body('code').notEmpty(),
  body('description').notEmpty(),
  body('startDate').isISO8601(),
  body('endDate').isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await createCourse(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get course by ID
router.get('/:id', auth, getCourseById);

// Update course
router.put('/:id', [
  auth,
  checkRole(['instructor', 'admin'])
], updateCourse);

// Delete course
router.delete('/:id', [
  auth,
  checkRole(['instructor', 'admin'])
], deleteCourse);

// Enroll in course
router.post('/:id/enroll', auth, enrollInCourse);

module.exports = router; 