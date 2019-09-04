import React, { useState, Fragment, useEffect, useRef } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

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
  className
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

  const inputLabel = useRef("");
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.labelWidth);
  }, []);

  return (
    <Fragment>
      <EditForm
        Children={
          <Fragment>
            <Fragment>
              <Card className={clsx(classes.root, className)}>
                <form autoComplete='off' noValidate>
                  <CardHeader
                    subheader='The information can be edited'
                    title='Profile'
                  />
                  <Divider />
                  <CardContent>
                    {/* <form autoComplete='off' noValidate> */}
                    <Grid container>
                      <Grid item md={12} xs={12}>
                        <FormControl
                          variant='outlined'
                          margin='dense'
                          fullWidth
                        >
                          <InputLabel
                            ref={inputLabel}
                            htmlFor='filled-age-simple'
                          >
                            Profesion
                          </InputLabel>
                          <Select
                            select
                            value={profession}
                            onChange={e => onChange(e)}
                            id='profession'
                            name='profession'
                            label='profession'
                            input={
                              <OutlinedInput
                                labelWidth={labelWidth}
                                name='Profession'
                                id='outlined-age-simple'
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
                            Obviously, we know you are an artist
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
                            value={bio}
                            multiline
                            rows='4'
                            fullWidth
                            onChange={e => onChange(e)}
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
                          <InputLabel htmlFor='filled-city-simple'>
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
                                name='City'
                                id='outlined-city-simple'
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
                            required
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
                    <div>
                      <div>
                        <LinkMui component={Link} to='/'>
                          learn how to build the best profile
                        </LinkMui>
                      </div>
                    </div>
                  </CardActions>
                  {/* </Grid> */}
                </form>
              </Card>
              <FormBottomNav
                step={"1"}
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
                        Next
                      </Button>
                    </div>
                  </div>
                }
              />
            </Fragment>

            <Fragment>
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
