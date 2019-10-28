import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import { PortfolioPictures } from "./components";

// Actions
import { uploadImages, getImages } from "../../../../../../actions/uploader";
import { getCurrentProfile } from "../../../../../../actions/profile";

// Material-UI
import Progress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { Typography, makeStyles } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  div: {
    marginBottom: "1rem",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: theme.palette.greenVantty.light
  },
  message: {
    marginBottom: "1rem",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const ImagesUploader = ({
  uploadImages,
  uploading,
  getImages,
  uploader: { images },
  // images,
  getCurrentProfile,
  profile: { profile },
  tags,
  onChangeTags
}) => {
  const classes = useStyles();
  useEffect(() => {
    getCurrentProfile();
    getImages();
  }, []);

  const onChange = e => {
    uploadImages(e);
  };

  const loadMessage = () => {
    // const classesMsg = useStyles();
    if (profile !== null && images && images.length < 5) {
      return (
        <Typography variant='h5'>
          You need at least 5 pictures and each one of them must have a tag.
        </Typography>
      );
    }
  };

  const UploadButton = () => {
    return (
      <Fragment>
        <div className={classes.div}>
          <Button
            variant='contained'
            color='default'
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            component='label'
          >
            Upload Picture
            <input
              style={{ display: "none" }}
              type='file'
              name='file'
              multiple
              onChange={onChange}
            />
          </Button>
        </div>
      </Fragment>
    );
  };

  const loadImages = () => {
    if (profile !== null) {
      return (
        <PortfolioPictures
          portfolioPictures={images}
          modelImagesId={profile.imagesId}
          tags={tags}
          onChangeTags={onChangeTags}
        />
      );
    }
  };

  return (
    <Fragment>
      <UploadButton />
      {uploading || !profile ? (
        <Fragment>
          <Progress />
        </Fragment>
      ) : (
        <Fragment>
          {loadMessage()}
          {/* <LoadMessage /> */}
          {loadImages()}
        </Fragment>
      )}
    </Fragment>
  );
};

ImagesUploader.propTypes = {
  uploadImages: PropTypes.func.isRequired,
  uploader: PropTypes.object,
  uploading: PropTypes.bool.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getImages: PropTypes.func
};

const mapStateToProps = state => ({
  uploading: state.uploader.uploading,
  profile: state.profile,
  uploader: state.uploader
});

export default connect(
  mapStateToProps,
  { uploadImages, getCurrentProfile, getImages }
)(ImagesUploader);
