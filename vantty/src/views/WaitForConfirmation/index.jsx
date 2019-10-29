import React from "react";
import { Redirect, Link as RouterLink, withRouter } from "react-router-dom";

// Material-UI
import { CssBaseline, Typography, Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2)
  },
  text: {
    marginBottom: theme.spacing(2)
  },
  button: {
    marginBottom: theme.spacing(10),
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
  }
}));

const WaitForConfirmation = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h2" className={classes.title}>
          Just one more step!
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          Please confirm your email address. If our email is not inside Inbox
          folder, please verify the Spam folder. If you did not receive any
          email, please click the link below.
        </Typography>
        <Button
          component={RouterLink}
          to="/register"
          color="primary"
          variant="contained"
          className={classes.button}
        >
          Resend Confirmation Email
        </Button>
      </div>
    </Container>
  );
};

export default WaitForConfirmation;
