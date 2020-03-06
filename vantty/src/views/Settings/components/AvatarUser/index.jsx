import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// Material-UI
import { Avatar, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// Helpers
import { getInitials } from "../../../../helpers";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center"
  },
  avatar: {
    marginTop: "0.5rem",
    margin: "auto",
    height: 90,
    width: 90
  },
  hello: {
    margin: "auto",
    paddingTop: "0.5rem",
    textAlign: "center"
  },
  progress: {
    margin: "2rem"
  },
  delete: {
    marginRight: "1rem"
  },
  button: {
    textAlign: "center",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
  },
  arrow: {
    marginLeft: "7px",
    fontSize: "13px"
  }
}));
const AvatarUser = ({ profileImage, firstName, profileStarted }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container direction='column' justify='center' alignItems='center'>
        {profileImage ? (
          <Fragment>
            <Avatar className={classes.avatar} src={profileImage} />
            <Typography className={classes.hello}>
              Hello! {firstName}. Welcome back!
            </Typography>
          </Fragment>
        ) : (
          <Fragment>
            <Avatar className={classes.avatar}>{getInitials(firstName)}</Avatar>
            <Typography className={classes.hello}>
              Hello! {firstName}. Welcome back!
            </Typography>
          </Fragment>
        )}
        {profileStarted && (
          <Button
            component={Link}
            variant='contained'
            color='primary'
            size='small'
            className={classes.button}
            // startIcon={<SettingsIcon />}
            to={"/create-profile"}
          >
            Finish my profile{" "}
            {<ArrowForwardIosIcon className={classes.arrow} />}
          </Button>
        )}
      </Grid>
    </Fragment>
  );
};

export default AvatarUser;
