import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

//Actions
import { getCurrentProfile } from "../../../../actions/profile";

//Components
import { ImagesUploader } from "./components";
import { FormBottomNav, CustomPaper } from "../ComponentsForm";

// Material-UI
import {
  Divider,
  Button,
  CardActions,
  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Progress from "@material-ui/core/LinearProgress";

import { getImages, uploadTag } from "../../../../actions/uploader";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    float: "right",
    color: "white",
    boxShadow: "none",
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.greenVantty.light
    }
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
  console.log("TAGs", tags);
  const submit = async (e, id, tag) => {
    e.preventDefault();
    await uploadTag(tags);
  };
  const classes = useStyles();

  const desable = () => {
    if (
      images &&
      images.length >= 5 &&
      tags &&
      Object.keys(tags).length === images.length
    ) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <CustomPaper
      Children={
        <Fragment>
          <Typography>Portfolio</Typography>
          <Fragment>
            {profile ? (
              <form autoComplete='off' noValidate>
                <div>
                  <ImagesUploader tags={tags} onChangeTags={onChangeTags} />
                </div>
                <br />
                <br />
                <Divider />
              </form>
            ) : (
              <Progress />
            )}

            {match.url === "/add-portfolio" && !isMobile && (
              <Fragment>
                <Divider />

                <CardActions>
                  <Grid
                    container
                    direction='row'
                    justify='flex-end'
                    alignItems='flex-start'
                  >
                    <Button className={classes.button} onClick={e => submit(e)}>
                      Update
                    </Button>
                  </Grid>
                </CardActions>
              </Fragment>
            )}
            {/* </Card> */}
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
                                    className={classes.button}
                                    disabled={desable()}
                                    // disabled={
                                    //   images && images.length < 5 && true
                                    // }
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
                                <Button component={Link} to='/settings/profile'>
                                  Back
                                </Button>
                                <Button
                                  className={classes.button}
                                  onClick={e => submit(e)}
                                >
                                  Update
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
      }
    />
  );
};

AddPortfolio.propTypes = {
  className: PropTypes.string,
  files: PropTypes.string,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  uploader: state.uploader
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getImages,
  uploadTag
})(withRouter(AddPortfolio));
