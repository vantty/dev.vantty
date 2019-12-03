import React, { useState, useEffect } from "react";
import { Redirect, Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { connect } from "react-redux";

// Material-UI
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
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// Actions
import { sendEmail } from "../../actions/auth";
import { changeNavbarValue } from "../../actions/navbar";

// Components
import { Alert } from "../../components";

const LoginPhoto =
  "https://res.cloudinary.com/vantty/image/upload/v1572358347/seed/rscpy0xhyou7dmehngv4.jpg";

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
      minimum: 6,
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
    backgroundImage: `url(${LoginPhoto})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px"
  },
  quoteText: {
    color: theme.palette.white
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
    flexBasis: 700,
    [theme.breakpoints.up("sm")]: {
      paddingBottom: 125
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(3)
    }
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
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
  },
  link: {
    color: theme.palette.purpleVantty.main
  }
}));

const Register = props => {
  const {
    sendEmail,
    isAuthenticated,
    changeNavbarValue,
    history,
    user
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
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);
  useEffect(() => {
    changeNavbarValue("register");
  }, []);

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
    sendEmail({ firstName, lastName, email, password });
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  if (isAuthenticated) {
    history.goBack();
  }

  if (user) {
    return <Redirect push to="/confirmation" />;
  }

  return (
    <div className={classes.root}>
      <Alert />
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={6}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                {
                  "Find the best Beauty Artist in your area and change your look."
                }
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={6} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton>
                <Link component={RouterLink} to="/register" variant="h6">
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
                  with your email address
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
                  By clicking Register Now, you agree to our{" "}
                  <Link
                    component={RouterLink}
                    to="/terms-of-service"
                    variant="h6"
                    className={classes.link}
                  >
                    Terms
                  </Link>
                  ,{" "}
                  <Link
                    component={RouterLink}
                    to="/data-policy"
                    variant="h6"
                    className={classes.link}
                  >
                    Data Policy
                  </Link>
                  . You may receive Whatsapp or SMS notifications from us and
                  can opt out any time.
                </Typography>
                <br />
                <Typography color="textSecondary" variant="body1">
                  Already have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                    className={classes.link}
                  >
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
  changeNavbarValue: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { sendEmail, changeNavbarValue })(
  withRouter(Register)
);
