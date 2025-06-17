import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Grade as GradeIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { fetchUserCourses } from '../store/slices/courseSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { courses, loading } = useSelector(state => state.courses);
  const [stats, setStats] = useState({
    totalCourses: 0,
    activeCourses: 0,
    pendingAssignments: 0,
    completedAssignments: 0
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchUserCourses());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (courses) {
      setStats({
        totalCourses: courses.length,
        activeCourses: courses.filter(course => course.status === 'active').length,
        pendingAssignments: 0, // This would be calculated from assignments
        completedAssignments: 0 // This would be calculated from assignments
      });
    }
  }, [courses]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getRoleDisplay = (role) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1">
              {getGreeting()}, {user?.name}!
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {getRoleDisplay(user?.role)} Dashboard
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <SchoolIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.totalCourses}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Courses
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <AssignmentIcon color="secondary" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.pendingAssignments}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending Assignments
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <GradeIcon color="success" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.completedAssignments}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <SchoolIcon color="info" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.activeCourses}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Courses
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Courses */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Courses
            </Typography>
            {courses && courses.length > 0 ? (
              <List>
                {courses.slice(0, 5).map((course, index) => (
                  <React.Fragment key={course._id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <SchoolIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={course.name}
                        secondary={`${course.code} • ${course.description}`}
                      />
                      <Box>
                        <Chip 
                          label={course.status} 
                          color={course.status === 'active' ? 'success' : 'default'}
                          size="small"
                        />
                      </Box>
                    </ListItem>
                    {index < courses.slice(0, 5).length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
                No courses enrolled yet.
              </Typography>
            )}
            <Box mt={2}>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/courses')}
                fullWidth
              >
                View All Courses
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button 
                variant="contained" 
                onClick={() => navigate('/courses')}
                startIcon={<SchoolIcon />}
                fullWidth
              >
                Browse Courses
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/profile')}
                startIcon={<PersonIcon />}
                fullWidth
              >
                View Profile
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 