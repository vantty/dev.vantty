import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

//Actions
import { addPortfolio, getCurrentProfile } from "../../../../actions/profile";

//Components
import { ImagesUploader } from "./components";
import { FormBottomNav } from "../ComponentsForm";

// Material-UI
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Progress from "@material-ui/core/LinearProgress";
import { getImages } from "../../../../actions/uploader";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  buttonUpload: {
    textAlign: "center"
  },
  name: {
    textAlign: "center",
    paddingBottom: "0.5rem"
  },
  avatar: {
    margin: "auto",
    height: 90,
    width: 90
  }
}));

const AddPortfolio = ({
  profile: { profile, loading },
  handleChange,
  nextStep,
  prevStep,
  step,
  match,
  getCurrentProfile,
  uploader: { image },
  getImages,
  className,
  ...rest
}) => {
  useEffect(() => {
    getCurrentProfile();
    getImages();
  }, []);

  const continues = e => {
    e.preventDefault();
    nextStep();
  };

  const back = e => {
    e.preventDefault();
    prevStep();
  };

  const classes = useStyles();
  return (
    <Fragment>
      <Fragment>
        <Card className={clsx(classes.root, className)}>
          {profile ? (
            <form autoComplete='off' noValidate>
              <CardHeader title='Portfolio' />
              <CardContent className={classes.content}>
                <div>
                  <ImagesUploader />
                </div>
              </CardContent>
              <br />
              <br />
              <Divider />
            </form>
          ) : (
            <Progress />
          )}
        </Card>
      </Fragment>
      <Fragment>
        <div>
          <div>
            <Fragment>
              {match.url === "/create-profile" && (
                <FormBottomNav
                  step={step}
                  Children={
                    <div>
                      <div>
                        <Fragment>
                          <Fragment>
                            <Button onClick={back}>Back</Button>
                            <Fragment>
                              <Button
                                style={{ backgroundColor: "#f5f5" }}
                                disabled={
                                  profile &&
                                  !loading &&
                                  image &&
                                  image.length < 5 &&
                                  true
                                }
                                onClick={continues}
                              >
                                Next
                              </Button>
                            </Fragment>
                          </Fragment>
                        </Fragment>
                      </div>
                    </div>
                  }
                />
              )}
              {match.url === "/add-portfolio" && isMobile && (
                <FormBottomNav
                  step={step}
                  Children={
                    <div>
                      <div>
                        <Fragment>
                          <Fragment>
                            <Button component={Link} to='/settings'>
                              Back
                            </Button>
                          </Fragment>
                        </Fragment>
                      </div>
                    </div>
                  }
                />
              )}
            </Fragment>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
};

AddPortfolio.propTypes = {
  className: PropTypes.string,
  addPortfolio: PropTypes.func.isRequired,
  files: PropTypes.string,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  uploader: state.uploader
});

export default connect(
  mapStateToProps,
  { addPortfolio, getCurrentProfile, getImages }
)(withRouter(AddPortfolio));
