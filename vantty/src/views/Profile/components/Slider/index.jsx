import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Table } from "./components";

//Google Analytics
import { gaEvent } from "../../../../marketing/gAnalytics";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "5.5rem"
    },
    position: "absolute"
  },
  book: {
    width: "100%",
    margin: theme.spacing(3, 1, 1)
  },
  paper: {
    padding: theme.spacing(2)
  },
  button: {
    width: "90%",
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.light
    }
  },
  title: {
    color: theme.palette.greenVantty.main
  },
  data: {
    marginBottom: theme.spacing(3)
  }
}));

export default function Slider({ profile, loadService, state, owner, user }) {
  const classes = useStyles();

  const load = (state, profile) => {
    loadService(state);
    gaEvent("Inicio checkout", "Click to checkout", profile.user);
  };
  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.paper}>
        <Typography className={classes.title} variant='body1'>
          Starting Cost
        </Typography>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography variant='h5' className={classes.data}>
              ${profile.price}
            </Typography>
          </Grid>
        </Grid>
        <Typography className={classes.title} variant='body1'>
          Availability
        </Typography>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography variant='h5' className={classes.data}>
              {profile.availability}
            </Typography>
          </Grid>
        </Grid>
        <Typography className={classes.title} variant='body1'>
          Services
        </Typography>
        <Table services={profile.services} />
        <Divider variant='middle' />
        <Fragment>
          {(user && user.profile) ||
            (!owner && (
              <div className={classes.book}>
                <Button
                  className={classes.button}
                  component={Link}
                  to={`/checkout/${profile.user}/${profile.bookId}`}
                  onClick={() => load(state, profile)}
                  variant='contained'
                  color='primary'
                >
                  Book
                </Button>
              </div>
            ))}
        </Fragment>
      </Paper>
    </div>
  );
}
