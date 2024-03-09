import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBarStaff from './StaffNavbar';
import { Typography, Card, CardContent, Grid, TextField, Button } from '@mui/material';

const StaffMain = () => {
  const navigate = useNavigate();
  const [numberOfFloors, setNumberOfFloors] = useState(3);
  const [numberOfRooms, setNumberOfRooms] = useState(9);
  const [roomInspections, setRoomInspections] = useState([]);
  const [visitedRooms, setVisitedRooms] = useState(new Set());
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const totalRooms = numberOfFloors * numberOfRooms;

    const inspections = Array.from({ length: totalRooms }, (_, index) => ({
      roomNumber: String(index + 1),
      cleanliness: 'Needs Improvement',
      inventory: index % 3 === 0 ? 'Stocked' : 'Low Stock',
    }));

    setRoomInspections(inspections);
  }, [numberOfFloors, numberOfRooms]);

  const organizeRooms = (cleanlinessStatus) => {
    const organizedRooms = {};
    roomInspections
      .filter((inspection) => inspection.cleanliness === cleanlinessStatus)
      .forEach((inspection) => {
        const floorNumber = Math.ceil(inspection.roomNumber / numberOfRooms);
        if (!organizedRooms[floorNumber]) {
          organizedRooms[floorNumber] = [];
        }
        organizedRooms[floorNumber].push(inspection);
      });

    return Object.entries(organizedRooms).map(([floor, rooms], floorIndex) => (
      <div key={floorIndex}>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          Floor {floor}
        </Typography>
        <Grid container spacing={2}>
          {rooms.map((inspection, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                style={{
                  cursor: 'pointer',
                  backgroundColor: visitedRooms.has(inspection.roomNumber)
                    ? '#c8e6c9'
                    : 'white',
                }}
                onClick={() => handleRoomClick(inspection.roomNumber)}
              >
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
    ));
  };

  const handleRoomClick = (roomNumber) => {
    const floorNumber = Math.ceil(roomNumber / numberOfRooms);
    navigate(`/StaffDashboard`, { state: { floorNumber, roomNumber } });
    setVisitedRooms((prevVisitedRooms) => new Set(prevVisitedRooms).add(roomNumber));
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  return (
    <div>
      <ResponsiveAppBarStaff />
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <Typography variant="h3" color="textPrimary" gutterBottom>
          Staff Dashboard
        </Typography>
        <div style={{ marginBottom: '20px' }}>
          <TextField
            label="Number of Floors"
            type="number"
            variant="outlined"
            value={numberOfFloors}
            onChange={(e) => setNumberOfFloors(Number(e.target.value))}
            style={{ marginRight: '20px' }}
            disabled={!editMode}
          />
          <TextField
            label="Number of Rooms per Floor"
            type="number"
            variant="outlined"
            value={numberOfRooms}
            onChange={(e) => setNumberOfRooms(Number(e.target.value))}
            disabled={!editMode}
          />
          {editMode ? (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button variant="contained" color="secondary" onClick={handleEdit}>
              Edit
            </Button>
          )}
        </div>
        <div>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Pending Rooms
          </Typography>
          {organizeRooms('Needs Improvement')}
        </div>
      </div>
    </div>
  );
};

export default StaffMain;
