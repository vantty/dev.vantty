import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import FacebookAuth from "react-facebook-login/dist/facebook-login-render-props";
import GoogleAuth from "react-google-login";
import { isMobile } from "react-device-detect";

// Components
import Navbar from "../../components/Navbar";
import BottomNavabar from "../../components/BottomNavbar";

// Actions
import { login, googleLogin, facebookLogin } from "../../actions/auth";
import { changeNavbarValue } from "../../actions/navbar";

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
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  login: {
    marginTop: theme.spacing(2)
  },
  root: {
    width: "100%",
    paddingTop: "16px",
    paddingBottom: "8px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  panel: {
    marginTop: "-2rem"
  }
}));

const Login = ({
  login,
  isAuthenticated,
  googleLogin,
  facebookLogin,
  changeNavbarValue
}) => {
  useEffect(() => {
    changeNavbarValue("login");
  }, []);

  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false
  });

  const { email, password, showPassword } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !showPassword });
  };

  const onSubmit = async e => {
    e.preventDefault();
    login({ email, password });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  // Handle Facebook
  const responseFacebook = res => {
    facebookLogin(res.accessToken);
  };

  // Handle Google
  const responseGoogle = res => {
    googleLogin(res.accessToken);
  };

  return (
    <Fragment>
      {isMobile ? <BottomNavabar /> : <Navbar />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Grid container spacing={2} className={classes.login}>
            <Grid item xs={12} sm={6}>
              <FacebookAuth
                appId="2421393628186630"
                fields="name,email,picture"
                callback={responseFacebook}
                render={renderProps => (
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    onClick={renderProps.onClick}
                  >
                    facebook
                  </Button>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <GoogleAuth
                clientId="259457812212-sj1ga4eqacoqubksrl53e6pjgan5pp9o.apps.googleusercontent.com"
                buttonText="Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                  <Button
                    color="secondary"
                    variant="contained"
                    fullWidth
                    onClick={renderProps.onClick}
                  >
                    Google
                  </Button>
                )}
              />
            </Grid>
          </Grid>

          <div className={classes.root}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  With your email account
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.panel}>
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={e => onSubmit(e)}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        name="email"
                        label="Email Address"
                        id="email"
                        autoComplete="email"
                        fullWidth
                        required
                        value={email}
                        onChange={e => onChange(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        fullWidth
                        required
                        value={password}
                        onChange={e => onChange(e)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                aria-label="Toggle password visibility"
                                onClick={handleClickShowPassword}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Login
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <LinkMui component={Link} to="#" variant="body2">
                        Forgot password?
                      </LinkMui>
                    </Grid>
                  </Grid>
                </form>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
          <Grid container justify="flex-end">
            <Grid item>
              <LinkMui variant="body2" component={Link} to="/register">
                Don't have an account? Register
              </LinkMui>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  googleLogin: PropTypes.func.isRequired,
  facebookLogin: PropTypes.func.isRequired,
  changeNavbarValue: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login, googleLogin, facebookLogin, changeNavbarValue }
)(Login);