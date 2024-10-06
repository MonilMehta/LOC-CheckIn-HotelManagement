import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, Typography, Grid, Card, CardContent, CardActions, Button, 
  Chip, Modal, Box, TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ResponsiveAppBarAdmin from './AdminNavbar';
import Footer from './Footer';
import BedIcon from '@mui/icons-material/Bed';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';
import BottleIcon from '@mui/icons-material/LocalDrink';
import CupIcon from '@mui/icons-material/LocalCafe';
import WineBarIcon from '@mui/icons-material/WineBar'; 
import BowlIcon from '@mui/icons-material/RiceBowl';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const StatCard = ({ icon: Icon, title, value, color }) => (
  <StyledCard>
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        <Icon sx={{ fontSize: 40, color: color, mr: 2 }} />
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" color={color}>
        {value}
      </Typography>
    </CardContent>
  </StyledCard>
);

const RoomChip = styled(Chip)(({ theme, status }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: status === 'clean' ? theme.palette.success.light : theme.palette.warning.light,
  color: status === 'clean' ? theme.palette.success.contrastText : theme.palette.warning.contrastText,
}));

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [open, setOpen] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [updatedRoom, setUpdatedRoom] = useState({});
  const [roomImage, setRoomImage] = useState(null);

  const [roomStats, setRoomStats] = useState({
    total: 0,
    clean: 0,
    maintenance: 0,
    occupied: 0,
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/room-status/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setRooms(response.data);
      calculateRoomStats(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const calculateRoomStats = (roomData) => {
    const stats = roomData.reduce((acc, room) => {
      acc.total++;
      acc[room.status]++;
      if (room.is_occupied) acc.occupied++;
      return acc;
    }, { total: 0, clean: 0, maintenance: 0, occupied: 0 });
    setRoomStats(stats);
  };

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

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setUpdatedRoom(room);
    setOpen(true);
    setUpdateMode(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRoom(null);
    setUpdateMode(false);
    setRoomImage(null);
  };

  const handleUpdateClick = () => {
    setUpdateMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedRoom({ ...updatedRoom, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setRoomImage(e.target.files[0]);
  };

  const handleSubmitUpdate = async () => {
    try {
      const formData = new FormData();
      Object.keys(updatedRoom).forEach(key => {
        formData.append(key, updatedRoom[key]);
      });
      if (roomImage) {
        formData.append('room_image', roomImage);
      }

      const response = await axios.put(
        `http://localhost:8000/api/updateroom/${selectedRoom.room_number}/`,
        formData,
        {
          headers: { 
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setSelectedRoom(response.data);
      setUpdateMode(false);
      fetchRooms(); // Refresh the room list
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const getTip = (room) => {
    const maxItems = { bottles: 2, cups: 4, wine_glasses: 2, bowls: 2 };
    const tips = [];

    if (room.bottle < maxItems.bottles) tips.push('Refill bottles.');
    if (room.cup < maxItems.cups) tips.push('Refill cups.');
    if (room.wine_glass < maxItems.wine_glasses) tips.push('Refill wine glasses.');
    if (room.bowl < maxItems.bowls) tips.push('Refill bowls.');
    if (room.status !== 'clean') tips.push('Clean the room again.');

    return tips.length ? tips.join(' ') : 'Everything is in order.';
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const pieChartData = [
    { name: 'Clean', value: roomStats.clean },
    { name: 'Maintenance', value: roomStats.maintenance },
  ];

  return (
    <div>
      <ResponsiveAppBarAdmin />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Room Overview</Typography>

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={BedIcon} title="Total Rooms" value={roomStats.total} color="primary.main" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={CleaningServicesIcon} title="Clean Rooms" value={roomStats.clean} color="success.main" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={BuildIcon} title="Maintenance" value={roomStats.maintenance} color="warning.main" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={PersonIcon} title="Occupied" value={roomStats.occupied} color="info.main" />
          </Grid>
        </Grid>

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={6}>
            
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom>All Rooms</Typography>
        <Grid container spacing={3}>
          {rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.room_number}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Room {room.room_number}
                  </Typography>
                  <RoomChip 
                    label={room.status.toUpperCase()} 
                    status={room.status}
                  />
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Last checked: {new Date(room.last_checked).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    Cleaned by: {room.employee || 'Not assigned'}
                  </Typography>
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                      <BottleIcon fontSize="small" />
                      <Typography variant="body2" ml={1}>{room.bottle}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <CupIcon fontSize="small" />
                      <Typography variant="body2" ml={1}>{room.cup}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <WineBarIcon fontSize="small" />
                      <Typography variant="body2" ml={1}>{room.wine_glass}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <BowlIcon fontSize="small" />
                      <Typography variant="body2" ml={1}>{room.bowl}</Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleRoomClick(room)}>View Details</Button>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="room-details-modal-title"
          aria-describedby="room-details-modal-description"
        >
          <Box sx={{ bgcolor: 'background.paper', p: 4, maxWidth: '600px', mx: 'auto', mt: 10, borderRadius: '8px' }}>
            {selectedRoom && (
              <div>
                <Typography variant="h5" id="room-details-modal-title">
                  Room {selectedRoom.room_number} Details
                </Typography>
                {!updateMode ? (
                  <>
                    <img src={selectedRoom.room_image} alt="Room" style={{ width: '100%', height: 'auto', maxHeight:'500px', marginBottom: '20px' }} />
                    <Typography variant="body1">
                      <strong>Status:</strong> {selectedRoom.status}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Last checked:</strong> {new Date(selectedRoom.last_checked).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Cleaned by:</strong> {selectedRoom.employee || 'Not assigned'}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Items:</strong> Bottles: {selectedRoom.bottle}, Cups: {selectedRoom.cup}, Wine Glasses: {selectedRoom.wine_glass}, Bowls: {selectedRoom.bowl}
                    </Typography>
                    <Typography variant="body1" color="error">
                      <strong>Tips:</strong> {getTip(selectedRoom)}
                    </Typography>
                    <Button onClick={handleUpdateClick} variant="contained" sx={{ mt: 2, mr: 2 }}>Update</Button>
                    <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>Close</Button>
                  </>
                ) : (
                  <>
                    <TextField
                      name="bottle"
                      label="Bottles"
                      type="number"
                      value={updatedRoom.bottle}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      name="cup"
                      label="Cups"
                      type="number"
                      value={updatedRoom.cup}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      name="wine_glass"
                      label="Wine Glasses"
                      type="number"
                      value={updatedRoom.wine_glass}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      name="bowl"
                      label="Bowls"
                      type="number"
                      value={updatedRoom.bowl}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select
                        labelId="status-label"
                        name="status"
                        value={updatedRoom.status}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="clean">Clean</MenuItem>
                        <MenuItem value="maintenance">Maintenance</MenuItem>
                      </Select>
                    </FormControl>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ margin: '20px 0' }}
                    />
                    <Button onClick={handleSubmitUpdate} variant="contained" sx={{ mt: 2, mr: 2 }}>Submit Update</Button>
                    <Button onClick={() => setUpdateMode(false)} variant="contained" sx={{ mt: 2 }}>Cancel</Button>
                  </>
                )}
              </div>
            )}
          </Box>
        </Modal>
      </Container>
      <Footer />
    </div>
  );
};

export default Rooms;