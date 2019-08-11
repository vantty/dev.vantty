import React, { useState, Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Actions
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../../actions/profile";

//Components
import Alert from "../../../components/Alert";
import SimpleAppBar from "../ComponentsForm/SimpleAppBar";

//Materila-UI
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Container,
  Box
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormBottomNav from "../ComponentsForm/FormBottomNav";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    profilePicture: "",
    bio: "",
    profession: "",
    location: "",
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
      mobileNumber: loading || !profile.social ? "" : profile.mobileNumber,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram
    });
  }, [loading, getCurrentProfile]);

  const { bio, location, instagramUsername } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <CssBaseline />
      <SimpleAppBar
        message={"1: This is your first step"}
        progress={1}
        // page={`/profile/artist/${profile.user._id}`}
      />
      <Alert />
      <Box pt={11} pb={8}>
        <Container maxWidth='sm'>
          <Typography component='h5' variant='h6' align='left'>
            Recuerda que tu perfil pasará por un proceso de revisión y se te
            notificará por correo electrónico cuando sea activado.
          </Typography>
          <form className='form' onSubmit={e => onSubmit(e)}>
            <Fragment>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Typography component='h5' variant='h6' align='left'>
                    I am ......
                  </Typography>
                  <FormGroup row align='right'>
                    <FormControlLabel
                      control={
                        <Checkbox
                          // checked={state.MakeUp}
                          // onChange={handleChange("checkedG")}
                          id='profession'
                          name='profession'
                          label='profession'
                          value={"Makeup Artist"}
                          onChange={e => onChange(e)}
                        />
                      }
                      label='Makeup Artist'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={e => onChange(e)}
                          id='profession'
                          name='profession'
                          label='profession'
                          value={"Hair Stylist"}
                        />
                      }
                      label='Hair Stylist'
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    id='bio'
                    name='bio'
                    label='bio'
                    fullWidth
                    multiline
                    rows='4'
                    value={bio}
                    autoComplete='fname'
                    onChange={e => onChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant='outlined'
                    id='location'
                    name='location'
                    label='location'
                    fullWidth
                    value={location}
                    autoComplete='fname'
                    onChange={e => onChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant='outlined'
                    id='instagramUsername'
                    name='instagramUsername'
                    label='instagramUsername'
                    fullWidth
                    value={instagramUsername}
                    autoComplete='fname'
                    onChange={e => onChange(e)}
                  />
                </Grid>
              </Grid>
            </Fragment>
            <FormBottomNav step={1} backPage={""} nextPage={""} />
          </form>
        </Container>
      </Box>
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
