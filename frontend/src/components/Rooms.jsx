import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, Typography, Grid, Card, CardContent, CardActions, 
  Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Box, 
  IconButton, Tooltip
} from '@mui/material';
import ResponsiveAppBarAdmin from './AdminNavbar';
import Footer from './Footer';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); // For modal data
  const [open, setOpen] = useState(false); // For modal visibility

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/room-status/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        });
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'clean':
        return 'success';
      case 'maintenance':
        return 'error';
      default:
        return 'default';
    }
  };

  // Handle opening the modal and setting selected room details
  const handleOpenModal = (room) => {
    setSelectedRoom(room);
    setOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setOpen(false);
    setSelectedRoom(null);
  };

  // Function to update room status
  const handleUpdateStatus = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/update-room-status/${selectedRoom.room_number}/`, {
        status: selectedRoom.status === 'clean' ? 'maintenance' : 'clean'
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setSelectedRoom(prev => ({ ...prev, status: response.data.status }));
    } catch (error) {
      console.error('Error updating room status:', error);
    }
  };

  // Function to generate tips based on the room's item counts
  const generateTips = (room) => {
    const maxQuantities = { bottle: 2, cup: 4, wine_glass: 2, bowl: 2 };
    let tips = [];

    Object.keys(maxQuantities).forEach(item => {
      if (room[item] > maxQuantities[item]) {
        tips.push(`Too many ${item.replace('_', ' ')}s. Maximum allowed is ${maxQuantities[item]}.`);
      }
    });

    if (room.status !== 'clean') {
      tips.push('The room is not clean. Consider cleaning the room again.');
    }

    return tips;
  };

  return (
    <div>
      <ResponsiveAppBarAdmin />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>All Rooms</Typography>
        <Grid container spacing={3}>
          {rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.room_number}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Room {room.room_number}
                  </Typography>
                  <Chip 
                    label={room.status.toUpperCase()} 
                    color={getStatusColor(room.status)}
                    sx={{ mt: 1 }}
                  />
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Last checked: {new Date(room.last_checked).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    Employee: {room.employee || 'Not assigned'}
                  </Typography>
                  <Typography variant="body2">
                    Bottles: {room.bottle}, Cups: {room.cup}, Wine Glasses: {room.wine_glass}, Bowls: {room.bowl}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleOpenModal(room)}>View Details</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Modal for viewing room details */}
        <Dialog open={open} onClose={handleCloseModal} maxWidth="sm" fullWidth>
          <DialogTitle>Room {selectedRoom?.room_number} Details</DialogTitle>
          <DialogContent dividers>
            {selectedRoom && (
              <Box>
                <Typography variant="h6">Room Status: {selectedRoom.status.toUpperCase()}</Typography>
                <img 
                  src={`http://localhost:8000/media/${selectedRoom.room_image}`} 
                  alt={`Room ${selectedRoom.room_number}`} 
                  style={{ maxWidth: '100%', height: 'auto', marginBottom: '16px' }} 
                />
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Last checked: {new Date(selectedRoom.last_checked).toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Cleaned by: {selectedRoom.employee || 'Not assigned'}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Bottles: {selectedRoom.bottle}, Cups: {selectedRoom.cup}, Wine Glasses: {selectedRoom.wine_glass}, Bowls: {selectedRoom.bowl}
                </Typography>

                {/* Displaying Tips */}
                <Typography variant="h6" sx={{ mt: 2 }}>Tips:</Typography>
                <Box sx={{ mt: 1 }}>
                  {generateTips(selectedRoom).map((tip, index) => (
                    <Typography key={index} variant="body2" color="error">
                      • {tip}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateStatus}>
              {selectedRoom?.status === 'clean' ? 'Mark as Maintenance' : 'Mark as Clean'}
            </Button>
            <Button onClick={handleCloseModal}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </div>
  );
};

export default Rooms;
