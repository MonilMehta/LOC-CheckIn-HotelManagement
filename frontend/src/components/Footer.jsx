import React from 'react';
import { styled } from '@mui/material/styles';
import { Container, Grid, Typography, Link, Box } from '@mui/material';
import { Facebook, Twitter, Instagram, LocationOn, Phone, MailOutline } from '@mui/icons-material';

const StyledFooter = styled('footer')(({ theme }) => ({
  bgcolor: 'white', // Change background color to white
        color: 'black', // Light text color for contrast
  padding: theme.spacing(8, 0),
  marginTop: 'auto',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const SocialIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.2)', // Slightly larger hover effect for emphasis
    backgroundColor: theme.palette.secondary.main, // Alternate color on hover
  },
}));

const Footer = () => {
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={6} justifyContent="space-between">
          {/* Logo and Social Media Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h4" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              HotelEase
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
              Providing comfortable stays and exceptional service since 2024.
            </Typography>
            <Box sx={{ display: 'flex' ,marginLeft:'90px'}}>
              <SocialIcon>
                <Facebook fontSize="large" />
              </SocialIcon>
              <SocialIcon>
                <Twitter fontSize="large" />
              </SocialIcon>
              <SocialIcon>
                <Instagram fontSize="large" />
              </SocialIcon>
            </Box>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={4}>
  <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
    Quick Links
  </Typography>
  <Link href="#" color="inherit" display="block" mb={2} variant="h6" sx={{ '&:hover': { textDecoration: 'none', color: 'blue' } }}>Home</Link>
  <Link href="#" color="inherit" display="block" mb={2} variant="h6" sx={{ '&:hover': { textDecoration: 'none', color: 'blue' } }}>Rooms</Link>
  <Link href="#" color="inherit" display="block" mb={2} variant="h6" sx={{ '&:hover': { textDecoration: 'none', color: 'blue' } }}>Services</Link>
  <Link href="#" color="inherit" display="block" mb={2} variant="h6" sx={{ '&:hover': { textDecoration: 'none', color: 'blue' } }}>About Us</Link>
  <Link href="#" color="inherit" display="block" variant="h6" sx={{ '&:hover': { textDecoration: 'none', color: 'blue' } }}>Contact</Link>
</Grid>

{/* Contact Section */}
<Grid item xs={12} sm={4}>
  <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
    Contact Us
  </Typography>
  <Box sx={{ mb: 2 }}>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.123456789012!2d72.825833315096!3d19.099999999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63f1f1f1f1f%3A0x1f1f1f1f1f1f1f1f!2sVile%20Parle%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1611234567890!5m2!1sen!2sin"
      width="100%"
      height="200"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      title="Location Map"
    ></iframe>
  </Box>
  <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
    <Phone sx={{ mr: 1, fontSize: 28, color: '#1976d2' }} /> +91 99999 99999
  </Typography>
</Grid>
        </Grid>
        <Box mt={8}>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ fontSize: '14px', letterSpacing: '0.5px' }}>
            {'© '}
            {new Date().getFullYear()}
            {' HotelEase. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
