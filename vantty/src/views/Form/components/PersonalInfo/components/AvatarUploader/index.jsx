import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components

// Actions
import { userImage } from "../../../../../../actions/uploader";
import { getCurrentProfile } from "../../../../../../actions/profile";
import {
  loadUser,
  updateInfo,
  deleteUserPicture
} from "../../../../../../actions/auth";

// Material-UI
import Progress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import LinkMui from "@material-ui/core/Link";
import { Typography, Avatar } from "@material-ui/core";
import AvatarPro from "./components/AvatarPro";

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
        {/* <Button
          size='small'
          component='label'
          color='primary'
          disabled={!profilePicture.original && true}
          // onClick={() => deleteUserPicture(id, profilePicture.cloudId)}
          onClick={() => deleteUserPicture(id, profilePicture.cloudId)}
        >
          Delete Picture
        </Button> */}
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
      return <AvatarPro profilePicture={profilePicture} />;
    }
  };

  // return (
  //   <Fragment>
  //     <DeletePicture />
  //     <UploadButton />
  //   </Fragment>
  //   // <Fragment>
  //   //   <UploadButton />
  //   // </Fragment>
  // );
  return (
    <div>
      <DeletePicture />
      <UploadButton />
    </div>
  );
};

AvatarUploader.propTypes = {
  userImage: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
  images: PropTypes.array,
  // profilePicture: PropTypes.object,
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
