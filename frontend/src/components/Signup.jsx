import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {Link as Lk} from 'react-router-dom'

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    employee_type: '',
    allowExtraEmails: false,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Prepare form data for Axios request
    const data = new FormData();
    data.append('username', formData.username); // Assuming username is the email
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('first_name', formData.firstName);
    data.append('last_name', formData.lastName);
    data.append('employee_type', formData.employee_type);
    
    try {
      // Make the Axios request
      const response = await axios.post(
        'http://127.0.0.1:8000/auth/signup/',
        data
      );
  
      console.log('Response:', response.data); // Log the response for debugging
  
      // Assuming the authentication API returns a success message or status
      if (response.status===201) {
        // Redirect to the sign-in page
        console.log('Yayyyy');
        navigate('/signin'); // Use the navigate function to redirect
      } else {
        // Handle unsuccessful authentication (if needed)
        console.log('Sign-up unsuccessful:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error (if needed)
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  type="text"
                  id="username"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="employee_type"
                  label="Employee"
                  type="text"
                  id="employee"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {Object.keys(validationErrors).length > 0 && (
              <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                Please fix the errors before submitting.
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Lk to="/SignIn"> Already have an account? Sign in</Lk>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
