import React from "react";
import GridContainer from "../components/GridContainer";
import GridItem from "../components/GridItem";
import { Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Video } from "../../../components";

const BookingSection = ({ title, paragraph, url, direction }) => {
  const useStyles = makeStyles(theme => ({
    section: {
      padding: theme.spacing(4),
      background: theme.palette.pinkVantty.light,
      borderRadius: "8px"
    },
    title: {
      minHeight: "32px",
      textDecoration: "none",
      display: "inline-block",
      position: "relative"
    },
    subTitle: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    video: {
      height: "300px"
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
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card className={classes.video}>
            <Video video={url} />
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default BookingSection;
