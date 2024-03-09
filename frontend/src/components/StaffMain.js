import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ResponsiveAppBarStaff from "./StaffNavbar";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import Footer from "./Footer";

const StaffMain = () => {
  const navigate = useNavigate();
  const [numberOfFloors, setNumberOfFloors] = useState(3);
  const [numberOfRooms, setNumberOfRooms] = useState(9);
  const [roomInspections, setRoomInspections] = useState([]);
  const [visitedRooms, setVisitedRooms] = useState(new Set());
  const [editMode, setEditMode] = useState(false);

  // Function to fetch room data from the API
  const fetchRoomData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/room-status/",
        {
          headers: {
            Authorization:
              "Token a906006c4b9463afadd86e76e4f3ada05600986c09fdd03768f91c951e032522",
          },
        }
      );
      console.log("API Response:", response);
      // Update roomInspections state with fetched data
      setRoomInspections(response.data);
    } catch (error) {
      console.error("Error fetching room data:", error.message);
    }
  };

  useEffect(() => {
    // Fetch room data when the component mounts
    fetchRoomData();
  }, []);

  const organizeRooms = (cleanlinessStatus) => {
    const organizedRooms = {};
    roomInspections
      .filter((inspection) => inspection.cleanliness === cleanlinessStatus)
      .forEach((inspection) => {
        const floorNumber = Math.ceil(inspection.room_number / numberOfRooms);
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
                  cursor: "pointer",
                  backgroundColor: visitedRooms.has(inspection.room_number)
                    ? "#c8e6c9"
                    : "white",
                  transition: "transform 0.2s ease-in-out",
                  ":hover": {
                    transform: "scale(2)",
                  },
                }}
                onClick={() => handleRoomClick(inspection.room_number)}
              >
                <CardContent>
                  <Typography variant="h6" color="textPrimary" gutterBottom>
                    Room {inspection.room_number}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {inspection.status}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Employee: {inspection.employee}
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
    setVisitedRooms((prevVisitedRooms) =>
      new Set(prevVisitedRooms).add(roomNumber)
    );
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
      <Button variant="contained" color="primary" onClick={fetchRoomData}>
        Fetch Room Data
      </Button>
      <div
        style={{
          textAlign: "center",
          padding: "20px",
        }}
      >
        <Typography variant="h3" color="textPrimary" gutterBottom>
          Staff Dashboard
        </Typography>
        <div style={{ marginBottom: "20px" }}>
          <TextField
            label="Number of Floors"
            type="number"
            variant="outlined"
            value={numberOfFloors}
            onChange={(e) => setNumberOfFloors(Number(e.target.value))}
            style={{ marginRight: "20px" }}
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
            Room Details
          </Typography>
          {organizeRooms()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StaffMain;
