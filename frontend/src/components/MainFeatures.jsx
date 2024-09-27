import React from 'react';
import { Typography, Container, Grid, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PhotoIcon from '@mui/icons-material/Photo';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';
import ReportIcon from '@mui/icons-material/Report';

const StyledFeatureCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: '30px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease-in-out',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: theme.shadows[10],
      '& .MuiSvgIcon-root': {
        transform: 'scale(1.1)',
      },
      '& .feature-description': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: theme.palette.primary.main,
      transform: 'scaleX(0)',
      transition: 'transform 0.3s ease-in-out',
    },
    '&:hover::before': {
      transform: 'scaleX(1)',
    },
  }));
  

const IconWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

const FeatureDescription = styled(Typography)(({ theme }) => ({
  opacity: 0.7,
  transform: 'translateY(20px)',
  transition: 'all 0.3s ease-in-out',
}));

const FeatureCard = ({ icon: Icon, title, description }) => (
  <StyledFeatureCard elevation={3}>
    <IconWrapper>
      <Icon sx={{ fontSize: 48, color: 'primary.main' }} />
    </IconWrapper>
    <FeatureTitle variant="h6" component="h3">
      {title}
    </FeatureTitle>
    <FeatureDescription variant="body2" color="text.secondary" className="feature-description">
      {description}
    </FeatureDescription>
  </StyledFeatureCard>
);

const MainFeaturesSection = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6, fontWeight: 'bold' }}>
          Main Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={CleanHandsIcon}
              title="Room Cleanliness Assessment"
              description="Utilize image analysis to assess room cleanliness, checking for bedsheet wrinkles, floor cleanliness, and more."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={ListAltIcon}
              title="Inventory Check"
              description="Monitor the inventory of amenities provided in the rooms, such as towels, toiletries, and minibar items."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={PhotoIcon}
              title="Room Image Generation"
              description="Use Generative AI to generate ideal room images and compare them with uploaded photos to find differences."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={AssignmentIcon}
              title="Progress Reports"
              description="Generate detailed reports that provide a comprehensive view of inspections performed by the staff."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={EventIcon}
              title="Scheduling of Checks"
              description="Schedule monthly, weekly, and daily checks, flagging rooms for subsequent inspections that fail to meet standards."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={ReportIcon}
              title="Damage Detection and Estimation"
              description="Detect abnormalities such as broken furniture, stains, or damage. Estimate the cost for replacement if any!"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MainFeaturesSection;