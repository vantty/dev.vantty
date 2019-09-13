import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components

// Actions
import { profileImage } from "../../actions/uploader";
import { getCurrentProfile, deleteProfilePicture } from "../../actions/profile";

// Material-UI
import Progress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const AvatarUploader = ({
  profileImage,
  uploading,
  images,
  getCurrentProfile,
  deleteProfilePicture,
  profile: { profile },
  profilePicture
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  const onChange = e => {
    profileImage(e);
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
          disabled={profilePicture.length === 0 && true}
          onClick={() =>
            deleteProfilePicture(
              profilePicture[0]._id,
              profilePicture[0].cloudId
            )
          }
        >
          Delete Picture
        </Button>
      </Fragment>
    );
  };

  // const loadImages = () => {
  //   if (profile !== null) {
  //     return <Picture profilePicture={profilePicture} />;
  //   }
  // };
  return (
    <Fragment>
      <DeletePicture />
      <UploadButton />
    </Fragment>
  );
};

AvatarUploader.propTypes = {
  profileImage: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
  images: PropTypes.array,
  profilePicture: PropTypes.array,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteProfilePicture: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  uploading: state.uploader.uploading,
  images: state.uploader.images,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { profileImage, getCurrentProfile, deleteProfilePicture }
)(AvatarUploader);
