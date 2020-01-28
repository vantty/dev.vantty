import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { isMobile } from "react-device-detect";

//Material-UI
import { makeStyles } from "@material-ui/styles";
import {
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography
} from "@material-ui/core";

// Actions
import { updateInfo } from "../../../../actions/auth";
import { update } from "../../../../actions/profile";
import { AvatarUploader, Profile } from "./components";
import { FormBottomNav, CustomPaper } from "../ComponentsForm";

// Helpers
import {
  schemaErrors,
  schemaErrorsCreateProfile
} from "../../../../helpers/errorsData";

const useStyles = makeStyles(theme => ({
  root: {},
  button: {
    float: "right",
    color: "white",
    boxShadow: "none",
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.greenVantty.light
    }
  },
  layout: {
    width: "auto",
    padding: theme.spacing(),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      padding: theme.spacing(3),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      borderStyle: "solid",
      borderWidth: "0.1px",
      borderColor: "grey"
    }
  }
}));

const AccountDetails = ({
  auth: { user },
  auth,
  updateInfo,
  uploading,
  update,
  profile: { profile, loading },
  history,
  className,
  nextStep,
  prevStep,
  match,
  step,
  ...rest
}) => {
  const classes = useStyles();

  const [formDataProfile, setFormDataProfile] = useState({
    bio: "",
    profession: "",
    city: "",
    instagramUsername: ""
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: ""
  });

  //errors
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [formStateProfile, setFormStateProfile] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    setFormData({
      firstName: auth.loading || !user ? "" : user.firstName,
      lastName: auth.loading || !user ? "" : user.lastName,
      email: auth.loading || !user ? "" : user.email,
      profilePicture:
        auth.loading || !user.profilePicture ? "" : user.profilePicture,
      id: auth.loading || !user._id ? "" : user._id,
      password: auth.loading || !user.password ? "" : user.password
    });

    user &&
      user.profile &&
      setFormDataProfile({
        bio: loading || !profile.bio ? "" : profile.bio,
        profession: loading || !profile.profession ? "" : profile.profession,
        instagramUsername:
          loading || !profile.instagramUsername
            ? ""
            : profile.instagramUsername,
        city: loading || !profile.city ? "" : profile.city
      });
  }, [auth.loading, loading]);

  const { firstName, lastName } = formData;

  const onChange = e =>
    setFormDataProfile({ ...formDataProfile, [e.target.name]: e.target.value });

  useEffect(() => {
    const errors = validate(formState.values, schemaErrors);
    setFormState(formState => ({
      ...formState,
      values: formData,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  ///Profile Errors
  useEffect(() => {
    const errors = validate(formStateProfile.values, schemaErrorsCreateProfile);
    setFormStateProfile(formStateProfile => ({
      ...formStateProfile,
      values: formDataProfile,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formStateProfile.values]);

  const handleChangeProfile = async event => {
    event.persist();

    setFormStateProfile(formStateProfile => ({
      ...formStateProfile,
      values: {
        ...formStateProfile.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
      },

      touched: {
        ...formStateProfile.touched,
        [event.target.name]: true
      }
    }));
    onChange(event);
  };

  const hasErrorProfile = field =>
    formStateProfile.touched[field] && formStateProfile.errors[field]
      ? true
      : false;

  const onSubmitProfile = e => {
    e.preventDefault();
    update(formDataProfile, history, true);
  };

  //User Errors
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

  const onSubmit = async e => {
    e.preventDefault();

    await updateInfo(formData, true);
    user.profile && (await onSubmitProfile(e));
    user.profile &&
      (await update(
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

  //errors
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  return (
    <Fragment>
      <CustomPaper
        Children={
          <form autoComplete='off' noValidate>
            <Typography>Profile</Typography>
            <Grid container spacing={1}>
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'
              >
                <Grid item>
                  <Grid item>
                    <div>
                      <Grid>
                        <AvatarUploader />
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
                  value={formState.values.lastName || lastName}
                  onChange={handleChange}
                />
              </Grid>
              {/* <Grid item md={12} xs={12}>
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
                  onChange={handleChange}
                />
              </Grid> */}
            </Grid>
            {/* </CardContent> */}

            {user && user.profile && (
              <Profile
                formData={formDataProfile}
                onChange={onChange}
                onSubmit={onSubmitProfile}
                match={match}
                formState={formStateProfile}
                setFormState={setFormStateProfile}
                handleChange={handleChangeProfile}
                hasError={hasErrorProfile}
              />
            )}

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
                      {user && !user.profile && (
                        <Button
                          component={Link}
                          size='small'
                          className={classes.button}
                          to={"/create-profile"}
                        >
                          Create Profile as Artist
                        </Button>
                      )}
                    </Grid>

                    <Grid>
                      <Button
                        onClick={e => onSubmit(e)}
                        className={classes.button}
                        disabled={!formState.isValid}
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Fragment>
            )}

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
                          className={classes.button}
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
                        <Button
                          component={Link}
                          to={
                            user && user.profile
                              ? "/settings/profile"
                              : "/settings"
                          }
                        >
                          Back
                        </Button>
                        <Button
                          onClick={e => onSubmit(e)}
                          className={classes.button}
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
        }
      />
      {/* </Card> */}

      <br />
    </Fragment>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  updateInfo: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  uploading: state.uploader.uploading
});

export default connect(mapStateToProps, {
  updateInfo,
  update
})(withRouter(AccountDetails));
