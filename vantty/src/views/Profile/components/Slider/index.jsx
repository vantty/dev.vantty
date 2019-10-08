import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import { getStrategyName } from "../../../../helpers";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 260,
    backgroundColor: theme.palette.background.paper,
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
    padding: theme.spacing(2),
    backgroundColor: theme.palette.white
  },
  button: {
    // backgroundColor: theme.palette.greenVantty.main,
    color: "white",
    backgroundColor: "#25D366"
  }
}));

export default function Slider({ profile }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.paper}>
        {/* <div className={classes.section1}> */}
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography gutterBottom variant='h5'>
              ${profile.price}
            </Typography>
          </Grid>
        </Grid>
        <Typography color='primary' variant='body1'>
          Starting Cost
        </Typography>
        {/* </div> */}
        <br />
        <Divider variant='middle' />

        <div className={classes.section3}>
          {/* <Button variant='contained' size='large' className={classes.button}>
            Contact
          </Button> */}
          <a
            target='#'
            href={`https://api.whatsapp.com/send?phone=${profile.mobileNumber}&text=Hola!%20${profile.name.firstName},%20Vi%20tu%20perfíl%20en%20www.vantty.com,%20y%20quiero%20tener%20una%20cita%20contigo!`}
          >
            <Button
              className={classes.button}
              //   className={classes.buttonDrawer}
              variant='contained'
            >
              Contact Whatsapp
            </Button>
          </a>
        </div>
      </Paper>
    </div>
  );
}
