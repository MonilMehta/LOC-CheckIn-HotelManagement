import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

const RoomCard = ({ roomData, handleRoomClick }) => {
  const { room_number, status, room_image } = roomData;

  return (
    <Card>
      <CardActionArea onClick={() => handleRoomClick(room_number)}>
        <CardMedia
          component="img"
          height="140"
          image={room_image} // Use room_image as the image source
          alt={`Room ${room_number}`}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {`Room ${room_number}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Status: {status}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

RoomCard.propTypes = {
  roomData: PropTypes.object.isRequired,
  handleRoomClick: PropTypes.func.isRequired,
};

export default RoomCard;
