import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import { deletePicture } from "../../../../actions/profile";

//Material-UI
import { makeStyles } from "@material-ui/styles";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  avatar: {
    display: "inline-block",
    width: 30,
    height: 30
  }
}));

const AvatarPro = ({ profilePicture, deletePicture }) => {
  const classes = useStyles();

  const pictures = () => (
    <div>
      {[profilePicture].map((image, index) => (
        <Avatar src={image.original} className={classes.avatar} />
      ))}
    </div>
  );

  return <Fragment>{pictures()}</Fragment>;
};

AvatarPro.propTypes = {
  profilePicture: PropTypes.string,
  deletePicture: PropTypes.func.isRequired
};

export default connect(
  null,
  { deletePicture }
)(AvatarPro);
