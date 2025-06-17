const Course = require('../models/Course');
const User = require('../models/User');

// Get grades for a course
const getCourseGrades = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user is enrolled or instructor
    const isEnrolled = course.enrollments.find(
      enrollment => enrollment.user.toString() === req.user._id.toString()
    );
    const isInstructor = course.instructor.toString() === req.user._id.toString();
    
    if (!isEnrolled && !isInstructor) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // For now, return empty grades array
    // In a real implementation, you would have a separate Grade model
    res.json([]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Submit assignment
const submitAssignment = async (req, res) => {
  try {
    const { courseId, moduleId, assignmentId } = req.params;
    const { submission } = req.body;
    
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user is enrolled
    const isEnrolled = course.enrollments.find(
      enrollment => enrollment.user.toString() === req.user._id.toString()
    );
    
    if (!isEnrolled) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }
    
    // For now, just return success
    // In a real implementation, you would save the submission
    res.json({ message: 'Assignment submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Grade assignment (instructor only)
const gradeAssignment = async (req, res) => {
  try {
    const { courseId, moduleId, assignmentId, studentId } = req.params;
    const { grade, feedback } = req.body;
    
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user is the instructor
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // For now, just return success
    // In a real implementation, you would save the grade
    res.json({ message: 'Assignment graded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get student grades
const getStudentGrades = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user is enrolled or instructor
    const isEnrolled = course.enrollments.find(
      enrollment => enrollment.user.toString() === req.user._id.toString()
    );
    const isInstructor = course.instructor.toString() === req.user._id.toString();
    
    if (!isEnrolled && !isInstructor) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // For now, return empty grades array
    // In a real implementation, you would fetch actual grades
    res.json([]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCourseGrades,
  submitAssignment,
  gradeAssignment,
  getStudentGrades
}; 