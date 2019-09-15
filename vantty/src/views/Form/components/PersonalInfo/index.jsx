import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";

import { getStrategy, getInitials, getStrategyName } from "../../../../helpers";
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
  Avatar
} from "@material-ui/core";

// Actions
import { updateInfo, loadUser } from "../../../../actions/auth";
import { getCurrentProfile, createProfile } from "../../../../actions/profile";
import { FormBottomNav, AvatarUploader } from "../../../../components";

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
  handleChange,
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
    profilePicture: {}
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

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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

    (await match.url) !== "/personal-info" && nextStep();
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

  const states = [
    {
      value: "alabama",
      label: "Alabama"
    },
    {
      value: "new-york",
      label: "New York"
    },
    {
      value: "san-francisco",
      label: "San Francisco"
    }
  ];

  return (
    <Fragment>
      <Card className={clsx(classes.root, className)}>
        <form autoComplete='off' noValidate>
          <CardHeader
            subheader='The information can be edited'
            title='Profile'
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Grid
                  container
                  direction='row'
                  justify='center'
                  alignItems='center'
                >
                  <Grid item>
                    <Grid item>
                      <div>
                        {profilePicture.original ? (
                          <Avatar
                            src={profilePicture.original}
                            className={classes.avatar}
                          />
                        ) : (
                          <Avatar className={classes.avatar}>
                            {getInitials(firstName)}
                          </Avatar>
                        )}
                      </div>
                      <br />
                      <Grid>
                        <AvatarUploader
                          profilePicture={profilePicture}
                          id={id}
                          onSubmit={onSubmit}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <br />
                <Divider />
                <br />

                <TextField
                  fullWidth
                  helperText='Please specify the first name'
                  label='First name'
                  margin='dense'
                  name='firstName'
                  required
                  variant='outlined'
                  id='firstName'
                  autoComplete='fname'
                  value={firstName}
                  onChange={e => onChange(e)}
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
                  value={lastName}
                  id='lastName'
                  onChange={e => onChange(e)}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='Email Address'
                  margin='dense'
                  name='email'
                  required
                  variant='outlined'
                  id='local.email'
                  autoComplete='email'
                  value={email}
                  onChange={e => onChange(e)}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          {/* <Fragment>
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
          </Fragment> */}
          <FormBottomNav
            step={step}
            Children={
              <div>
                <div>
                  {match.url === "/personal-info" ? (
                    <Fragment>
                      <Button component={Link} to='/dashboard'>
                        Back
                      </Button>
                      <Button
                        onClick={e => onSubmit(e)}
                        style={{ backgroundColor: "#f5f5" }}
                      >
                        Update
                      </Button>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Button component={Link} to='/dashboard'>
                        Back
                      </Button>
                      <Button
                        style={{ backgroundColor: "#f5f5" }}
                        onClick={e => onSubmit(e)}
                      >
                        Next
                      </Button>
                    </Fragment>
                  )}
                </div>
              </div>
            }
          />
        </form>
      </Card>
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
