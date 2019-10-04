import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import validate from "validate.js";
import { isMobile, isTablet, isBrowser } from "react-device-detect";
import {
  getStrategy,
  getInitials,
  getStrategyName,
  fieldErrors
} from "../../../../helpers";
import EditForm from "../../../EditForm";

//Material Components
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Avatar,
  Paper,
  Typography
} from "@material-ui/core";

// Actions
import { updateInfo, loadUser } from "../../../../actions/auth";
import { getCurrentProfile, createProfile } from "../../../../actions/profile";
import { FormBottomNav, AvatarUploader } from "../../../../components";
import { schemaErrors } from "../../../../helpers/errorsData";
import Progress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    margin: "auto",
    height: 90,
    width: 90
  }
}));

const AccountDetails = ({
  auth: { user, loading },
  getCurrentProfile,
  updateInfo,
  uploading,
  createProfile,
  loadUser,
  profile: { profile },
  history,
  className,
  nextStep,
  prevStep,
  match,
  step,
  ...rest
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
    password: "",
    profilePicture: ""
  });

  //errors
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    getCurrentProfile();
    loadUser();

    const strategy = getStrategy(user);
    setFormData({
      firstName: loading || !strategy ? "" : strategy.firstName,
      lastName: loading || !strategy ? "" : strategy.lastName,
      email: loading || !strategy ? "" : strategy.email,
      profilePicture:
        loading || !strategy.profilePicture ? "" : strategy.profilePicture,
      id: loading || !user._id ? "" : user._id,
      password: loading || !user.password ? "" : user.password
    });
  }, [loading, getCurrentProfile, loadUser]);

  const { firstName, lastName, email, profilePicture, id } = formData;

  useEffect(() => {
    const errors = validate(formState.values, schemaErrors);
    setFormState(formState => ({
      ...formState,
      values: formData,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  //Errors
  const handleChange = async event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.name === "checkbox"
            ? event.target.checked
            : event.target.value
      },

      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const {
    isValid,
    values: {}
  } = formState;

  const onSubmit = async e => {
    e.preventDefault();
    await updateInfo(formData, history, true);
    profile &&
      (await createProfile(
        {
          name: {
            firstName: firstName,
            lastName: lastName
          }
        },
        history,
        true
      ));

    (await match.url) === "/create-profile" && nextStep();
  };
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

  //errors
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Fragment>
      <Card className={clsx(classes.root, className)}>
        <form autoComplete='off' noValidate>
          <CardHeader
            // subheader='The information can be edited'
            title='Profile'
          />
          {/* <Divider /> */}
          <CardContent>
            <Grid container spacing={3}>
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'
              >
                <Grid item>
                  <Grid item>
                    <div>
                      {uploading ? (
                        <Progress />
                      ) : profilePicture.original ? (
                        <Avatar
                          src={profilePicture.original}
                          className={classes.avatar}
                        />
                      ) : (
                        <Avatar className={classes.avatar}>
                          {getInitials(firstName)}
                        </Avatar>
                      )}
                      <br />
                      <Grid>
                        <AvatarUploader
                          profilePicture={profilePicture}
                          id={id}
                          onSubmit={onSubmit}
                        />
                      </Grid>
                    </div>

                    <br />
                  </Grid>
                </Grid>
              </Grid>
              <br />
              <Divider />
              <br />
              <Grid item md={6} xs={12}>
                {/* {fieldErrors()} */}
                <TextField
                  error={hasError("firstName")}
                  helperText={
                    hasError("firstName") ? formState.errors.firstName[0] : null
                  }
                  fullWidth
                  label='First name'
                  margin='dense'
                  name='firstName'
                  required
                  type='text'
                  variant='outlined'
                  id='firstName'
                  autoComplete='fname'
                  value={formState.values.firstName || firstName}
                  onChange={handleChange}
                />
              </Grid>
              {/* {console.log("STATE", formState)}
              {console.log("valid", formState.isValid)}
              {console.log("STATE", formState.values.firstName)}
              {console.log("DATA", firstName)} */}
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='Last name'
                  margin='dense'
                  name='lastName'
                  required
                  variant='outlined'
                  id='lastName'
                  error={hasError("lastName")}
                  helperText={
                    hasError("lastName") ? formState.errors.lastName[0] : null
                  }
                  // value={lastName}
                  value={formState.values.lastName || lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label='Email Address'
                  margin='dense'
                  name='email'
                  required
                  variant='outlined'
                  id='local.email'
                  autoComplete='email'
                  error={hasError("email")}
                  helperText={
                    hasError("email") ? formState.errors.email[0] : null
                  }
                  value={formState.values.email || email}
                  // value={email}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </CardContent>
          {match.url !== "/create-profile" && !isMobile && (
            <Fragment>
              <Divider />

              <CardActions>
                <Grid
                  container
                  direction='row'
                  justify='space-between'
                  alignItems='flex-start'
                >
                  <Grid>
                    {/* {!profile && !profile.mobileNumber && ( */}
                    {profile && profile.mobileNumber && (
                      <Button
                        component={Link}
                        size='small'
                        style={{
                          color: "rgb(0, 223, 212)"
                        }}
                        to={"/create-profile"}
                      >
                        Create Profile as Artist
                      </Button>
                    )}
                  </Grid>

                  <Grid>
                    <Button
                      onClick={e => onSubmit(e)}
                      style={{ backgroundColor: "#f5f5" }}
                      disabled={!formState.isValid}
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Fragment>
          )}

          <Divider />
          {match.url === "/create-profile" && (
            <FormBottomNav
              step={step}
              Children={
                <div>
                  <div>
                    <Fragment>
                      <Button component={Link} to={"/settings"}>
                        Back
                      </Button>
                      <Button
                        onClick={e => onSubmit(e)}
                        style={{ backgroundColor: "#f5f5" }}
                        disabled={!formState.isValid}
                      >
                        {match.url === "/personal-info" ? "Update" : "Next"}
                      </Button>
                    </Fragment>
                  </div>
                </div>
              }
            />
          )}
          {isMobile && (
            <FormBottomNav
              step={step}
              Children={
                <div>
                  <div>
                    <Fragment>
                      <Button component={Link} to={"/settings"}>
                        Back
                      </Button>
                      <Button
                        onClick={e => onSubmit(e)}
                        style={{ backgroundColor: "#f5f5" }}
                        disabled={!formState.isValid}
                      >
                        {match.url === "/personal-info" ? "Update" : "Next"}
                      </Button>
                    </Fragment>
                  </div>
                </div>
              }
            />
          )}
        </form>
      </Card>
      <br />
    </Fragment>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  updateInfo: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  uploading: state.uploader.uploading
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, updateInfo, createProfile, loadUser }
)(withRouter(AccountDetails));
