import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { userImage } from "../../../../../../actions/uploader";
import { loadUser, updateInfo } from "../../../../../../actions/auth";

import { getCurrentProfile } from "../../../../../../actions/profile";
// Material-UI
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { getInitials } from "../../../../../../helpers";

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
  auth: { user },
  ...rest
}) => {
  const classes = useStyles();

  const onChange = async e => {
    e.preventDefault();
    await userImage(e, user._id, user.profile, user.profileImage.cloudId);
  };
  const UploadButton = () => {
    return (
      <Fragment>
        <Button
          component="label"
          size="small"
          variant="outlined"
          color="primary"
        >
          Upload Picture
          <input
            style={{ display: "none" }}
            type="file"
            name="file"
            multiple
            onChange={onChange}
          />
        </Button>
      </Fragment>
    );
  };

  // const DeletePicture = () => {
  //   return (
  //     <Fragment>
  //       <LinkMui
  //         className={classes.delete}
  //         // disabled={!user.profileImage.original && true}
  //         component='button'
  //         variant='body2'
  //         onClick={() =>
  //           deleteUserPicture(
  //             user._id,
  //             user && user.profileImage && user.profileImage.cloudId
  //           )
  //         }
  //       >
  //         Delete Picture
  //       </LinkMui>
  //     </Fragment>
  //   );
  // };

  const loadImages = () => {
    if (user && user.profileImage.original) {
      return (
        <Fragment>
          <Avatar src={user.profileImage.original} className={classes.avatar} />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Avatar className={classes.avatar}>
            {user && getInitials(user.firstName)}
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  uploading: state.uploader.uploading,
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  userImage,
  loadUser,
  updateInfo,
  getCurrentProfile
})(AvatarUploader);
