import React from "react";
import GridContainer from "../components/GridContainer";
import GridItem from "../components/GridItem";
import { Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const BookingSection = () => {
  const useStyles = makeStyles(theme => ({
    section: {
      padding: "70px 0"
    },
    title: {
      marginBottom: "1rem",
      marginTop: "30px",
      minHeight: "32px",
      textDecoration: "none",
      margin: "1.75rem 0 0.875rem",
      display: "inline-block",
      position: "relative"
    },
    description: {
      color: "#999"
    },
    media: {
      height: 440
    }
  }));
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={6}>
          <Typography variant='h2' className={classes.title}>
            How my client can book me?
          </Typography>
          <Typography variant='h5'>
            This is the paragraph where you can write more details about your
            product. Keep you user engaged by providing meaningful information.
            Remember that by this time, the user is curious, otherwise he wouldn
            {"'"}t scroll to get here. Add a button if you want the user to see
            more.
          </Typography>
          {/* </h5> */}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <iframe
              id='video'
              width='560'
              height='315'
              src='https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG'
              frameborder='0'
              allow='autoplay; encrypted-media'
              allowfullscreen
            ></iframe>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default BookingSection;
