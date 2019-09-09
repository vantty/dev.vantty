import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import { deletePicture } from "../../../actions/profile";

//Material-UI
import CancelIcon from "@material-ui/icons/CancelRounded";
import { makeStyles } from "@material-ui/styles";
import { GridListTile, GridList, Grid, Avatar } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 90,
    height: 90
  }
}));

const Picture = ({ profilePicture, deletePicture }) => {
  const classes = useStyles();

  const pictures = () => (
    //     {profilePicture.map(picture => (
    //       <GridListTile key={picture._id} style={{ height: "auto" }}>
    //         <span onClick={() => deletePicture(picture._id, picture.cloudId)}>

    <Fragment>
      <Grid container justify='center' alignItems='center'>
        {profilePicture && (
          <Avatar
            alt='Remy Sharp'
            src={profilePicture[0].original}
            className={classes.bigAvatar}
          />
        )}
      </Grid>
    </Fragment>
  );

  return <Fragment>{pictures()}</Fragment>;
};

Picture.propTypes = {
  profilePicture: PropTypes.array.isRequired,
  deletePicture: PropTypes.func.isRequired
};

export default connect(
  null,
  { deletePicture }
)(Picture);
