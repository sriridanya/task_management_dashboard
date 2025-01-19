// src/components/Dashboard.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Paper, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Bar } from 'react-chartjs-2';
import WeatherComponent from './WeatherComponent';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const tasks = useSelector(state => state.tasks.tasks);// Get tasks from Redux store

  // Calculate total, completed, and pending tasks

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Data for the task completion bar chart
  const data = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        label: 'Task Status',
        data: [completedTasks, pendingTasks],
        backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
          {/* Total Tasks Card */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Tasks</Typography>
              <Typography variant="h4">{totalTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
         {/* Completed Tasks Card */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed Tasks</Typography>
              <Typography variant="h4">{completedTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
         {/* Pending Tasks Card */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Tasks</Typography>
              <Typography variant="h4">{pendingTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
         {/* Bar Chart showing task completion statistics */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Task Completion Statistics</Typography>
              <Bar data={data} />
            </CardContent>
          </Card>
        </Grid>
       
        {/* Weather Component */}
        <Grid item xs={12}>
            <WeatherComponent /> 
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; // Export Dashboard component for use in other parts of the application
