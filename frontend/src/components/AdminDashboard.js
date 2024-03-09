import React, { useState, useEffect } from 'react';
import ResponsiveAppBarAdmin from './AdminNavbar';
import { Typography, Card, CardContent, Grid, TextField } from '@mui/material';

const Home = () => {
  // Mocked data for demonstration
  const [roomInspections, setRoomInspections] = useState([]);
  const [numFloors, setNumFloors] = useState(3); // Default value is 1 floor
  const [numRoomsPerFloor, setNumRoomsPerFloor] = useState(9); // Default value is 10 rooms per floor

  useEffect(() => {
    // Fetch progress reports or inspections for the admin
    // For simplicity, I'll use a dummy data structure. Replace this with API calls.
    const totalRooms = numFloors * numRoomsPerFloor;

    const inspections = Array.from({ length: totalRooms }, (_, index) => ({
      roomNumber: String(index + 1),
      cleanliness: index % 2 === 0 ? 'Clean' : 'Needs Improvement',
      inventory: index % 3 === 0 ? 'Stocked' : 'Low Stock',
    }));

    setRoomInspections(inspections);
  }, [numFloors, numRoomsPerFloor]);

  const organizeRoomsByFloors = () => {
    const roomsByFloor = Array.from({ length: numFloors }, (_, floorIndex) => {
      const floorRooms = roomInspections.slice(
        floorIndex * numRoomsPerFloor,
        (floorIndex + 1) * numRoomsPerFloor
      );
      return {
        floor: floorIndex + 1,
        rooms: floorRooms,
      };
    });

    return roomsByFloor;
  };

  return (
    <div>
      <ResponsiveAppBarAdmin/>
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <Typography variant="h3" color="textPrimary" gutterBottom>
          Admin Dashboard
        </Typography>
        <div style={{ marginBottom: '20px' }}>
          <TextField
            label="Number of Floors"
            type="number"
            variant="outlined"
            value={numFloors}
            onChange={(e) => setNumFloors(Number(e.target.value))}
            style={{ marginRight: '20px' }}
          />
          <TextField
            label="Number of Rooms per Floor"
            type="number"
            variant="outlined"
            value={numRoomsPerFloor}
            onChange={(e) => setNumRoomsPerFloor(Number(e.target.value))}
          />
        </div>
        {organizeRoomsByFloors().map((floorData) => (
          <div key={floorData.floor} style={{ marginBottom: '20px' }}>
            <Typography variant="h5" color="textPrimary" gutterBottom>
              Floor {floorData.floor}
            </Typography>
            <Grid container spacing={2}>
              {floorData.rooms.map((inspection, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" color="textPrimary" gutterBottom>
                        Room {inspection.roomNumber}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Cleanliness: {inspection.cleanliness}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Inventory: {inspection.inventory}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
