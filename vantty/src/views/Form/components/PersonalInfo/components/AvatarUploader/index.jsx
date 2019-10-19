import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { userImage } from "../../../../../../actions/uploader";
import {
  loadUser,
  updateInfo,
  deleteUserPicture
} from "../../../../../../actions/auth";

// Material-UI
import Button from "@material-ui/core/Button";
import LinkMui from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  avatar: {
    display: "inline-block",
    width: 30,
    height: 30
  }
}));

const AvatarUploader = ({
  userImage,
  uploading,
  images,
  getCurrentProfile,
  updateInfo,
  history,
  loadUser,
  deleteUserPicture,
  profile: { profile },
  profilePicture,
  id,
  classes,
  ...rest
}) => {
  // const classes = useStyles();
  const onChange = e => {
    userImage(e, id, profile);
  };

  const UploadButton = () => {
    return (
      <Fragment>
        <Button
          component='label'
          size='small'
          variant='outlined'
          color='primary'
        >
          Upload File
          <input
            style={{ display: "none" }}
            type='file'
            name='file'
            multiple
            onChange={onChange}
          />
        </Button>
      </Fragment>
    );
  };

  const DeletePicture = () => {
    return (
      <Fragment>
        <LinkMui
          style={{ marginRight: "1rem" }}
          disabled={!profilePicture.original && true}
          component='button'
          variant='body2'
          onClick={() => deleteUserPicture(id, profilePicture.cloudId)}
        >
          Delete Picture
        </LinkMui>
      </Fragment>
    );
  };

  const loadImages = () => {
    if (profile !== null) {
      // return <AvatarPro profilePicture={profilePicture} />;
      return <Avatar src={profilePicture.original} className={classes} />;
    }
  };

  return (
    <Fragment>
      {uploading ? (
        <Fragment>
          <CircularProgress />
        </Fragment>
      ) : (
        <Fragment>{/* <Fragment>{loadImages()}</Fragment> */}</Fragment>
      )}
      <br />
      <Fragment>{DeletePicture()}</Fragment>
      <UploadButton />
    </Fragment>
  );
};

AvatarUploader.propTypes = {
  userImage: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
  images: PropTypes.array,
  updateInfo: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteUserPicture: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  uploading: state.uploader.uploading,
  images: state.uploader.images,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { userImage, deleteUserPicture, loadUser, updateInfo }
)(AvatarUploader);
