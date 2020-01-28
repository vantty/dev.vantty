import React, { Fragment } from "react";
import { Avatar, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getInitials } from "../../../../helpers";
import { Link as LinkReact } from "react-router-dom";

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
          {!profile && (
            <Typography className={classes.hello}>
              <Link component={LinkReact} to={"/create-profile"}>
                Become to an Artists
              </Link>
            </Typography>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <Avatar className={classes.avatar}>{getInitials(firstName)}</Avatar>
          <Typography className={classes.hello}>
            Hello! {firstName}. Welcome back!
          </Typography>
          {!profile && (
            <Typography className={classes.hello}>
              <Link component={LinkReact} to={"/create-profile"}>
                Become to an Artists
              </Link>
            </Typography>
          )}
        </Fragment>
      )}
      {/* <Link href={"/creare-profile"} className={classes.link}>
      
    }
        Become to an Artist
      </Link> */}
    </div>
  );
};

export default AvatarUser;
