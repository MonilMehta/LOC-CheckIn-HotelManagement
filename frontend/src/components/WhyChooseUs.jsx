import React from 'react';
import { Typography, Container, Grid, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsightsIcon from '@mui/icons-material/Insights';

const StyledPaper = styled(Paper)(({ theme }) => ({
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
  '& .MuiSvgIcon-root': {
    fontSize: 48,
    color: theme.palette.primary.main,
  },
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const FeatureDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

const WhyChoose = () => {
  return (
    <Box sx={{ bgcolor: '#f9f9f9', py: 12 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 3, fontWeight: 'bold' }}>
          Why Choose Us?
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}>
          Our hotel management system is designed to address the unique challenges faced by hoteliers in today's fast-paced hospitality industry. We combine cutting-edge technology with user-friendly interfaces to streamline your operations and enhance guest satisfaction.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <StyledPaper elevation={3}>
              <IconWrapper>
                <SettingsIcon />
              </IconWrapper>
              <FeatureTitle variant="h6" component="h3">
                Efficient Operations
              </FeatureTitle>
              <FeatureDescription variant="body2">
                Streamline your daily tasks and improve overall efficiency with our integrated management tools. Our system automates repetitive tasks, allowing your staff to focus on providing exceptional service.
              </FeatureDescription>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledPaper elevation={3}>
              <IconWrapper>
                <EmojiEmotionsIcon />
              </IconWrapper>
              <FeatureTitle variant="h6" component="h3">
                Enhanced Guest Experience
              </FeatureTitle>
              <FeatureDescription variant="body2">
                Provide exceptional service and personalized experiences to increase guest satisfaction and loyalty. Our system helps you understand guest preferences and tailor your services accordingly.
              </FeatureDescription>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledPaper elevation={3}>
              <IconWrapper>
                <InsightsIcon />
              </IconWrapper>
              <FeatureTitle variant="h6" component="h3">
                Data-Driven Insights
              </FeatureTitle>
              <FeatureDescription variant="body2">
                Make informed decisions based on comprehensive analytics and reporting features. Our system provides real-time data and actionable insights to help you optimize your hotel's performance.
              </FeatureDescription>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChoose;