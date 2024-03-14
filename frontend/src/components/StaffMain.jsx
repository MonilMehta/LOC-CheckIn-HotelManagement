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
    if (token) {
      fetchRoomData();
    }
  }, [token]);

  const handleRoomClick = (roomNumber) => {
    navigate(`/StaffDashboard`, { state: { roomNumber } });
    setVisitedRooms((prevVisitedRooms) => new Set(prevVisitedRooms).add(roomNumber));
  };

  const organizeRooms = () => {
    const cleanedRooms = [];
    const underMaintenanceRooms = [];
  
    roomInspections.forEach((inspection) => {
      if (inspection.status === 'clean' ) {
        cleanedRooms.push({ ...inspection });
      } else if (inspection.status === 'maintenance' ) {
        underMaintenanceRooms.push({ ...inspection });
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
      {organizeRooms()}
      <Footer />
    </div>
  );
};

export default StaffMain;
