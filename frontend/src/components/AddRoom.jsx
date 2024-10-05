import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ResponsiveAppBarAdmin from './AdminNavbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
const AddRoom = () => {
  const [roomData, setRoomData] = useState({
    room_number: '',
    employee: '',
  });
  const [roomImage, setRoomImage] = useState(null);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch employees list
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/auth/staff/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        });
        setEmployees(response.data.filter(user => !user.is_staff)); // Assuming non-staff users are employees
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setRoomImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('room_number', roomData.room_number);
    formData.append('employee', roomData.employee); // Append employee_id
    if (roomImage) {
      formData.append('room_image', roomImage);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/createroom/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      });
      console.log('Room added successfully:', response.data);
      navigate('/home');
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  return (
    <div>
      <ResponsiveAppBarAdmin />
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Add New Room</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="room_number"
            label="Room Number"
            name="room_number"
            value={roomData.room_number}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="employee-label">Employee</InputLabel>
            <Select
              labelId="employee-label"
              id="employee"
              name="employee"
              value={roomData.employee}
              label="Employee"
              onChange={handleChange}
            >
              {employees.map((employee) => (
                <MenuItem key={employee.id} value={employee.id}>{employee.username}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <input
          accept="image/*"
          type="file"
          onChange={handleImageChange}
          style={{marginBottom: '40px',marginTop: '40px',fontSize: '20px'}}
        />
        {roomImage && (
          <Box mt={2}>
            <img src={URL.createObjectURL(roomImage)} alt="Room Preview" style={{ maxWidth: '300px',maxHeight:'200px' }} />
          </Box>
        )}

          {roomImage && <Typography variant="body2" sx={{ mt: 1 }}>File selected: {roomImage.name}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{marginBottom:'160px'}}
          >
            Add Room
          </Button>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default AddRoom;