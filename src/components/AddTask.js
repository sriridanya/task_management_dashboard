// src/components/AddTask.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { TextField, Button, Typography, Box } from '@mui/material'; 
import Grid from '@mui/material/Grid2'; 
import { addTask } from '../redux/tasksSlice'; 
import FormControl from '@mui/material/FormControl'; 
import InputLabel from '@mui/material/InputLabel'; 
import Select from '@mui/material/Select'; 
import MenuItem from '@mui/material/MenuItem'; 

const AddTask = () => {
  const dispatch = useDispatch(); // Initialize the Redux dispatch function to dispatch actions
  // Define state variables for task properties (title, description, dueDate, priority)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium'); // Default priority set to 'medium'

  // Function to handle form submission
  const handleSubmit = () => {
    // Check if any required fields are empty
    if (!title || !description || !dueDate) {
      alert('Please fill in all fields'); // Alert if fields are missing
      return;
    }

    // Create a new task object with the provided data
    const newTask = {
      id: new Date().getTime(), // Generate a unique ID based on the current time
      title,
      description,
      dueDate,
      completed: false, // Set default task status as incomplete
      priority, 
    };

    // Dispatch the addTask action to add the new task to the Redux store
    dispatch(addTask(newTask));

    // Clear the form fields after submitting
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium'); 
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h5">Add Task</Typography> 
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Task Title"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={{ backgroundColor: '#fff' }} 
          />
        </Grid>
        <Grid item xs={12}> 
          <TextField
            fullWidth
            label="Description"
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            required 
            style={{ backgroundColor: '#fff' }} 
          />
        </Grid>
        <Grid item xs={12}> 
          <TextField
            fullWidth
            label="Due Date"
            type="date" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }} 
            style={{ backgroundColor: '#fff' }} 
          />
        </Grid>
        {/* Priority Dropdown */}
        <Grid item xs={12}>
          <FormControl fullWidth> 
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority} 
              onChange={(e) => setPriority(e.target.value)} 
              style={{ backgroundColor: '#fff' }} 
              label="Priority"
            >
              <MenuItem value="high">High</MenuItem> 
              <MenuItem value="medium">Medium</MenuItem> 
              <MenuItem value="low">Low</MenuItem> 
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}> {/* Grid item for Add Task button */}
          <Button variant="contained" onClick={handleSubmit}>Add Task</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddTask; // Export AddTask component for use in other parts of the application
