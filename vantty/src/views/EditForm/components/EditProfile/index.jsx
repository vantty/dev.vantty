import React, { useState, Fragment, useEffect, useRef } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

//External
import validate from "validate.js";

// Actions
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../../../actions/profile";

//Components
import FormBottomNav from "../../../../components/ComponentsForm/FormBottomNav";

//Materila-UI
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import LinkMui from "@material-ui/core/Link";
import EditForm from "../../../EditForm";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  OutlinedInput,
  CardActions,
  Divider,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid
} from "@material-ui/core";
import { schemaErrorsCreateProfile } from "../../../../helpers/errorsData";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles(() => ({
  root: {},
  buttons: {
    textAlign: "right"
  }
}));

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
  className,
  match
}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    profilePicture: "",
    bio: "",
    profession: "",
    city: "",
    mobileNumber: "",
    instagramUsername: "",
    youtube: "",
    instagram: "",
    user: "",
    price: ""
  });
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schemaErrorsCreateProfile);
    setFormState(formState => ({
      ...formState,
      values: formData,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      bio: loading || !profile.bio ? "" : profile.bio,
      profilePicture:
        loading || !profile.profilePicture ? "" : profile.profilePicture,
      profession: loading || !profile.profession ? "" : profile.profession,
      instagramUsername:
        loading || !profile.instagramUsername ? "" : profile.instagramUsername,
      mobileNumber:
        loading || !profile.mobileNumber ? "" : profile.mobileNumber,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
      city: loading || !profile.city ? "" : profile.city,
      price: loading || !profile.price ? "" : profile.price
    });
  }, [loading, getCurrentProfile]);

  const { bio, instagramUsername, profession, city } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleChange = async event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
      },

      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
    onChange(event);
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  const inputLabel = useRef("");
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.labelWidth);
  }, []);

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Fragment>
      <EditForm
        Children={
          <Fragment>
            <Fragment>
              <Card className={clsx(classes.root, className)}>
                <form autoComplete='off' noValidate>
                  <CardHeader
                    // subheader='The information can be edited'
                    title='Bio'
                  />
                  {/* <Divider /> */}
                  <CardContent>
                    {/* <form autoComplete='off' noValidate> */}
                    <Grid container>
                      <Grid item md={12} xs={12}>
                        <FormControl
                          variant='outlined'
                          margin='dense'
                          fullWidth
                        >
                          <InputLabel ref={inputLabel} htmlFor='profession'>
                            Profesion
                          </InputLabel>
                          <Select
                            select
                            error={hasError("profession")}
                            value={
                              formState.values.profession ||
                              formData.profession ||
                              ""
                            }
                            onChange={handleChange}
                            id='profession'
                            name='profession'
                            label='profession'
                            input={
                              <OutlinedInput
                                labelWidth={labelWidth}
                                name='Profession'
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
                            <MenuItem value={"Hair Stylist"}>
                              Hair Stylist
                            </MenuItem>
                          </Select>
                          <FormHelperText>
                            Give us your profession
                          </FormHelperText>
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
                            value={formState.values.bio || formData.bio || ""}
                            error={hasError("bio")}
                            helperText={
                              hasError("bio") ? formState.errors.bio[0] : null
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        {/* <div className={classes.field}> */}
                        <FormControl
                          variant='outlined'
                          margin='dense'
                          fullWidth
                        >
                          <InputLabel ref={inputLabel} htmlFor='city'>
                            City
                          </InputLabel>
                          <Select
                            select
                            id='city'
                            name='city'
                            value={city}
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
                            <MenuItem value={"Medellín - Colombia"}>
                              Medellín - Colombia
                            </MenuItem>
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
                            value={instagramUsername}
                            onChange={e => onChange(e)}
                          />
                          {/* </div> */}
                        </Grid>
                      </Grid>
                      {/* </form> */}
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions className={classes.buttons}>
                    <Grid
                      container
                      direction='row'
                      justify='flex-end'
                      alignItems='flex-start'
                    >
                      {match.url === "/edit-profile" && !isMobile && (
                        <Button
                          onClick={e => onSubmit(e)}
                          style={{
                            backgroundColor: "#f5f5"
                          }}
                          disabled={!formState.isValid}
                        >
                          Update
                        </Button>
                      )}
                    </Grid>
                  </CardActions>
                  {/* </Grid> */}
                </form>
              </Card>
              {isMobile && match.url === "/edit-profile" && (
                <FormBottomNav
                  // step={"1"}
                  Children={
                    <div>
                      <div>
                        <Button component={Link} to='/settings'>
                          Back
                        </Button>
                        <Button
                          style={{ backgroundColor: "#f5f5" }}
                          onClick={e => onSubmit(e)}
                          disabled={!formState.isValid}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  }
                />
              )}
            </Fragment>
          </Fragment>
        }
      />
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
