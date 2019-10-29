import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 260,
    // backgroundColor: theme.palette.background.paper,
    marginTop: "5.5rem",
    position: "absolute"
  },
  chip: {
    marginRight: theme.spacing(1)
  },
  section1: {
    margin: theme.spacing(1)
  },
  section2: {
    margin: theme.spacing(2)
  },
  section3: {
    width: "100%",
    margin: theme.spacing(3, 1, 1)
  },
  paper: {
    padding: theme.spacing(2)
    // backgroundColor: "white"
  },
  button: {
    color: "white",
    backgroundColor: theme.palette.whatsApp.primary,
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.whatsApp.primary
    }
  },
  // button: {
  //   marginTop: "0.5rem",
  //   marginBottom: "0.5rem",
  //   width: "10rem",
  //   float: "right",
  //   color: "white",
  //   boxShadow: "none",
  //   backgroundColor: theme.palette.whatsApp.primary,
  //   "&:hover": {
  //     color: "white",
  //     backgroundColor: theme.palette.whatsApp.primary
  //   }
  // },
  infoPrice: {
    fontSize: "10px"
  }
}));

export default function Slider({ profile, disabled, verified, user }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.paper}>
        {/* <div className={classes.section1}> */}
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography gutterBottom variant='h5'>
              ${profile.price}
              <span className={classes.infoPrice}> /cad</span>
            </Typography>
          </Grid>
        </Grid>
        <Typography color='primary' variant='body1'>
          Starting Cost
        </Typography>

        {!disabled && (
          <Fragment>
            <br />
            <Divider variant='middle' />

            <div className={classes.section3}>
              <Button
                className={classes.button}
                disabled={!verified}
                variant='contained'
              >
                <Fragment>
                  <a
                    className={classes.button}
                    target='#'
                    href={`https://api.whatsapp.com/send?phone=${profile.mobileNumber}&text=Hello!%20${profile.name.firstName},%20I%20watched%20your%20profile%20in%20www.vantty.ca,%20so%20I%20wanted%20to%20get%20an%20appointment%20with%20you!`}
                  >
                    Whatsapp Contact
                  </a>
                </Fragment>
              </Button>
            </div>
          </Fragment>
        )}
      </Paper>
    </div>
  );
}
