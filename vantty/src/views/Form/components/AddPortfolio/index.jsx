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

const useStyles = makeStyles(theme => ({
  root: {},

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
  }
}));

const AddPortfolio = ({
  profile: { profile, loading },
  formData,
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
                <div>
                  <div>
                    <Typography gutterBottom variant='h2'>
                      {getStrategyName(profile.user)}
                    </Typography>
                    <Typography
                      className={classes.locationText}
                      color='textSecondary'
                      variant='body1'
                    >
                      Toronto
                    </Typography>
                    <Typography
                      className={classes.dateText}
                      color='textSecondary'
                      variant='body1'
                    >
                      {/* {moment().format("hh:mm A")} */}
                      {/* ({user.timezone}) */}
                    </Typography>
                  </div>
                </div>

                <div>
                  <Grid container justify='center' alignItems='center'>
                    {!loading && profile.profilePicture ? (
                      <AvatarUploader />
                    ) : (
                      <Avatar className={classes.bigAvatar}>
                        {getInitials(getStrategyName(profile.user))}
                      </Avatar>
                    )}
                  </Grid>
                </div>

                <div>
                  <ImagesUploader />
                </div>
              </CardContent>
              <Divider />
              <CardActions>
                <LinkMui component={Link} to='/'>
                  learn how to build the best profile
                </LinkMui>
              </CardActions>
            </form>
          ) : (
            <Progress />
          )}
        </Card>
      </Fragment>
      <Fragment>
        <div>
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
