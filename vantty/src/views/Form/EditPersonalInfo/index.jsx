import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import FacebookAuth from "react-facebook-login/dist/facebook-login-render-props";
import GoogleAuth from "react-google-login";
import { isMobile } from "react-device-detect";

// Components

import FormBottomNav from "../../../components/ComponentsForm/FormBottomNav";
// Actions
import {
  register,
  googleRegister,
  facebookRegister
} from "../../../actions/auth";
import { getCurrentProfile } from "../../../actions/profile";

// Material-UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LinkMui from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

//Components
import AddPortfolio from "../AddPortfolio";
import AppBarForm from "../../../components/ComponentsForm/AppBar";

//Material-UI

import Paper from "@material-ui/core/Paper";

import Style from "../style";

const EditPersonalInfo = ({
  auth: { user, loading, isAuthenticated },
  register
}) => {
  useEffect(() => {
    getCurrentProfile();
    setFormData({
      firstName: loading || !user.local ? "" : user.local.firstName,
      lastName: loading || !user.local ? "" : user.local.lastName,
      email: loading || !user.local ? "" : user.local.email
    });
  }, [loading, getCurrentProfile]);

  //   const classes = useStyles();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false
  });

  const { firstName, lastName, email } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    register({ firstName, lastName, email });
  };

  const classes = Style();
  return (
    <Fragment>
      <CssBaseline />
      <div>
        <AppBarForm step={null} />
      </div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Personal Information
          </Typography>
          <br />
          <Fragment>
            <Container component='main' maxWidth='xs'>
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>

                <form
                  className={classes.form}
                  noValidate
                  onSubmit={e => onSubmit(e)}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant='outlined'
                        name='firstName'
                        label='First Name'
                        id='firstName'
                        autoComplete='fname'
                        fullWidth
                        required
                        value={firstName}
                        onChange={e => onChange(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant='outlined'
                        name='lastName'
                        label='Last Name'
                        id='lastName'
                        autoComplete='lname'
                        fullWidth
                        required
                        value={lastName}
                        onChange={e => onChange(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant='outlined'
                        name='email'
                        label='Email Address'
                        id='email'
                        autoComplete='email'
                        fullWidth
                        required
                        value={email}
                        onChange={e => onChange(e)}
                      />
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
                </form>
              </div>
            </Container>
          </Fragment>
        </Paper>
      </main>
    </Fragment>
  );
};

EditPersonalInfo.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  // user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { register, getCurrentProfile }
)(EditPersonalInfo);
