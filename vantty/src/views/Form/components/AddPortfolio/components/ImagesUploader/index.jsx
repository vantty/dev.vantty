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
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
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
    float: "right",
    color: "black",
    boxShadow: "none",
    backgroundColor: theme.palette.greenVantty.light,
    "&:hover": {
      color: "black",
      backgroundColor: theme.palette.greenVantty.light
    }
  },
  message: {
    marginBottom: "1rem",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  waitMessage: {
    paddingTop: theme.spacing(1)
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
    // getCurrentProfile();
    getImages();
  }, []);

  const onChange = e => {
    uploadImages(e);
  };

  const loadMessage = () => {
    // const classesMsg = useStyles();
    if (profile !== null && images && images.length < 5) {
      return (
        <Typography variant="h5">
          You can upload as many pictures as you whant, and each of them must be
          tagged. However, please upload no more than 5 pictures at a time.
        </Typography>
      );
    }
  };

  const UploadButton = () => {
    return (
      <Fragment>
        <div className={classes.div}>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            component="label"
          >
            Upload Pictures
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
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
          <Typography variant="h5" className={classes.waitMessage}>
            {"This may take a while. Please wait..."}
          </Typography>
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

export default connect(mapStateToProps, {
  uploadImages,
  getCurrentProfile,
  getImages
})(ImagesUploader);
