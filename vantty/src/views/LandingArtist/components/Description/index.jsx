import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Trust from "@material-ui/icons/VerifiedUser";
import User from "@material-ui/icons/Stars";
import Categories from "@material-ui/icons/Dashboard";

const styles = theme => ({
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    backgroundColor: theme.palette.background.white
  },
  grid: {
    display: "flex",
    position: "relative"
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  image: {
    height: 55
  },
  title: {
    marginBottom: theme.spacing(8),
    textAlign: "center"
  },
  subtitle: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180
  },
  infography: {
    fontSize: 100
  }
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <Fragment>
      <Container maxWidth="md" className={classes.container}>
        <Typography className={classes.title} variant="h2">
          How it works
        </Typography>
        <Grid container spacing={5} className={classes.grid}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <Trust className={classes.infography} />
              <Typography variant="h3" className={classes.subtitle}>
                Find
              </Typography>
              <Typography variant="h5">
                {
                  "Find an artist for your special event or inspiration for your new look browsing all categories we have for you"
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <User className={classes.infography} />
              <Typography variant="h3" className={classes.subtitle}>
                Book
              </Typography>
              <Typography variant="h5">
                {
                  "Book your artist in 3 easy steps: choose your services, pick the location and pay with your credit card"
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <Categories className={classes.infography} />
              <Typography variant="h3" className={classes.subtitle}>
                Share
              </Typography>
              <Typography variant="h5">
                {
                  "Leave a review to your artist sharing how was the services and be part of the Vantty community"
                }
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Divider />
    </Fragment>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductValues);
