const Course = require('../models/Course');

// Get assignments for a course
const getCourseAssignments = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    const assignments = [];
    course.modules.forEach(module => {
      module.items.forEach(item => {
        if (item.type === 'assignment') {
          assignments.push({
            id: item._id,
            title: item.title,
            description: item.description,
            dueDate: item.dueDate,
            points: item.points,
            module: module.title
          });
        }
      });
    });
    
    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create assignment
const createAssignment = async (req, res) => {
  try {
    const { courseId, moduleId, title, description, dueDate, points } = req.body;
    
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user is the instructor
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const module = course.modules.id(moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    
    module.items.push({
      type: 'assignment',
      title,
      description,
      dueDate,
      points
    });
    
    await course.save();
    
    res.status(201).json({ message: 'Assignment created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update assignment
const updateAssignment = async (req, res) => {
  try {
    const { courseId, moduleId, assignmentId } = req.params;
    const { title, description, dueDate, points } = req.body;
    
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user is the instructor
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const module = course.modules.id(moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    
    const assignment = module.items.id(assignmentId);
    if (!assignment || assignment.type !== 'assignment') {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    assignment.title = title || assignment.title;
    assignment.description = description || assignment.description;
    assignment.dueDate = dueDate || assignment.dueDate;
    assignment.points = points || assignment.points;
    
    await course.save();
    
    res.json({ message: 'Assignment updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete assignment
const deleteAssignment = async (req, res) => {
  try {
    const { courseId, moduleId, assignmentId } = req.params;
    
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user is the instructor
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const module = course.modules.id(moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    
    const assignment = module.items.id(assignmentId);
    if (!assignment || assignment.type !== 'assignment') {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    assignment.remove();
    await course.save();
    
    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCourseAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment
}; 