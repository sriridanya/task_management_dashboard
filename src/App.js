// src/App.js
import React from 'react';
import { Container, Typography } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
// import theme from './theme';

const App = () => {
  return (
    // <ThemeProvider theme={theme}>
    <Container style={{backgroundColor:'#e5eaf5',  width: '100vw',minHeight:'100vh',padding:'15px'}}>
       <Typography variant="h3" align="center" gutterBottom>
        Task Dashboard
      </Typography>
      <Dashboard />
      <AddTask />
      <TaskList />
    </Container>
    // </ThemeProvider>
  );
};

export default App;
