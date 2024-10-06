import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home, Hotel, AddBox, Dashboard, People, ExitToApp } from '@mui/icons-material';

const ResponsiveAppBarAdmin = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    // Add logout logic here
    console.log("Logged Out");
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ padding: '0 20px' }}>
      <Toolbar>
        {/* Logo and Title */}
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold', color: '#1976d2', cursor: 'pointer' }}
          onClick={() => navigate('/AdminDashboard')}
        >
          HotelEase
        </Typography>

        {/* Navigation Icons and Text */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Button
            color="inherit"
            onClick={() => navigate('/AdminDashboard')}
            startIcon={<Home sx={{ fontSize: 28 }} />}
            sx={{ fontSize: 18, fontWeight: 'bold', textTransform: 'none' }}
          >
            Home
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate('/rooms')}
            startIcon={<Hotel sx={{ fontSize: 28 }} />}
            sx={{ fontSize: 18, fontWeight: 'bold', textTransform: 'none' }}
          >
            Rooms
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate('/add-room')}
            startIcon={<AddBox sx={{ fontSize: 28 }} />}
            sx={{ fontSize: 18, fontWeight: 'bold', textTransform: 'none' }}
          >
            Add Room
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate('/dashboardstats')}
            startIcon={<Dashboard sx={{ fontSize: 28 }} />}
            sx={{ fontSize: 18, fontWeight: 'bold', textTransform: 'none' }}
          >
            Dashboard Stats
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate('/employees')}
            startIcon={<People sx={{ fontSize: 28 }} />}
            sx={{ fontSize: 18, fontWeight: 'bold', textTransform: 'none' }}
          >
            Employees
          </Button>

          {/* Log Out Button */}
          <Button
            color="inherit"
            onClick={handleLogOut}
            startIcon={<ExitToApp sx={{ fontSize: 28 }} />}
            sx={{ fontSize: 18, fontWeight: 'bold', textTransform: 'none' }}
          >
            Log Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveAppBarAdmin;
