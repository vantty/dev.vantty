import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { userImage } from "../../../../../../actions/uploader";
import {
  loadUser,
  updateInfo,
  deleteUserPicture
} from "../../../../../../actions/auth";

import { getCurrentProfile } from "../../../../../../actions/profile";
// Material-UI
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { getInitials, getStrategy } from "../../../../../../helpers";

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
  }
}));

const AvatarUploader = ({
  userImage,
  uploading,
  getCurrentProfile,
  updateInfo,
  history,
  loadUser,
  formData,
  deleteUserPicture,
  profile: { profile },
  auth: { user },
  ...rest
}) => {
  const classes = useStyles();
  const method = getStrategy(user);

  useEffect(() => {
    loadUser();
  }, []);

  const onChange = async e => {
    e.preventDefault();
    await userImage(
      e,
      user._id,
      profile,
      method.profilePicture ? method.profilePicture.cloudId : false
    );
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
          Upload Picture
          <input
            style={{ display: "none" }}
            type='file'
            name='file'
            multiple
            onChange={onChange}
            // value={user && method.profilePicture}
          />
        </Button>
      </Fragment>
    );
  };
  // const method = getStrategy(user);

  // const DeletePicture = () => {
  //   return (
  //     <Fragment>
  //       <LinkMui
  //         className={classes.delete}
  //         // disabled={!method.profilePicture.original && true}
  //         component='button'
  //         variant='body2'
  //         onClick={() =>
  //           deleteUserPicture(
  //             user._id,
  //             user && method.profilePicture && method.profilePicture.cloudId
  //           )
  //         }
  //       >
  //         Delete Picture
  //       </LinkMui>
  //     </Fragment>
  //   );
  // };

  const loadImages = () => {
    if (user && method.profilePicture && method.profilePicture.original) {
      return (
        <Fragment>
          <Avatar
            src={method.profilePicture.original}
            className={classes.avatar}
          />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Avatar className={classes.avatar}>
            {getInitials(method && method.firstName)}
          </Avatar>
        </Fragment>
      );
    }
  };

  return (
    <div>
      {uploading ? (
        <Fragment>
          <span className={classes.progress}>
            <CircularProgress />
          </span>
        </Fragment>
      ) : (
        <Fragment>{<Fragment>{loadImages()}</Fragment>}</Fragment>
      )}
      <br />
      {/* <Fragment>{DeletePicture()}</Fragment> */}
      <UploadButton />
    </div>
  );
};

AvatarUploader.propTypes = {
  userImage: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
  updateInfo: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteUserPicture: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  uploading: state.uploader.uploading,
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  userImage,
  deleteUserPicture,
  loadUser,
  updateInfo,
  getCurrentProfile
})(AvatarUploader);
