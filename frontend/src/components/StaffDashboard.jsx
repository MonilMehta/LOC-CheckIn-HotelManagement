import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Button, Container, Box, Grid } from '@mui/material';
import ResponsiveAppBarStaff from './StaffNavbar';
import Modal from 'react-modal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import Footer from './Footer';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const StaffDashboard = () => {
  const location = useLocation();
  const {  roomNumber } = location.state || {};

  const [filesCleanliness, setFilesCleanliness] = useState([]);
  const [filesInventory, setFilesInventory] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [submittedData, setSubmittedData] = useState([]);

  const handleFileChangeCleanliness = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFilesCleanliness([...filesCleanliness, ...uploadedFiles]);
  };

  const handleFileChangeInventory = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFilesInventory([...filesInventory, ...uploadedFiles]);
  };

  const handleRemoveImageCleanliness = (index) => {
    const updatedFiles = [...filesCleanliness];
    updatedFiles.splice(index, 1);
    setFilesCleanliness(updatedFiles);
  };

  const handleRemoveImageInventory = (index) => {
    const updatedFiles = [...filesInventory];
    updatedFiles.splice(index, 1);
    setFilesInventory(updatedFiles);
  };
  const {token}=useAuth();
  console.log('Token : ' + token)

  const handleSubmit = async () => {
    
    const cleanlinessSubmissionData = {
      type: 'Cleanliness Check',
      time: new Date().toLocaleString(),
      roomNumber,
      images: filesCleanliness,
    };
  
    const inventorySubmissionData = {
      type: 'Inventory Check',
      time: new Date().toLocaleString(),
      roomNumber,
      images: filesInventory,
    };
  
    // API endpoints
    const cleanlinessEndpoint = 'http://127.0.0.1:8000/api/createroom/';
    const inventoryEndpoint = 'http://127.0.0.1:8000/api/inventory-check/';
  
    try {
      // Send cleanliness data
      const cleanlinessFormData = new FormData();
      cleanlinessFormData.append('room_number', roomNumber);
      cleanlinessSubmissionData.images.forEach((file) => {
        cleanlinessFormData.append('room_image', file);
      });
      const cleanlinessResponse = await axios.post(cleanlinessEndpoint, cleanlinessFormData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log('Cleanliness Response:', cleanlinessResponse);
  
      // Send inventory data
      const inventoryResponses = await Promise.all(
        inventorySubmissionData.images.map(async (file) => {
          const inventoryFormData = new FormData();
          inventoryFormData.append('room_number', roomNumber);
          inventoryFormData.append('image', file);
          return axios.post(inventoryEndpoint, inventoryFormData, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
        })
      );
      console.log('Inventory Responses:', inventoryResponses);
  
      // Reset form after successful submission
      setFilesCleanliness([]);
      setFilesInventory([]);
      const cleanlinessData = await cleanlinessResponse.json();
      // For inventory, we are directly storing the data in the database, so no need to parse the response
      setSubmittedData([cleanlinessData, ...submittedData]);
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle error as needed
    }
  };

  return (
    <div>
      <ResponsiveAppBarStaff />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" color="textPrimary" gutterBottom>
            Staff Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Room Number: {roomNumber}
          </Typography>

          {/* Cleanliness Check */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                Cleanliness Check
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload File
                <input
                  type="file"
                  multiple
                  onChange={handleFileChangeCleanliness}
                  style={{ display: 'none' }}
                />
              </Button>
            </Grid>
          </Grid>

          {filesCleanliness.map((file, index) => (
            <div
              key={index}
              style={{
                width: '80%',
                height: 'auto',
                marginTop: '20px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {file.type && file.type.startsWith('image/') && (
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Selected Image ${index + 1}`}
                  style={{ width: '100%', height: 'auto', marginBottom: '5px' }}
                  onClick={() => openModal(index)}
                />
              )}
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => handleRemoveImageCleanliness(index)}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  padding: '2px',
                  borderRadius: '50%',
                }}
              >
                &#10005;
              </Button>
            </div>
          ))}

          {/* Inventory Check */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                Inventory Check
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload File
                <input
                  type="file"
                  multiple
                  onChange={handleFileChangeInventory}
                  style={{ display: 'none' }}
                />
              </Button>
            </Grid>
          </Grid>

          {filesInventory.map((file, index) => (
            <div
              key={index}
              style={{
                width: '80%',
                height: 'auto',
                marginTop: '10px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {file.type && file.type.startsWith('image/') && (
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Selected Image ${index + 1}`}
                  style={{ width: '100%', height: 'auto', marginBottom: '5px' }}
                  onClick={() => openModal(index)}
                />
              )}
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => handleRemoveImageInventory(index)}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  padding: '2px',
                  borderRadius: '50%',
                  marginTop:'40px'
                }}
              >
                &#10005;
              </Button>
            </div>
          ))}

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={handleSubmit}
            sx={{
              mt: 3,
              color: 'white',
              '&:hover': { backgroundColor: '#1976D2' },
            }}
          >
            Submit
          </Button>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default StaffDashboard;
