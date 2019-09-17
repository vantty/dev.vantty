import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components

// Actions
import { userImage } from "../../actions/uploader";
import { getCurrentProfile } from "../../actions/profile";
import { loadUser, updateInfo } from "../../actions/auth";
import { deleteUserPicture } from "../../actions/auth";

// Material-UI
import Progress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

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
  onSubmit,
  id,
  ...rest
}) => {
  useEffect(() => {
    loadUser();
    getCurrentProfile();
  }, []);

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
        <Button
          size='small'
          component='label'
          color='primary'
          disabled={!profilePicture.original && true}
          // onClick={() => deleteUserPicture(id, profilePicture.cloudId)}
          onClick={() => deleteUserPicture(id, profilePicture.cloudId)}
        >
          Delete Picture
        </Button>
      </Fragment>
    );
  };

  return (
    <Fragment>
      {/* <DeletePicture /> */}
      <UploadButton />
      {uploading && <Progress />}
    </Fragment>
  );
};

AvatarUploader.propTypes = {
  userImage: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
  images: PropTypes.array,
  profilePicture: PropTypes.object,
  getCurrentProfile: PropTypes.func.isRequired,
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
  { userImage, getCurrentProfile, deleteUserPicture, loadUser, updateInfo }
)(AvatarUploader);
