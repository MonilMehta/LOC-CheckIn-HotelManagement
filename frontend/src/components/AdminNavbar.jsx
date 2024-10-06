import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ResponsiveAppBarAdmin = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    // Add logout logic here
    console.log("Logged Out");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#212121', boxShadow: 3 }}>
      <Toolbar>
        <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}
        onClick={() => navigate('/AdminDashboard')}>
          Hotel Admin.
        </Typography>

        <Box display="flex" justifyContent="flex-end" flexGrow={1}>
          <Button
            color="inherit"
            onClick={() => navigate('/rooms')}
            sx={{ marginRight: 2, fontWeight: 'bold' }}
          >
            Rooms
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/add-room')}
            sx={{ marginRight: 2, fontWeight: 'bold' }}
          >
            Add Room
          </Button>
          <Button
  color="inherit"
  onClick={() => navigate('/dashboardstats')}
  sx={{ marginRight: 2, fontWeight: 'bold' }}
>
  Dashboard Stats
</Button>
<Button
  color="inherit"
  onClick={() => navigate('/employees')}
  sx={{ marginRight: 2, fontWeight: 'bold' }}
>
  Employees
</Button>
<Button
  color="inherit"
  onClick={() => navigate('/AdminDashboard')}
  sx={{ marginRight: 2, fontWeight: 'bold' }}
>
  Home
</Button>

          <Button
            color="error"
            variant="outlined"
            onClick={() => navigate('/')}
            sx={{ marginLeft: 2 }}
          >
            Log Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveAppBarAdmin;
