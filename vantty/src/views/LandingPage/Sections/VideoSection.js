import React from "react";
import GridContainer from "../components/GridContainer";
import GridItem from "../components/GridItem";
import { Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const BookingSection = ({ title, paragraph, video, direction }) => {
  const useStyles = makeStyles(theme => ({
    section: {
      padding: theme.spacing(4)
    },
    title: {
      minHeight: "32px",
      textDecoration: "none",
      display: "inline-block",
      position: "relative"
    },
    subTitle: {
      margintop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  }));
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify='center' direction={direction}>
        <GridItem xs={12} sm={12} md={6}>
          <Typography variant='h2' className={classes.title}>
            {title}
          </Typography>
          <Typography variant='h5' className={classes.subTitle}>
            {paragraph}
          </Typography>
          {/* </h5> */}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <iframe
              id='video'
              width='560'
              height='315'
              src={video}
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
