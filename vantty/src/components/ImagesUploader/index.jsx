import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import PortfolioPictures from "./Porfolio";

// Actions
import { uploadImages } from "../../actions/uploader";
import { getCurrentProfile } from "../../actions/profile";

// Material-UI
import Progress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const ImagesUploader = ({
  uploadImages,
  uploading,
  images,
  getCurrentProfile,
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  const onChange = e => {
    uploadImages(e);
  };

  const UploadButton = () => {
    return (
      <Fragment>
        <Button variant="contained" component="label" color="primary">
          Upload File
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

  const loadImages = () => {
    if (profile !== null) {
      return (
        <PortfolioPictures portfolioPictures={profile.portfolioPictures} />
      );
    }
  };

  const loadMessage = () => {
    if (profile !== null && profile.portfolioPictures.length < 5) {
      return <Typography pt={5}>You need at least 5 pictures</Typography>;
    }
  };

  return (
    <Fragment>
      <UploadButton />
      {uploading ? (
        <Fragment>
          <Progress />
        </Fragment>
      ) : (
        <Fragment>
          {loadMessage()} {loadImages()}
        </Fragment>
      )}
    </Fragment>
  );
};

ImagesUploader.propTypes = {
  uploadImages: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
  images: PropTypes.array,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  uploading: state.uploader.uploading,
  images: state.uploader.images,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { uploadImages, getCurrentProfile }
)(ImagesUploader);
