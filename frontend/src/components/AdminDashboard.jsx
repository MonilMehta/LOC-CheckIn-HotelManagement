import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Grid } from '@mui/material';
import ResponsiveAppBarAdmin from './AdminNavbar';
import Footer from './Footer';
import RoomCard from './RoomCard';
import PieActiveArc from './PieActiveArc';
import { useAuth } from '../AuthContext'; // Import useAuth hook from AuthContext

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [numberOfRooms, setNumberOfRooms] = useState(0);
  const [roomInspections, setRoomInspections] = useState([]);
  const [visitedRooms, setVisitedRooms] = useState(new Set());
  const { token } = useAuth(); // Access the authentication token from AuthContext

  const [cleanedRooms, setCleanedRooms] = useState([]);
  const [underMaintenanceRooms, setUnderMaintenanceRooms] = useState([]);

  const fetchRoomData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/room-status/', {
        headers: {
          Authorization: `Token ${token}`, // Include authentication token in request headers
        },
      });
      setRoomInspections(response.data);
      setNumberOfRooms(response.data.length);
    } catch (error) {
      console.error('Error fetching room data:', error.message);
    }
  };

  useEffect(() => {
    fetchRoomData();
  }, [token]); // Fetch room data when the component mounts

  const handleRoomClick = (roomNumber) => {
    navigate(`/AdminReport`, { state: { roomNumber } });
    setVisitedRooms((prevVisitedRooms) => new Set(prevVisitedRooms).add(roomNumber));
  };

  useEffect(() => {
    const cleaned = [];
    const maintenance = [];

    roomInspections.forEach((inspection) => {
      if (inspection.status === 'clean') {
        cleaned.push({ ...inspection });
      } else if (inspection.status === 'maintenance') {
        maintenance.push({ ...inspection });
      }
    });

    setCleanedRooms(cleaned);
    setUnderMaintenanceRooms(maintenance);
  }, [roomInspections]);

  return (
    <div>
      <ResponsiveAppBarAdmin />
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Typography variant="h3" color="textPrimary" gutterBottom>
          Admin Dashboard
        </Typography>
        <PieActiveArc length1={cleanedRooms.length} length2={underMaintenanceRooms.length} /> {/* Include PieActiveArc component */}
        <div>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Room Details
          </Typography>
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
          </div>

          <div>
            <Typography variant="h5" color="textPrimary" gutterBottom>
              Under Maintenance
            </Typography>
            <Grid container spacing={2}>
              {underMaintenanceRooms.map((inspection, index) => (
                <Grid item key={inspection.room_number} xs={12} sm={6} md={4}>
                  <RoomCard
                    roomData={inspection}
                    handleRoomClick={handleRoomClick}
                    visited={visitedRooms.has(inspection.room_number)}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
