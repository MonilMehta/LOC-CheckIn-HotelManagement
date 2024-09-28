import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { 
  Typography, Grid, Paper, Box, Container, Card, CardContent, 
  CardActionArea, Chip, LinearProgress, Avatar, Modal
} from '@mui/material';
import AdminReport from './AdminReport';
import { useAuth } from '../context/AuthContext';

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

const EmployeePerformanceCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({
    total: 0,
    clean: 0,
    maintenance: 0,
    occupied: 0,
  });
  const [roomInspections, setRoomInspections] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [employeeStats, setEmployeeStats] = useState([]);
  const [visitedRooms, setVisitedRooms] = useState(new Set());
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { token } = useAuth();
  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
  };
  const fetchRoomData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/room-status/', {
        headers: { Authorization: `Token ${token}` },
      });
      setRoomInspections(response.data);
      const stats = response.data.reduce((acc, room) => {
        acc.total++;
        acc[room.status]++;
        if (room.is_occupied) acc.occupied++;
        return acc;
      }, { total: 0, clean: 0, maintenance: 0, occupied: 0 });
      setRoomData(stats);
    } catch (error) {
      console.error('Error fetching room data:', error.message);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin/dashboard-stats/', {
        headers: { Authorization: `Token ${token}` },
      });
      setDashboardStats(response.data.room_data);
      setEmployeeStats(response.data.employee_stats.sort((a, b) => b.cleaned_rooms - a.cleaned_rooms));
    } catch (error) {
      console.error('Error fetching dashboard stats:', error.message);
    }
  };

  useEffect(() => {
    fetchRoomData();
    fetchDashboardStats();
  }, [token]);

  // const handleRoomClick = (roomNumber) => {
  //   navigate(`/AdminReport`, { state: { roomNumber } });
  //   setVisitedRooms(prev => new Set(prev).add(roomNumber));
  // };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const pieChartData = [
    { name: 'Clean', value: dashboardStats.clean || 0 },
    { name: 'Maintenance', value: dashboardStats.maintenance || 0 },
  ];

  const barChartData = employeeStats.map(employee => ({
    name: employee.employee,
    cleanedRooms: employee.cleaned_rooms,
    accuracy: employee.accuracy,
  }));

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      <ResponsiveAppBarAdmin />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" color="textPrimary" gutterBottom>
          Admin Dashboard
        </Typography>
        
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={BedIcon} title="Total Rooms" value={dashboardStats.total_rooms || 0} color="primary.main" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={CleaningServicesIcon} title="Clean Rooms" value={dashboardStats.clean || 0} color="success.main" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={BuildIcon} title="Maintenance" value={dashboardStats.maintenance || 0} color="warning.main" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={PersonIcon} title="Occupied" value={roomData.occupied} color="info.main" />
          </Grid>
        </Grid>

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography variant="h6" gutterBottom>Room Status Overview</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography variant="h6" gutterBottom>Employee Performance Overview</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="cleanedRooms" fill="#8884d8" name="Cleaned Rooms" />
                  <Bar yAxisId="right" dataKey="accuracy" fill="#82ca9d" name="Accuracy (%)" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="h5" color="textPrimary" gutterBottom>
          Room Status
        </Typography>
        <Paper sx={{ p: 2, mb: 4 }}>
          <Grid container spacing={2}>
            {roomInspections.map((room) => (
              <Grid item key={room.room_number} xs={12} sm={6} md={4} lg={3}>
                <StyledCard>
                  <CardActionArea onClick={() => handleRoomClick(room)}>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        Room {room.room_number}
                      </Typography>
                      <RoomChip
                        label={room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                        status={room.status}
                      />
                      <Box mt={2}>
                        <Typography variant="body2">Last checked: {new Date(room.last_checked).toLocaleString()}</Typography>
                        <Typography variant="body2">Employee: {room.employee}</Typography>
                      </Box>
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
                  </CardActionArea>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Typography variant="h5" color="textPrimary" gutterBottom>
          Employee Performance
        </Typography>
        <Box mb={4}>
          {employeeStats.map((employee, index) => (
            <EmployeePerformanceCard key={employee.employee}>
              <Avatar sx={{ bgcolor: COLORS[index % COLORS.length], mr: 2 }}>
                {employee.employee.charAt(0)}
              </Avatar>
              <Box flexGrow={1}>
                <Typography variant="h6">{employee.employee}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Cleaned Rooms: {employee.cleaned_rooms}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <Typography variant="body2" color="textSecondary" mr={1}>
                    Accuracy:
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={employee.accuracy}
                    sx={{ flexGrow: 1, mr: 1 }}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {employee.accuracy.toFixed(2)}%
                  </Typography>
                </Box>
              </Box>
            </EmployeePerformanceCard> 
          ))}
        </Box>
        <Modal
          open={Boolean(selectedRoom)}
          onClose={handleCloseModal}
          aria-labelledby="room-detail-modal"
          aria-describedby="room-detail-description"
        >
          <Box sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 800,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            {selectedRoom && (
              <AdminReport room={selectedRoom} onClose={handleCloseModal} />
            )}
          </Box>
        </Modal>
      </Container>
      <Footer />
    </Box>
  );
};

export default AdminDashboard;