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

const ImagesUploader = ({
  uploadImages,
  uploading,
  getImages,
  uploader: { images },
  // images,
  getCurrentProfile,
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
    getImages();
  }, []);

  const onChange = e => {
    uploadImages(e);
  };

  const UploadButton = () => {
    return (
      <Fragment>
        <Button variant='contained' component='label' color='primary'>
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

  const loadImages = () => {
    if (profile !== null) {
      return (
        <PortfolioPictures
          portfolioPictures={images}
          modelImagesId={profile.imagesId}
        />
      );
    }
  };

  const loadMessage = images => {
    if (profile !== null && images && images.length < 5) {
      return <Typography pt={5}>You need at least 5 pictures</Typography>;
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
          {/* {loadMessage()} */}
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
