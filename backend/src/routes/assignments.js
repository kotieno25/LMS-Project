const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const {
  getCourseAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment
} = require('../controllers/assignmentController');

// Get assignments for a course
router.get('/course/:courseId', auth, getCourseAssignments);

// Create assignment
router.post('/', [
  auth,
  checkRole(['instructor', 'admin'])
], createAssignment);

// Update assignment
router.put('/:courseId/:moduleId/:assignmentId', [
  auth,
  checkRole(['instructor', 'admin'])
], updateAssignment);

// Delete assignment
router.delete('/:courseId/:moduleId/:assignmentId', [
  auth,
  checkRole(['instructor', 'admin'])
], deleteAssignment);

module.exports = router; 