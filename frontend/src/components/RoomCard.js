import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const RoomCard = ({ roomData, handleRoomClick, visited }) => {
  return (
    <Card
      style={{
        cursor: 'pointer',
        backgroundColor: visited ? '#c8e6c9' : 'white',
        transition: 'transform 0.2s ease-in-out',
      }}
      onClick={() => handleRoomClick(roomData.room_number)}
    >
      <CardMedia
        component="img"
        alt={roomData.room_number.toString()}  // Use a relevant alt text
        height="140"
        image={roomData.room_image || '/static/images/placeholder.jpg'}  // Replace with the actual property
      />
      <CardContent>
        <Typography variant="h6" color="textPrimary" gutterBottom>
          Room {roomData.room_number}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Status: {roomData.status}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Employee: {roomData.employee}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
