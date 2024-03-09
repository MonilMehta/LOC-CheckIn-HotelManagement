import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import RoomAssessmentImage from './images/11132246.jpg';
import InventoryCheckImage from './images/5052358.jpg';
import IdealRoomImage from './images/5052364.png';

const HomeCarou = () => {
  return (
    <Carousel
      showArrows={true}
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      autoPlay={true} // Set autoPlay to true for automatic movement
      interval={5000} // Set the interval (in milliseconds) for the automatic movement
    >
      <div>
        <img src={RoomAssessmentImage} alt="Room Assessment" />
      </div>
      <div>
        <img src={InventoryCheckImage} alt="Inventory Check" />
      </div>
      <div>
        <img src={IdealRoomImage} alt="Ideal Room Image" />
      </div>
    </Carousel>
  );
};

export default HomeCarou;
