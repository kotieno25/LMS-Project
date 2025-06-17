const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  modules: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    items: [{
      type: {
        type: String,
        enum: ['assignment', 'quiz', 'file', 'discussion'],
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: String,
      content: mongoose.Schema.Types.Mixed,
      dueDate: Date,
      points: Number
    }]
  }],
  enrollments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['student', 'ta'],
      default: 'student'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    }
  }],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'archived', 'draft'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
CourseSchema.index({ code: 1 });
CourseSchema.index({ instructor: 1 });
CourseSchema.index({ 'enrollments.user': 1 });

module.exports = mongoose.model('Course', CourseSchema); 