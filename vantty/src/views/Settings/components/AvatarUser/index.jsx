import React, { Fragment } from "react";
import { Avatar, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: "auto",
    height: 90,
    width: 90
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
const AvatarUser = ({ profilePicture }) => {
  const classes = useStyles();
  return (
    <div>
      <br />
      <Fragment>
        <Avatar className={classes.avatar} src={profilePicture} />
      </Fragment>
      {/* <Link href={"/creare-profile"} className={classes.link}>
        Become to an Artist
      </Link> */}
    </div>
  );
};

export default AvatarUser;
