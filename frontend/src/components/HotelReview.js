import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import image1 from "./images/img1.jpeg";
import image2 from "./images/img2.jpeg";
import image3 from "./images/img3.jpeg";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const HotelReviewCard = () => {
  const [expanded, setExpanded] = React.useState([false, false, false]);

  const handleExpandClick = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const images = [image1, image2, image3];

  return (
    <Grid container spacing={2}>
      {images.map((image, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
                  U
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="User Name"
              subheader="Date of Stay: January 1, 2022"
            />
            <CardMedia
              component="img"
              height="194"
              image={image}
              alt="User's stay at the hotel"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                We had an amazing stay at this hotel. The staff was friendly,
                and the amenities were top-notch. The room was clean and
                comfortable. Highly recommended!
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expanded[index]}
                onClick={() => handleExpandClick(index)}
                aria-expanded={expanded[index]}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
              <CardContent>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep
                skillet over medium-high heat. Add chicken, shrimp and chorizo,
                and cook, stirring occasionally until lightly browned, 6 to 8
                minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves,
                garlic, tomatoes, onion, salt and pepper, and cook, stirring
                often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a
                boil. Add rice and stir very gently to distribute. Top with
                artichokes and peppers, and cook without stirring, until most of
                the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                medium-low, add reserved shrimp and mussels, tucking them down
                into the rice, and cook again without stirring, until mussels
                have opened and rice is just tender, 5 to 7 minutes more.
                (Discard any mussels that don't open.)
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default HotelReviewCard;
