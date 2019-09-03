import React, { Fragment, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Actions
import { addPortfolio, getCurrentProfile } from "../../../../actions/profile";

//Components
import FormBottomNav from "../../../../components/ComponentsForm/FormBottomNav";
import ImagesUploader from "../../../../components/ImagesUploader";

//Materila-UI
import Typography from "@material-ui/core/Typography";
import { Avatar, Grid, Button } from "@material-ui/core";
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternateOutlined";

//Style
import Style from "../../style";

const AddPortfolio = ({
  profile: { profile, loading },
  formData,
  handleChange,
  nextStep,
  prevStep,
  step,
  match,
  getCurrentProfile
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  const continues = e => {
    e.preventDefault();
    nextStep();
  };

  const back = e => {
    e.preventDefault();
    prevStep();
  };
  const classes = Style();
  return (
    <Fragment>
      <Fragment>
        {/* {profile && ( */}
        <Fragment>
          <div>
            <div>
              {match.url === "/add-portfolio" && (
                <Typography component='h1' variant='h4' align='center'>
                  Portfolio
                </Typography>
              )}
              <Grid container justify='center' alignItems='center'>
                {!loading && profile.profilePicture ? (
                  <Avatar className={classes.bigAvatar}>
                    <AddPhotoIcon style={{ fontSize: "48px" }} />
                  </Avatar>
                ) : (
                  <Avatar className={classes.bigAvatar}>
                    <AddPhotoIcon />
                  </Avatar>
                )}
              </Grid>
              <Typography component='h5' variant='h6' align='center'>
                Profile Image
              </Typography>
            </div>
          </div>

          <div>
            <div>
              <ImagesUploader />
              {!loading && profile.portfolioPictures.length < 5 ? (
                <FormBottomNav
                  step={step}
                  Children={
                    <div>
                      <div>
                        {match.url === "/add-portfolio" ? (
                          <Fragment>
                            <Button component={Link} to='/dashboard'>
                              Back
                            </Button>
                            <Button
                              component={Link}
                              to='/dashboard'
                              style={{ backgroundColor: "#f5f5" }}
                              disabled={true}
                            >
                              Update1
                            </Button>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <Button onClick={back}>Back</Button>
                            <Button
                              style={{ backgroundColor: "#f5f5" }}
                              disabled={true}
                            >
                              Next
                            </Button>
                          </Fragment>
                        )}
                      </div>
                    </div>
                  }
                />
              ) : (
                <FormBottomNav
                  step={step}
                  Children={
                    <div>
                      <div>
                        {match.url === "/add-portfolio" ? (
                          <Fragment>
                            <Button component={Link} to='/dashboard'>
                              Back
                            </Button>
                            <Button
                              component={Link}
                              to='/dashboard'
                              style={{ backgroundColor: "#f5f5" }}
                            >
                              Update
                            </Button>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <Button onClick={back}>Back</Button>
                            <Button
                              style={{ backgroundColor: "#f5f5" }}
                              onClick={continues}
                            >
                              Next
                            </Button>
                          </Fragment>
                        )}
                      </div>
                    </div>
                  }
                />
              )}
            </div>
          </div>
        </Fragment>
        {/* )} */}
      </Fragment>
    </Fragment>
  );
};

AddPortfolio.propTypes = {
  addPortfolio: PropTypes.func.isRequired,
  files: PropTypes.string,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});

// export default withStyles(StylePortfolio)(
//   connect(
//     mapStateToProps,
//     { addPortfolio, getCurrentProfile }
//   )(withRouter(AddPortfolio))
// );

export default connect(
  mapStateToProps,
  { addPortfolio, getCurrentProfile }
)(withRouter(AddPortfolio));
