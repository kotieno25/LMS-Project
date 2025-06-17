import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  Description as FileIcon,
  Forum as DiscussionIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  fetchCourseById,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  clearError,
} from '../store/slices/courseSlice';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  type: Yup.string().required('Type is required'),
  dueDate: Yup.date(),
  points: Yup.number().min(0),
});

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentCourse: course, loading, error } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);
  const [openModuleDialog, setOpenModuleDialog] = useState(false);
  const [openItemDialog, setOpenItemDialog] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    dispatch(fetchCourseById(id));
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, id]);

  const moduleFormik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string(),
    }),
    onSubmit: async (values) => {
      const updatedCourse = {
        ...course,
        modules: [...course.modules, { ...values, items: [] }],
      };
      await dispatch(updateCourse({ courseId: id, courseData: updatedCourse }));
      setOpenModuleDialog(false);
      moduleFormik.resetForm();
    },
  });

  const itemFormik = useFormik({
    initialValues: {
      title: '',
      description: '',
      type: 'assignment',
      dueDate: '',
      points: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      const updatedModules = course.modules.map((module) => {
        if (module === selectedModule) {
          return {
            ...module,
            items: [...module.items, values],
          };
        }
        return module;
      });

      const updatedCourse = {
        ...course,
        modules: updatedModules,
      };

      await dispatch(updateCourse({ courseId: id, courseData: updatedCourse }));
      setOpenItemDialog(false);
      itemFormik.resetForm();
    },
  });

  const handleEnroll = async () => {
    await dispatch(enrollInCourse(id));
  };

  const handleDeleteCourse = async () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      await dispatch(deleteCourse(id));
      navigate('/courses');
    }
  };

  const isEnrolled = course?.enrollments?.some(
    (enrollment) => enrollment.user._id === user?._id
  );

  const isInstructor = course?.instructor?._id === user?._id;

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              {course.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {course.code}
            </Typography>
          </Grid>
          <Grid item>
            {!isEnrolled && !isInstructor && (
              <Button variant="contained" onClick={handleEnroll}>
                Enroll in Course
              </Button>
            )}
            {isInstructor && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteCourse}
                sx={{ ml: 1 }}
              >
                Delete Course
              </Button>
            )}
          </Grid>
        </Grid>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {course.description}
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {course.modules.map((module, moduleIndex) => (
            <Paper key={moduleIndex} sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">{module.title}</Typography>
                {isInstructor && (
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedModule(module);
                      setOpenItemDialog(true);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </Box>
              <Typography variant="body2" color="textSecondary" paragraph>
                {module.description}
              </Typography>
              <List>
                {module.items.map((item, itemIndex) => (
                  <React.Fragment key={itemIndex}>
                    <ListItem>
                      <ListItemIcon>
                        {item.type === 'assignment' && <AssignmentIcon />}
                        {item.type === 'quiz' && <QuizIcon />}
                        {item.type === 'file' && <FileIcon />}
                        {item.type === 'discussion' && <DiscussionIcon />}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        secondary={
                          <>
                            {item.description}
                            {item.dueDate && (
                              <Typography component="span" variant="body2" color="textSecondary">
                                {' '}
                                • Due: {new Date(item.dueDate).toLocaleDateString()}
                              </Typography>
                            )}
                            {item.points > 0 && (
                              <Typography component="span" variant="body2" color="textSecondary">
                                {' '}
                                • {item.points} points
                              </Typography>
                            )}
                          </>
                        }
                      />
                    </ListItem>
                    {itemIndex < module.items.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          ))}

          {isInstructor && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenModuleDialog(true)}
              sx={{ mb: 3 }}
            >
              Add Module
            </Button>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Course Information
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Instructor:</strong> {course.instructor.name}
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Start Date:</strong>{' '}
              {new Date(course.startDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>End Date:</strong>{' '}
              {new Date(course.endDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Enrolled Students:</strong> {course.enrollments.length}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Module Dialog */}
      <Dialog open={openModuleDialog} onClose={() => setOpenModuleDialog(false)}>
        <DialogTitle>Add New Module</DialogTitle>
        <form onSubmit={moduleFormik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              name="title"
              label="Module Title"
              value={moduleFormik.values.title}
              onChange={moduleFormik.handleChange}
              error={moduleFormik.touched.title && Boolean(moduleFormik.errors.title)}
              helperText={moduleFormik.touched.title && moduleFormik.errors.title}
            />
            <TextField
              fullWidth
              margin="normal"
              name="description"
              label="Description"
              multiline
              rows={4}
              value={moduleFormik.values.description}
              onChange={moduleFormik.handleChange}
              error={moduleFormik.touched.description && Boolean(moduleFormik.errors.description)}
              helperText={moduleFormik.touched.description && moduleFormik.errors.description}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModuleDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Adding...' : 'Add Module'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Add Item Dialog */}
      <Dialog open={openItemDialog} onClose={() => setOpenItemDialog(false)}>
        <DialogTitle>Add New Item</DialogTitle>
        <form onSubmit={itemFormik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              name="title"
              label="Item Title"
              value={itemFormik.values.title}
              onChange={itemFormik.handleChange}
              error={itemFormik.touched.title && Boolean(itemFormik.errors.title)}
              helperText={itemFormik.touched.title && itemFormik.errors.title}
            />
            <TextField
              fullWidth
              margin="normal"
              name="description"
              label="Description"
              multiline
              rows={4}
              value={itemFormik.values.description}
              onChange={itemFormik.handleChange}
              error={itemFormik.touched.description && Boolean(itemFormik.errors.description)}
              helperText={itemFormik.touched.description && itemFormik.errors.description}
            />
            <TextField
              fullWidth
              margin="normal"
              name="type"
              label="Type"
              select
              value={itemFormik.values.type}
              onChange={itemFormik.handleChange}
              error={itemFormik.touched.type && Boolean(itemFormik.errors.type)}
              helperText={itemFormik.touched.type && itemFormik.errors.type}
              SelectProps={{
                native: true,
              }}
            >
              <option value="assignment">Assignment</option>
              <option value="quiz">Quiz</option>
              <option value="file">File</option>
              <option value="discussion">Discussion</option>
            </TextField>
            <TextField
              fullWidth
              margin="normal"
              name="dueDate"
              label="Due Date"
              type="date"
              value={itemFormik.values.dueDate}
              onChange={itemFormik.handleChange}
              error={itemFormik.touched.dueDate && Boolean(itemFormik.errors.dueDate)}
              helperText={itemFormik.touched.dueDate && itemFormik.errors.dueDate}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              margin="normal"
              name="points"
              label="Points"
              type="number"
              value={itemFormik.values.points}
              onChange={itemFormik.handleChange}
              error={itemFormik.touched.points && Boolean(itemFormik.errors.points)}
              helperText={itemFormik.touched.points && itemFormik.errors.points}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenItemDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Adding...' : 'Add Item'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}

export default CourseDetail; 