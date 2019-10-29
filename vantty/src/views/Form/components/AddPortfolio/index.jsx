import React, { Fragment, useEffect, useState } from "react";
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
import { Typography } from "@material-ui/core";

import { getImages, uploadTag } from "../../../../actions/uploader";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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
  uploader: { images },
  uploadTag,
  getImages,
  className,
  ...rest
}) => {
  useEffect(() => {
    getCurrentProfile();
    getImages();
    setTags({});
  }, []);
  const [tags, setTags] = useState({});
  const continues = async (e, id, tag) => {
    e.preventDefault();
    await uploadTag(tags);
    await nextStep();
  };
  const onChangeTags = (e, elastic, _id, checkpoint = true) =>
    checkpoint
      ? setTags({
          ...tags,
          [e.target.name]: {
            tag: e.target.value,
            _id: e.target.name,
            elastic: elastic
          }
        })
      : delete tags[_id];

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
            <form autoComplete="off" noValidate>
              <CardHeader title="Portfolio" />
              <CardContent className={classes.content}>
                <div>
                  <ImagesUploader tags={tags} onChangeTags={onChangeTags} />
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
                                  images && images.length < 5 && true

                                  // profile && !loading && images
                                  //   ? images.length >= 5
                                  //     ? Object.keys(tags).length ===
                                  //       images.length
                                  //       ? false
                                  //       : true
                                  //     : true
                                  //   : false

                                  // profile &&
                                  // !loading &&
                                  // images &&
                                  // (images.map(img => img.tag)).length &&
                                  // false

                                  // profile &&
                                  // !loading &&
                                  // images &&
                                  // images
                                  //   .map(img => img.tag)
                                  //   .splice(undefined) === images.length &&
                                  // false
                                  //     images.length &&
                                  // (images &&
                                  //   Object.keys(tags).length !==
                                  //     images.length &&
                                  //   false)
                                  // profile &&
                                  // !loading &&
                                  // images &&
                                  // images.length < 5 &&
                                  // true &&
                                  // profile &&
                                  // !loading &&
                                  // Object.keys(tags).length < 1 &&
                                  // true
                                }
                                onClick={continues}
                              >
                                {console.log("TAGS", Object.keys(tags))}
                                {console.log("IMA", images && images.length)}
                                {console.log(
                                  "MAP",
                                  images &&
                                    images
                                      .map(img => img.tag)
                                      .map(undef => undef)
                                )}
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
                            <Button component={Link} to="/settings">
                              Back
                            </Button>
                          </Fragment>
                        </Fragment>
                      </div>
                    </div>
                  }
                />
              )}

              {/* <FormBottomNav
                step={step}
                Children={
                  <div>
                    <div>
                      <Fragment>
                        <Fragment>
                          <Button onClick>UPDATE</Button>
                        </Fragment>
                      </Fragment>
                    </div>
                  </div>
                }
              /> */}
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
  { addPortfolio, getCurrentProfile, getImages, uploadTag }
)(withRouter(AddPortfolio));
