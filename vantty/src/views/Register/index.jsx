import React, { useState, useEffect } from "react";
import { Redirect, Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  Facebook as FacebookIcon,
  Google as GoogleIcon
} from "../../assets/icons";
import photo from "../../assets/images/login.jpg";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { connect } from "react-redux";
import FacebookAuth from "react-facebook-login/dist/facebook-login-render-props";
import GoogleAuth from "react-google-login";
import { register, googleRegister, facebookRegister } from "../../actions/auth";
import { changeNavbarValue } from "../../actions/navbar";

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 30
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 30
    }
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%"
  },
  grid: {
    height: "100%"
  },
  quoteContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${photo})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px"
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(2),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(1)
    }
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center"
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const Register = props => {
  const {
    register,
    isAuthenticated,
    googleRegister,
    facebookRegister,
    changeNavbarValue
  } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    showPassword: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    changeNavbarValue("login");
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
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
  };

  const {
    showPassword,
    values: { firstName, lastName, email, password }
  } = formState;

  const handleClickShowPassword = () => {
    setFormState({ ...formState, showPassword: !showPassword });
  };

  const handleRegister = event => {
    event.preventDefault();
    register({ firstName, lastName, email, password });
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const responseFacebook = res => {
    facebookRegister(res.accessToken);
  };

  const responseGoogle = res => {
    googleRegister(res.accessToken);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={6}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                they sold out High Life.
              </Typography>
              <div className={classes.person}>
                <Typography className={classes.name} variant="body1">
                  Takamaru Ayako
                </Typography>
                <Typography className={classes.bio} variant="body2">
                  Manager at inVision
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={6} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton>
                <Link component={RouterLink} to="/" variant="h6">
                  <ArrowBackIcon style={{ color: "black" }} />
                </Link>
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleRegister}>
                <Typography className={classes.title} variant="h2">
                  Create a new account
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  with social media
                </Typography>
                <Grid className={classes.socialButtons} container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FacebookAuth
                      appId="2421393628186630"
                      fields="name,email,picture"
                      callback={responseFacebook}
                      render={renderProps => (
                        <Button
                          fullWidth
                          color="primary"
                          variant="contained"
                          size="large"
                          onClick={renderProps.onClick}
                        >
                          <FacebookIcon className={classes.socialIcon} />
                          Facebook
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
                          fullWidth
                          size="large"
                          onClick={renderProps.onClick}
                          variant="contained"
                        >
                          <GoogleIcon className={classes.socialIcon} />
                          Google
                        </Button>
                      )}
                    />
                  </Grid>
                </Grid>
                <Typography
                  align="center"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  or with email address
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError("firstName")}
                  fullWidth
                  helperText={
                    hasError("firstName") ? formState.errors.firstName[0] : null
                  }
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.firstName || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError("lastName")}
                  fullWidth
                  helperText={
                    hasError("lastName") ? formState.errors.lastName[0] : null
                  }
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.lastName || ""}
                  variant="outlined"
                />

                <TextField
                  className={classes.textField}
                  error={hasError("email")}
                  fullWidth
                  helperText={
                    hasError("email") ? formState.errors.email[0] : null
                  }
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError("password")}
                  fullWidth
                  helperText={
                    hasError("password") ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  value={formState.values.password || ""}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="Toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Register now
                </Button>
                <Typography color="textSecondary" variant="body1">
                  Already have an account?{" "}
                  <Link component={RouterLink} to="/login" variant="h6">
                    Login
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Register.propTypes = {
  history: PropTypes.object,
  login: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  googleLogin: PropTypes.func,
  facebookLogin: PropTypes.func,
  changeNavbarValue: PropTypes.func
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register, googleRegister, facebookRegister, changeNavbarValue }
)(withRouter(Register));
