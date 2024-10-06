import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, Grid, Card, CardContent, LinearProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import ResponsiveAppBarAdmin from './AdminNavbar';
import Footer from './Footer';

const EmployeeDetails = () => {
  const [employeeStats, setEmployeeStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployeeStats();
  }, []);

  const fetchEmployeeStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/dashboard-stats/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setEmployeeStats(response.data.employee_stats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employee stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <div>
      <ResponsiveAppBarAdmin />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Employee Performance</Typography>
        <Grid container spacing={3}>
          {employeeStats.map((employee, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{employee.employee}</Typography>
                  <Typography variant="body1">
                    Rooms Cleaned: {employee.cleaned_rooms}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cleaning Accuracy: {employee.accuracy.toFixed(2)}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={employee.accuracy} 
                    sx={{ mt: 1, mb: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Detailed Performance Table</Typography>
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
              {employeeStats.map((employee, index) => (
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

export default EmployeeDetails;