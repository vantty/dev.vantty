import React, { useState, Fragment, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

// Actions
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../../../actions/profile";

//Components
import FormBottomNav from "../../../../components/ComponentsForm/FormBottomNav";

//Materila-UI
import Typography from "@material-ui/core/Typography";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button
} from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import Style from "../../style";
import EditForm from "..";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const classes = Style();
  const [formData, setFormData] = useState({
    profilePicture: "",
    bio: "",
    profession: "",
    city: "",
    mobileNumber: "",
    instagramUsername: "",
    youtube: "",
    instagram: ""
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      bio: loading || !profile.bio ? "" : profile.bio,
      profilePicture:
        loading || !profile.profilePicture ? "" : profile.profilePicture,
      profession: loading || !profile.profession ? "" : profile.profession,
      location: loading || !profile.location ? "" : profile.location,
      instagramUsername:
        loading || !profile.instagramUsername ? "" : profile.instagramUsername,
      mobileNumber:
        loading || !profile.mobileNumber ? "" : profile.mobileNumber,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
      city: loading || !profile.location ? "" : profile.location.city
    });
  }, [loading, getCurrentProfile]);

  const { bio, instagramUsername, profession, city } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <EditForm
        Children={
          <Fragment>
            <Fragment>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Typography component='h1' variant='h4' align='center'>
                    I am ......
                  </Typography>
                </Grid>
              </Grid>
            </Fragment>
            <br />

            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
            >
              <Grid
                item
                xs={12}
                sm={12}
                container
                direction='row'
                justify='center'
                alignItems='center'
              >
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='age-helper'>Profesion</InputLabel>
                  <Select
                    value={profession}
                    onChange={e => onChange(e)}
                    id='profession'
                    name='profession'
                    label='profession'
                  >
                    <MenuItem value={"Makeup Artists"}>Makeup Artists</MenuItem>
                    <MenuItem value={"Makeup Artist & Hair"}>
                      Makeup Artist & Hair
                    </MenuItem>
                    <MenuItem value={"Hair Stylist"}>Hair Stylist</MenuItem>
                  </Select>
                  <FormHelperText>
                    Obviously, we know you are an artist
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid container>
                <Grid item xs={12} sm={6} md={12}>
                  <Typography
                    component='h1'
                    variant='h5'
                    className={classes.typography}
                  >
                    Recogniced by
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    variant='outlined'
                    id='bio'
                    name='bio'
                    label='bio'
                    margin='normal'
                    value={bio}
                    multiline
                    rows='4'
                    fullWidth
                    onChange={e => onChange(e)}
                  />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={12} sm={6} md={6}>
                  <Grid item xs={12} sm={6} md={6}>
                    <Typography
                      component='h1'
                      variant='h5'
                      className={classes.typography}
                    >
                      Living in
                    </Typography>
                  </Grid>

                  <Grid>
                    <FormControl className={classes.textField}>
                      <InputLabel>City</InputLabel>
                      <Select
                        required
                        id='city'
                        name='city'
                        value={city}
                        autoComplete='fname'
                        fullWidth
                        onChange={e => onChange(e)}
                      >
                        <MenuItem value={"Toronto - Canadá"}>
                          Toronto - Canadá
                        </MenuItem>
                        <MenuItem value={"Medellín - Colombia"}>
                          Medellín - Colombia
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography
                      component='h1'
                      variant='h5'
                      className={classes.typography}
                    >
                      Uses Instagram as
                    </Typography>
                  </Grid>

                  <Grid>
                    <TextField
                      id='instagramUsername'
                      name='instagramUsername'
                      label={`@Username`}
                      className={classes.textField}
                      value={instagramUsername}
                      onChange={e => onChange(e)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <FormBottomNav
              Children={
                <div>
                  <div>
                    <Button component={Link} to='/dashboard'>
                      Back
                    </Button>
                    <Button
                      style={{ backgroundColor: "#f5f5" }}
                      onClick={e => onSubmit(e)}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              }
            />
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
