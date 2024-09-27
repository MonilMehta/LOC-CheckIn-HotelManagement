import React from 'react';
import { Typography, Container, Grid, Paper, Button, AppBar, Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MainFeaturesSection from './MainFeatures';
import WhyChoose from './WhyChooseUs'; 

import { Link as Lk } from 'react-router-dom';

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CheckIn
          </Typography>
          <Button color="inherit"><Lk to="/Signup" style={{color:'black',textDecoration:'none'}}>SignUp</Lk></Button>
          <Button color="inherit"><Lk to="/SignIn" style={{color:'black',textDecoration:'none'}}>SignIn</Lk></Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1501117716987-c8c394bb29df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight:'500',
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Our Hotel Management System
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Streamline your operations with our cutting-edge solutions
          </Typography>
          <Button variant="contained" size="large" sx={{ mt: 4 }}>
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <MainFeaturesSection />

      {/* Why Choose Us Section */}
      <WhyChoose />

      {/* Call to Action */}
      <Container
      sx={{
        mt: 8,
        mb: 8,
        py: 6,
        borderRadius: 2,
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 'bold', color: 'primary.dark' }}
      >
        Get Started Today
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', color: 'text.secondary' }}
      >
        Transform your hotel management with our innovative solutions. Contact us to schedule a demo or start your free trial.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: '30px',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: 'primary.dark',
              transform: 'scale(1.05)',
            },
          }}
        >
          Schedule Demo
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: '30px',
            color: 'primary.main',
            borderColor: 'primary.main',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              borderColor: 'primary.dark',
              color: 'primary.dark',
              transform: 'scale(1.05)',
            },
          }}
        >
          Start Free Trial
        </Button>
      </Box>
    </Container>
    
    </Box>
  );
};

export default Home;
