import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography, Button, TextField, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { deleteTask, toggleCompletion, updateTask } from '../redux/tasksSlice';
import Grid from '@mui/material/Grid2';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State for delete confirmation dialog
  const [selectedTaskId, setSelectedTaskId] = useState(null); // Task ID to be deleted
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortOption, setSortOption] = useState('title');
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleFilterPriorityChange = (event) => {
    setFilterPriority(event.target.value);
  };

  // Handle sort change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filter tasks based on status, priority, and search query
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'completed' && !task.completed) return false;
    if (filterStatus === 'pending' && task.completed) return false;
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    // Filter by search query (title or description)
    if (
      !task.title.toLowerCase().includes(searchQuery) &&
      !task.description.toLowerCase().includes(searchQuery)
    ) {
      return false;
    }
    return true;
  });

  // Sort tasks by title or due date
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    }
    if (sortOption === 'date') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });

  const handleEditClick = (taskId) => {
    setEditingTaskId(taskId);
    const task = tasks.find((task) => task.id === taskId);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setPriority(task.priority); // Set priority in the edit form
    setOpenDialog(true);
  };

  const handleSaveChanges = () => {
    if (!title || !description || !dueDate) {
      alert('Please fill in all fields');
      return;
    }

    const updatedTask = { ...tasks.find((task) => task.id === editingTaskId), title, description, dueDate, priority };
    dispatch(updateTask(updatedTask));
    setOpenDialog(false);
    setEditingTaskId(null);
  };

  // Handle delete confirmation
  const handleDeleteClick = (taskId) => {
    setSelectedTaskId(taskId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedTaskId !== null) {
      dispatch(deleteTask(selectedTaskId)); // Dispatch delete task action
    }
    setOpenDeleteDialog(false); // Close confirmation dialog
    setSelectedTaskId(null); // Clear selected task
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false); // Close confirmation dialog
    setSelectedTaskId(null); // Clear selected task
  };

  if (!tasks) {
    return <CircularProgress />;
  }

  if (tasks.length === 0) {
    return <Typography>No tasks available</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
  
      {/* Filter and Sort Controls */}
      <Grid container spacing={2} mb={2}>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Task List
          </Typography>
        </Grid>
        <Grid item>
          <FormControl sx={{ minWidth: 200, width: '100%' }} style={{ backgroundColor: '#fff' }}>
            <InputLabel>Filter by Status</InputLabel>
            <Select value={filterStatus} onChange={handleFilterChange} label="Filter by Status">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ minWidth: 200, width: '100%' }} style={{ backgroundColor: '#fff' }}>
            <InputLabel>Filter by Priority</InputLabel>
            <Select value={filterPriority} onChange={handleFilterPriorityChange} label="Filter by Priority">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ minWidth: 200, width: '100%' }} style={{ backgroundColor: '#fff' }}>
            <InputLabel>Sort by</InputLabel>
            <Select value={sortOption} onChange={handleSortChange} label="Sort by">
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="date">Due Date</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item >
          <TextField
            fullWidth
            label="Search Tasks"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title/description"
            style={{ backgroundColor: '#fff' }}
          />
        </Grid>
      </Grid>

      {/* Display Task List */}
      <Grid container spacing={2}>
        {sortedTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card style={{backgroundColor:' #faf8f9'}}>
              <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2">{task.description}</Typography>
                <Typography variant="body2">Due Date: {new Date(task.dueDate).toLocaleDateString()}</Typography>
                <Typography variant="body2" color={task.completed ? 'green' : 'red'}>
                  Status: {task.completed ? 'Completed' : 'Pending'}
                </Typography>
                <Typography variant="body2">Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</Typography>
                <Button onClick={() => dispatch(toggleCompletion(task.id))}>
                  {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                </Button>
                <Button color="error" onClick={() => handleDeleteClick(task.id)}>Delete</Button>
                <Button color="primary" onClick={() => handleEditClick(task.id)}>Edit</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Task Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent style={{ paddingTop: '10px' }}>
          <TextField label="Task Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} required sx={{ mb: 2 }} />
          <TextField label="Description" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} required sx={{ mb: 2 }} />
          <TextField label="Due Date" type="date" fullWidth value={dueDate} onChange={(e) => setDueDate(e.target.value)} InputLabelProps={{ shrink: true }} required sx={{ mb: 2 }} />
          {/* Priority Dropdown in Edit Dialog */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select value={priority} onChange={(e) => setPriority(e.target.value)} label="Priority">
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSaveChanges} color="primary">Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskList;
