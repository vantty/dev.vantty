import React, { Fragment } from "react";

// Material-UI
import { Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Helpers
import { getInitials } from "../../../../helpers";

const useStyles = makeStyles(theme => ({
  avatar: {
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
  }
}));
const AvatarUser = ({ profileImage, firstName, profile }) => {
  const classes = useStyles();
  return (
    <div>
      <br />
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
    </div>
  );
};

export default AvatarUser;
