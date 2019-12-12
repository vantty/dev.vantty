import React, { Fragment } from "react";
import { Avatar, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
  },
  link: {
    margin: "auto"
  }
}));
const AvatarUser = ({ profilePicture, firstName }) => {
  const classes = useStyles();
  return (
    <div>
      <br />
      {console.log(profilePicture)}
      {profilePicture ? (
        <Fragment>
          <Avatar className={classes.avatar} src={profilePicture.original} />
          <Typography className={classes.hello}>
            Hello! {firstName}. Welcome back!
          </Typography>
        </Fragment>
      ) : (
        <Avatar className={classes.avatar}>{getInitials(firstName)}</Avatar>
      )}
      {/* <Link href={"/creare-profile"} className={classes.link}>
      
    }
        Become to an Artist
      </Link> */}
    </div>
  );
};

export default AvatarUser;
