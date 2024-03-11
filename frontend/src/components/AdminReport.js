// import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography,  Container, Box } from '@mui/material';
import ResponsiveAppBarAdmin from './AdminNavbar';

import Footer from './Footer';

const StaffDashboard = () => {
  const location = useLocation();
  const { floorNumber, roomNumber } = location.state || {};

  return (
    <div>
      <ResponsiveAppBarAdmin />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" color="textPrimary" gutterBottom>
            Staff Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Floor Number: {floorNumber}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Room Number: {roomNumber}
          </Typography>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default StaffDashboard;
