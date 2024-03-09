import React from 'react';
import ResponsiveAppBar from './Navbar';
import { Typography, Fade, Container, Grid, Paper } from '@mui/material';
import RoomCleanlinessIcon from '@mui/icons-material/CleanHands';
import InventoryIcon from '@mui/icons-material/ListAlt';
import RoomImageIcon from '@mui/icons-material/Photo';
import ProgressReportIcon from '@mui/icons-material/Assignment';
import SchedulingIcon from '@mui/icons-material/Event';
import DamageDetectionIcon from '@mui/icons-material/Report';
import HomeCarou from './HomeCarou';
import HotelReview from './HotelReview';
import Footer from './Footer';
const FeatureCard = ({ icon, title, description }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Paper
      style={{
        textAlign: 'center',
        padding: '20px',
        borderRadius: '15px',
      }}
    >
      {React.cloneElement(icon, { style: { fontSize: '3rem', color: '#1976D2' } })}
      <Typography variant="h6" style={{ marginTop: '10px', marginBottom: '15px' }}>
        {title}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {description}
      </Typography>
    </Paper>
  </Grid>
);

const ChallengeCard = ({ title, description }) => (
  <Grid item xs={12} md={4} style={{ marginBottom: '20px' }}>
    <Paper
      style={{
        textAlign: 'center',
        padding: '20px',
        borderRadius: '15px',
      }}
    >
      <Typography variant="h6" style={{ marginTop: '10px', marginBottom: '15px' }}>
        {title}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {description}
      </Typography>
    </Paper>
  </Grid>
);

const Home = () => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div>
      <ResponsiveAppBar />
      <Container>
        <div
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'cursive',
            color: 'black',
            height: '100vh',
          }}
        >
          <Fade in={loaded} timeout={1000}>
            <Typography variant="h2" gutterBottom>
              Welcome to Our Hotel Management System
            </Typography>
          </Fade>
          <Fade in={loaded} timeout={2000}>
            <Typography variant="body1" paragraph>
              We understand the challenges faced in managing a hotel. Here are some
              of the common challenges and how our system addresses them:
            </Typography>
          </Fade>
          <Fade in={loaded} timeout={3000}>
            <Typography variant="h5" gutterBottom>
              Challenges Faced:
            </Typography>
          </Fade>
          <ChallengeCard
            title="Difficulty in analyzing room cleanliness and identifying issues."
            description="Utilize image analysis to assess room cleanliness, checking for bedsheet wrinkles, floor, etc."
          />
          <ChallengeCard
            title="Challenges in keeping track of damaged products and estimating replacement costs."
            description="Monitor the inventory of amenities provided in the rooms, such as towels, toiletries, and minibar items."
          />
          <ChallengeCard
            title="Managing and monitoring staff activities efficiently."
            description="Use Generative AI to generate ideal room images and compare them with uploaded photos to find differences."
          />
        </div>
        <Fade in={loaded} timeout={4000}>
          <Typography variant="h4" gutterBottom style={{ marginTop: '50px', textAlign: 'center' }}>
            Main Features
          </Typography>
        </Fade>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <FeatureCard
            icon={<RoomCleanlinessIcon />}
            title="Room Cleanliness Assessment"
            description="Utilize image analysis to assess room cleanliness, checking for bedsheet wrinkles, floor, etc."
          />
          <FeatureCard
            icon={<InventoryIcon />}
            title="Inventory Check"
            description="Monitor the inventory of amenities provided in the rooms, such as towels, toiletries, and minibar items."
          />
          <FeatureCard
            icon={<RoomImageIcon />}
            title="Room Image Generation"
            description="Use Generative AI to generate ideal room images and compare them with uploaded photos to find differences."
          />
          <FeatureCard
            icon={<ProgressReportIcon />}
            title="Progress Reports"
            description="Generate detailed reports that provide a comprehensive view of inspections performed by the staff."
          />
          <FeatureCard
            icon={<SchedulingIcon />}
            title="Scheduling of Checks"
            description="Schedule monthly, weekly, and daily checks, flagging rooms for subsequent inspections that fail to meet standards."
          />
          <FeatureCard
            icon={<DamageDetectionIcon />}
            title="Damage Detection and Estimation"
            description="Detect abnormalities such as broken furniture, stains, or damage. Estimate the cost for replacement if any!"
          />
        </Grid>
        <Container style={{ marginTop: '50px', marginBottom: '50px' }}>
          <HomeCarou />
        </Container>
        <Container style={{ marginTop: '50px', marginBottom: '50px' }}>
          <HotelReview />
        </Container>
      </Container>
      <Footer/>
    </div>
  );
};

export default Home;
