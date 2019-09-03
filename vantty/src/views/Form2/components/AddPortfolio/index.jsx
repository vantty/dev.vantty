import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//Actions
import { addPortfolio, getCurrentProfile } from "../../../../actions/profile";

//Components

import { ImagesUploader } from "../../../../components";

// Externals
import PropTypes from "prop-types";

// Material helpers

//Icon
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternateOutlined";

// Material components
import {} from "@material-ui/core";
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

const useStyles = makeStyles(() => ({
  root: {},
  buttons: {
    textAlign: "right"
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
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete='off' noValidate>
        <CardHeader subheader='The information can be edited' title='Profile' />
        <Divider />
        <CardContent>
          {/* <div>
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
            </div>
          </div> */}
          <ImagesUploader />
        </CardContent>
        <Divider />
        <CardActions>
          <div>
            <div>
              {!loading && profile.portfolioPictures.length < 5 ? (
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
              ) : (
                <div className={classes.buttons}>
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
              )}
            </div>
          </div>
        </CardActions>
      </form>
    </Card>
  );
};

AddPortfolio.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
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
