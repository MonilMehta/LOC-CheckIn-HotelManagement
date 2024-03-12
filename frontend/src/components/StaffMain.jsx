import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResponsiveAppBarStaff from './StaffNavbar';
import { Typography, Grid } from '@mui/material';
import Footer from './Footer';
import RoomCard from './RoomCard';  // Import the RoomCard component
import { useAuth } from '../AuthContext';

const StaffMain = () => {
  const navigate = useNavigate();
  const [numberOfRooms, setNumberOfRooms] = useState(9);
  const [roomInspections, setRoomInspections] = useState([]);
  const [visitedRooms, setVisitedRooms] = useState(new Set());
  const { token } = useAuth(); 
  console.log('Token : '+token)

  const fetchRoomData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/room-status/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setRoomInspections(response.data);
    } catch (error) {
      console.error('Error fetching room data:', error.message);
    }
  };

  useEffect(() => {
    fetchRoomData();
  }, []);

  const handleRoomClick = (roomNumber) => {
    navigate(`/StaffDashboard`, { state: {  roomNumber } });
    setVisitedRooms((prevVisitedRooms) => new Set(prevVisitedRooms).add(roomNumber));
  };

  
  const organizeRooms = () => {
    const cleanedRooms = [];
    const underMaintenanceRooms = [];
  
    roomInspections.forEach((inspection) => {
      const floorNumber = Math.ceil(inspection.room_number / numberOfRooms);
  
      if (inspection.status === 'clean' && !inspection.flagged_for_maintenance) {
        cleanedRooms.push({ ...inspection, floorNumber });
      } else if (inspection.flagged_for_maintenance) {
        underMaintenanceRooms.push({ ...inspection, floorNumber });
      }
    });
  
    return (
      <div>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          Cleaned
        </Typography>
        <Grid container spacing={2}>
          {cleanedRooms.map((inspection, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <RoomCard
                roomData={inspection}
                handleRoomClick={handleRoomClick}
                visited={visitedRooms.has(inspection.room_number)}
              />
            </Grid>
          ))}
        </Grid>
  
        <Typography variant="h5" color="textPrimary" gutterBottom>
          Require Maintenance
        </Typography>
        <Grid container spacing={2}>
          {underMaintenanceRooms.map((inspection, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <RoomCard
                roomData={inspection}
                handleRoomClick={handleRoomClick}
                visited={visitedRooms.has(inspection.room_number)}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  };
  

  return (
    <div>
      <ResponsiveAppBarStaff />
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Typography variant="h3" color="textPrimary" gutterBottom>
          Staff Dashboard
        </Typography>
        <div>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Room Details
          </Typography>
          {organizeRooms()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StaffMain;
