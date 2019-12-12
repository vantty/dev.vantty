import React, { useState, useEffect, Fragment, useRef } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import validate from "validate.js";
import { isMobile } from "react-device-detect";
import { getStrategy } from "../../../../helpers";

//Material-UI
import { makeStyles } from "@material-ui/styles";
import {
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem
} from "@material-ui/core";

// Actions
import { updateInfo, loadUser } from "../../../../actions/auth";
import { getCurrentProfile, createProfile } from "../../../../actions/profile";
import { AvatarUploader, Profile, InfoUser } from "./components";
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
  history,
  className,
  nextStep,
  prevStep,
  match,
  step,
  formData,
  formState,
  onSubmit,
  handleChange,
  hasError,
  onChange,
  ...rest
}) => {
  const classes = useStyles();

  const { firstName, lastName } = formData;
  // const [formDataProfile, setFormDataProfile] = useState({
  //   profilePicture: "",
  //   bio: "",
  //   profession: "",
  //   city: "",
  //   mobileNumber: "",
  //   instagramUsername: "",
  //   youtube: "",
  //   instagram: "",
  //   user: "",
  //   price: ""
  // });

  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   id: "",
  //   password: "",
  //   profilePicture: ""
  // });

  // //errors
  // const [formState, setFormState] = useState({
  //   isValid: false,
  //   values: {},
  //   touched: {},
  //   errors: {}
  // });

  // const [formStateProfile, setFormStateProfile] = useState({
  //   isValid: false,
  //   values: {},
  //   touched: {},
  //   errors: {}
  // });

  // useEffect(() => {
  //   getCurrentProfile();
  //   // loadUser();
  //   const strategy = getStrategy(user);
  //   setFormData({
  //     firstName: auth.loading || !strategy ? "" : strategy.firstName,
  //     lastName: auth.loading || !strategy ? "" : strategy.lastName,
  //     email: auth.loading || !strategy ? "" : strategy.email,
  //     profilePicture:
  //       auth.loading || !strategy.profilePicture ? "" : strategy.profilePicture,
  //     id: auth.loading || !user._id ? "" : user._id,
  //     password: auth.loading || !user.password ? "" : user.password
  //   });

  // user &&
  //   user.profile &&
  //   setFormDataProfile({
  //     bio: loading || !profile.bio ? "" : profile.bio,
  //     profilePicture:
  //       loading || !profile.profilePicture ? "" : profile.profilePicture,
  //     profession: loading || !profile.profession ? "" : profile.profession,
  //     instagramUsername:
  //       loading || !profile.instagramUsername
  //         ? ""
  //         : profile.instagramUsername,
  //     mobileNumber:
  //       loading || !profile.mobileNumber ? "" : profile.mobileNumber,
  //     youtube: loading || !profile.social ? "" : profile.social.youtube,
  //     instagram: loading || !profile.social ? "" : profile.social.instagram,
  //     city: loading || !profile.city ? "" : profile.city,
  //     price: loading || !profile.price ? "" : profile.price
  //   });
  // }, [auth.loading, loading, getCurrentProfile, loadUser]);

  // const { firstName, lastName } = formData;

  // const onChange = e =>
  //   // setFormDataProfile({ ...formDataProfile, [e.target.name]: e.target.value });

  //   useEffect(() => {
  //     const errors = validate(formState.values, schemaErrors);
  //     setFormState(formState => ({
  //       ...formState,
  //       values: formData,
  //       isValid: errors ? false : true,
  //       errors: errors || {}
  //     }));
  //   }, [formState.values]);

  ///Profile Errors
  // useEffect(() => {
  //   const errors = validate(formStateProfile.values, schemaErrorsCreateProfile);
  //   setFormStateProfile(formStateProfile => ({
  //     ...formStateProfile,
  //     values: formDataProfile,
  //     isValid: errors ? false : true,
  //     errors: errors || {}
  //   }));
  // }, [formStateProfile.values]);

  // const handleChangeProfile = async event => {
  //   event.persist();

  //   setFormStateProfile(formStateProfile => ({
  //     ...formStateProfile,
  //     values: {
  //       ...formStateProfile.values,
  //       [event.target.name]:
  //         event.target.type === "checkbox"
  //           ? event.target.checked
  //           : event.target.value
  //     },

  //     touched: {
  //       ...formStateProfile.touched,
  //       [event.target.name]: true
  //     }
  //   }));
  //   onChange(event);
  // };

  // const hasErrorProfile = field =>
  //   formStateProfile.touched[field] && formStateProfile.errors[field]
  //     ? true
  //     : false;

  // const onSubmitProfile = e => {
  //   e.preventDefault();
  //   createProfile(formDataProfile, history, true);
  // };

  // //User Errors
  // const handleChange = async event => {
  //   event.persist();

  //   setFormState(formState => ({
  //     ...formState,
  //     values: {
  //       ...formState.values,
  //       [event.target.name]:
  //         event.target.name === "checkbox"
  //           ? event.target.checked
  //           : event.target.value
  //     },

  //     touched: {
  //       ...formState.touched,
  //       [event.target.name]: true
  //     }
  //   }));
  //   setFormData({ ...formData, [event.target.name]: event.target.value });
  // };

  // const onSubmit = async e => {
  //   e.preventDefault();

  //   await updateInfo(formData, true);
  //   await onSubmitProfile(e);
  //   profile &&
  //     (await createProfile(
  //       {
  //         name: {
  //           firstName: firstName,
  //           lastName: lastName
  //         }
  //       },
  //       history,
  //       true
  //     ));

  //   (await match.url) === "/create-profile" && nextStep();
  // };
  // useEffect(() => {
  //   getCurrentProfile();
  // }, []);

  // const continues = e => {
  //   e.preventDefault();
  //   nextStep();
  // };

  // const back = e => {
  //   e.preventDefault();
  //   prevStep();
  // };

  //errors
  // const hasError = field =>
  //   formState.touched[field] && formState.errors[field] ? true : false;

  const inputLabel = useRef("");
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.labelWidth);
  }, []);
  return (
    <Fragment>
      <CustomPaper
        Children={
          // <Fragment>
          //   <Fragment>
          //     <InfoUser
          //       formData={formData}
          //       formState={formState}
          //       handleChange={handleChange}
          //       hasError={hasError}
          //     />
          //   </Fragment>
          //   <Fragment>
          //     <Profile
          //     formData={formDataProfile}
          //     onChange={onChange}
          //     onSubmit={onSubmitProfile}
          //     match={match}
          //     formState={formStateProfile}
          //     setFormState={setFormStateProfile}
          //     handleChange={handleChangeProfile}
          //     hasError={hasErrorProfile}
          //     />
          //   </Fragment>
          // </Fragment>

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
                        <AvatarUploader formData={formData} />
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
              <Grid container>
                <Grid item md={12} xs={12}>
                  <FormControl variant='outlined' margin='dense' fullWidth>
                    <InputLabel ref={inputLabel} htmlFor='profession'>
                      Profesion
                    </InputLabel>
                    <Select
                      select
                      error={hasError("profession")}
                      value={
                        formState.values.profession || formData.profession || ""
                      }
                      onChange={handleChange}
                      id='profession'
                      name='profession'
                      label='profession'
                      input={
                        <OutlinedInput
                          labelWidth={labelWidth}
                          name='profession'
                          id='profession'
                        />
                      }
                    >
                      <MenuItem value={"Makeup Artists"}>
                        Makeup Artists
                      </MenuItem>
                      <MenuItem value={"Makeup Artist & Hair"}>
                        Makeup Artist & Hair
                      </MenuItem>
                      <MenuItem value={"Hair Stylist"}>Hair Stylist</MenuItem>
                    </Select>
                    {/* <FormHelperText>Tell us your profession</FormHelperText> */}
                  </FormControl>
                </Grid>
                <br /> <br />
                <Grid item md={12} xs={12}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      variant='outlined'
                      id='bio'
                      name='bio'
                      label='bio'
                      margin='normal'
                      onChange={handleChange}
                      multiline
                      rows='6'
                      fullWidth
                      value={formState.values.bio || formData.bio}
                      error={hasError("bio")}
                      helperText={
                        hasError("bio") ? formState.errors.bio[0] : null
                      }
                    />
                  </Grid>
                </Grid>
                <Grid item md={12} xs={12}>
                  {/* <div className={classes.field}> */}
                  <FormControl variant='outlined' margin='dense' fullWidth>
                    <InputLabel ref={inputLabel} htmlFor='city'>
                      City
                    </InputLabel>
                    <Select
                      select
                      id='city'
                      name='city'
                      value={formData.city}
                      label='city'
                      onChange={e => onChange(e)}
                      input={
                        <OutlinedInput
                          labelWidth={labelWidth}
                          name='city'
                          id='city'
                        />
                      }
                    >
                      <MenuItem value={"Toronto - Canadá"}>
                        Toronto - Canadá
                      </MenuItem>
                      {/* <MenuItem value={"Medellín - Colombia"}>
                      Medellín - Colombia
                    </MenuItem> */}
                    </Select>
                  </FormControl>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      margin='dense'
                      variant='outlined'
                      id='instagramUsername'
                      name='instagramUsername'
                      label={`@Username`}
                      value={formData.instagramUsername}
                      onChange={e => onChange(e)}
                    />
                    {/* </div> */}
                  </Grid>
                </Grid>
                {/* </form> */}
              </Grid>
            </Grid>
          </form>
        }
      />

      <br />
    </Fragment>
  );
};

export default AccountDetails;
