import React from 'react';
import { Typography, Paper, Avatar, Grow, Button } from '@mui/material';
import ResponsiveAppBarStaff from './StaffNavbar';
import Footer from './Footer';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
  // Placeholder user data (replace with actual user data from authentication)
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    userName: 'johndoe123',
    employeeType: 'Staff',
    // Add more details as needed
  };

  return (
    <div>
      <ResponsiveAppBarStaff />
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" color="textPrimary" gutterBottom>
          User Profile
        </Typography>
        <Grow in={true} timeout={1000}>
          <Paper elevation={5} style={{ padding: '20px', backgroundColor: '#f5f5f5', width: '300px' }}>
            <Avatar alt="User Avatar" src="/static/images/avatar.jpg" sx={{ width: 100, height: 100, marginBottom: 2, alignSelf: 'center' }} />
            <Typography variant="h6" color="textSecondary" gutterBottom>
              First Name:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {userData.firstName}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Last Name:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {userData.lastName}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Email:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {userData.email}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              User Name:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {userData.userName}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Employee Type:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {userData.employeeType}
            </Typography>
            {/* Add more details as needed */}
            <Button variant="contained" color="primary" startIcon={<EditIcon />} style={{ marginTop: '10px', alignSelf: 'center' }}>
              Edit Profile
            </Button>
          </Paper>
        </Grow>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
