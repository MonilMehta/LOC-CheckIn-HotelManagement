import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, Grid, Card, CardContent, LinearProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line, AreaChart, Area, CartesianGrid, ComposedChart
} from 'recharts';
import ResponsiveAppBarAdmin from './AdminNavbar';
import Footer from './Footer';

const DashboardStats = () => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/dashboard-stats/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setDashboardStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setLoading(false);

      // Fallback to static data if API fails
      setDashboardStats({
        room_data: {
          total_rooms: 50,
          clean: 30,
          maintenance: 20
        },
        employee_stats: [
          { employee: 'John Doe', cleaned_rooms: 10, accuracy: 95 },
          { employee: 'Jane Smith', cleaned_rooms: 8, accuracy: 92 },
        ],
        issues_stats: [
          { room_number: '101', reported_issues: 2 },
          { room_number: '102', reported_issues: 3 },
          { room_number: '103', reported_issues: 0 }
        ],
        room_trends: [
          { date: '2024-10-01', clean: 30, maintenance: 20 },
          { date: '2024-10-02', clean: 32, maintenance: 18 },
          { date: '2024-10-03', clean: 35, maintenance: 15 },
        ]
      });
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  // Static data fallback if API data is not available
  const roomData = dashboardStats?.room_data ? [
    { name: 'Clean', value: dashboardStats.room_data.clean },
    { name: 'Maintenance', value: dashboardStats.room_data.maintenance },
  ] : [
    { name: 'Clean', value: 30 },
    { name: 'Maintenance', value: 20 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const employeePerformanceData = dashboardStats?.employee_stats ? dashboardStats.employee_stats.map(employee => ({
    name: employee.employee,
    roomsCleaned: employee.cleaned_rooms,
    accuracy: employee.accuracy
  })) : [
    { name: 'John Doe', roomsCleaned: 10, accuracy: 95 },
    { name: 'Jane Smith', roomsCleaned: 8, accuracy: 92 }
  ];

  const issueData = dashboardStats?.issues_stats ? dashboardStats.issues_stats.map(issue => ({
    name: issue.room_number,
    issues: issue.reported_issues,
  })) : [
    { name: '101', issues: 2 },
    { name: '102', issues: 3 },
    { name: '103', issues: 0 }
  ];

  const roomTrendsData = dashboardStats?.room_trends ? dashboardStats.room_trends : [
    { date: '2024-10-01', clean: 30, maintenance: 20 },
    { date: '2024-10-02', clean: 32, maintenance: 18 },
    { date: '2024-10-03', clean: 35, maintenance: 15 }
  ];

  return (
    <div>
      <ResponsiveAppBarAdmin />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Dashboard Statistics</Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Room Status Overview</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={roomData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {roomData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Employee Performance</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={employeePerformanceData}>
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="roomsCleaned" fill="#8884d8" name="Rooms Cleaned" />
                    <Bar yAxisId="right" dataKey="accuracy" fill="#82ca9d" name="Accuracy (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* New Chart: Room Trends */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Room Trends Over Time</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={roomTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="clean" stroke="#82ca9d" name="Clean Rooms" />
                    <Line type="monotone" dataKey="maintenance" stroke="#8884d8" name="Rooms in Maintenance" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* New Chart: Room Issue Report */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Reported Issues in Rooms</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={issueData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="issues" fill="#ff8042" name="Reported Issues" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Room Status Details */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Room Status Details</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell align="right">Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">Total Rooms</TableCell>
                <TableCell align="right">{dashboardStats.room_data.total_rooms}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Clean Rooms</TableCell>
                <TableCell align="right">{dashboardStats.room_data.clean}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Rooms in Maintenance</TableCell>
                <TableCell align="right">{dashboardStats.room_data.maintenance}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Employee Performance Details */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Employee Performance Details</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell align="right">Rooms Cleaned</TableCell>
                <TableCell align="right">Cleaning Accuracy</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dashboardStats.employee_stats.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {employee.employee}
                  </TableCell>
                  <TableCell align="right">{employee.cleaned_rooms}</TableCell>
                  <TableCell align="right">{employee.accuracy.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </div>
  );
};

export default DashboardStats;
