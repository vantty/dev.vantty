import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";
import { withRouter } from "react-router-dom";

// Components
import FormBottomNav from "../../../components/ComponentsForm/FormBottomNav";
import AppBarForm from "../../../components/ComponentsForm/AppBar";

// Actions
import { updateInfo } from "../../../actions/auth";
import { getCurrentProfile } from "../../../actions/profile";

// Material-UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

//Style
import Style from "../style";

const EditPersonalInfo = ({
  auth: { user, loading, isAuthenticated },
  getCurrentProfile,
  updateInfo,
  history
}) => {
  //   const classes = useStyles();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
    password: ""
  });

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      firstName: loading || !user.local ? "" : user.local.firstName,
      lastName: loading || !user.local ? "" : user.local.lastName,
      email: loading || !user.local ? "" : user.local.email,
      id: loading || !user._id ? "" : user._id,
      password: loading || !user.password ? "" : user.password
    });
  }, [loading, getCurrentProfile]);

  const { firstName, lastName, email } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    updateInfo(formData, history, true);
    console.log(formData);
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
                        id='local.email'
                        autoComplete='email'
                        fullWidth
                        required
                        value={email}
                        onChange={e => onChange(e)}
                      />
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
                  </Grid>
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
  updateInfo: PropTypes.func.isRequired,
  // auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, updateInfo }
)(withRouter(EditPersonalInfo));
