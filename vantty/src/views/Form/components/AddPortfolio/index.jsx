import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//Actions
import { addPortfolio, getCurrentProfile } from "../../../../actions/profile";

//Components
import { FormBottomNav, ImagesUploader } from "../../../../components";

// Externals
import PropTypes from "prop-types";

//helpers
import { getInitials, getStrategyName } from "../../../../helpers";

//Icon
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternateOutlined";

// Material components

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  Avatar,
  Typography
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import LinkMui from "@material-ui/core/Link";
import Progress from "@material-ui/core/LinearProgress";
import AvatarUploader from "../../../../components/AvatarUploader";
import { positions } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  // content: {
  //   marginRight: theme.spacing(2),
  //   marginLeft: theme.spacing(2),
  //   padding: theme.spacing(2),
  //   [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
  //     marginRight: theme.spacing(10),
  //     marginLeft: theme.spacing(10),
  //     padding: theme.spacing(3)
  //   }
  // },
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
  // formData,
  handleChange,
  nextStep,
  prevStep,
  step,
  match,
  getCurrentProfile,
  className,
  ...rest
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

  // const rootClassName = classNames(classes.root, className);
  const classes = useStyles();
  return (
    <Fragment>
      <Fragment>
        <Card className={clsx(classes.root, className)}>
          {profile ? (
            <form autoComplete='off' noValidate>
              <CardHeader
                subheader='You decide how you want to be knowledges'
                title='Portfolio & ps Image'
              />
              <Divider />
              <CardContent className={classes.content}>
                <br />
                <Divider />
                <br />
                <div>
                  <ImagesUploader />
                </div>
              </CardContent>
              <Divider />
              <CardActions className={classes.buttons}>
                <Grid
                  container
                  direction='row'
                  justify='flex-end'
                  alignItems='flex-start'
                >
                  {match.url === "/dashboard" && (
                    <Button
                      style={{
                        backgroundColor: "#f5f5"
                      }}
                    >
                      Update
                    </Button>
                  )}
                </Grid>
              </CardActions>
            </form>
          ) : (
            <Progress />
          )}
        </Card>
      </Fragment>
      <Fragment>
        <div>
          {match.url !== "/dashboard" ? (
            <div>
              {profile && !loading && profile.portfolioPictures.length < 5 ? (
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
          ) : null}
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
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addPortfolio, getCurrentProfile }
)(withRouter(AddPortfolio));
