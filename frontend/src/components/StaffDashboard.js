import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Button, Container, Box } from '@mui/material';
import ResponsiveAppBarStaff from './StaffNavbar';
import Modal from 'react-modal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';

const StaffDashboard = () => {
  const location = useLocation();
  const { floorNumber, roomNumber } = location.state || {};

  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [submittedData, setSubmittedData] = useState([]);

  const handleFileChange = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleSubmit = () => {
    const submissionTime = new Date().toLocaleString();
    const submissionData = {
      time: submissionTime,
      floorNumber,
      roomNumber,
      images: files.map((file) => URL.createObjectURL(file)),
    };

    setSubmittedData([submissionData, ...submittedData]);

    // Reset form after submission
    setFiles([]);
  };

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    setIsModalOpen(false);
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
            Floor Number: {floorNumber}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Room Number: {roomNumber}
          </Typography>
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
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </Button>
          {files.map((file, index) => (
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
                onClick={() => handleRemoveImage(index)}
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
          {/* Display submitted data below the submit button */}
          <Box sx={{ marginTop: '20px', textAlign: 'left' }}>
            <Typography variant="h5" color="textPrimary" gutterBottom>
              Submitted Data:
            </Typography>
            {submittedData.map((data, index) => (
              <div key={index}>
                <Typography variant="body1" color="textSecondary">
                  Time: {data.time}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Floor Number: {data.floorNumber}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Room Number: {data.roomNumber}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Images:
                  {data.images.map((image, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={image}
                      alt={`Selected Image ${imageIndex + 1}`}
                      style={{ width: '50px', height: 'auto', marginRight: '5px' }}
                    />
                  ))}
                </Typography>
                <hr />
              </div>
            ))}
          </Box>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Uploaded Image"
          >
            {selectedImageIndex !== null && (
              <img
                src={
                  files[selectedImageIndex].type &&
                  files[selectedImageIndex].type.startsWith('image/')
                    ? URL.createObjectURL(files[selectedImageIndex])
                    : ''
                }
                alt={`Selected Image ${selectedImageIndex + 1}`}
                style={{
                  width: '70%',
                  justifyContent: 'center',
                  display: 'flex',
                }}
              />
            )}
          </Modal>
        </Box>
      </Container>
    </div>
  );
};

export default StaffDashboard;
