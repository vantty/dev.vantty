import React, { Fragment } from "react";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {},
  snackbar: {
    // [theme.breakpoints.down("xs")]: {
    //   bottom: 90
    // },
    position: "relative",
    // bottom: theme.spacing(2),
    marginTop: "1rem",
    zIndex: 0,
    backgroundColor: theme.palette.purpleVantty.light
  }
}));

const MessageVerified = ({ profile }) => {
  const classes = useStyles();
  return (
    <div>
      <Fragment>
        <Snackbar />
        <SnackbarContent
          className={classes.snackbar}
          aria-describedby='client-snackbar'
          message={
            <span id='client-snackbar' className={classes.message}>
              Hello {profile.name.firstName}. Your profile will be enabled in 2
              hours by one of our artists! Thank you for believing in you and
              your personal brand. Att: the founders of vantty{" "}
            </span>
          }
        />
      </Fragment>
    </div>
  );
};

export default MessageVerified;
