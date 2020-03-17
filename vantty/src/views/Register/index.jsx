import React, { useState, useEffect } from "react";
import { Redirect, Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FacebookAuth from "react-facebook-login/dist/facebook-login-render-props";
import GoogleAuth from "react-google-login";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, IconButton, Link, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Assets
import {
  Facebook as FacebookIcon,
  Google as GoogleIcon
} from "../../assets/icons";

// Actions
import { googleRegister, facebookRegister } from "../../actions/auth";
import { changeNavbarValue } from "../../actions/navbar";

// Components
import { Alert } from "../../components";

const LoginPhoto =
  "https://res.cloudinary.com/vantty/image/upload/q_auto:low/v1572358347/seed/rscpy0xhyou7dmehngv4.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100vh"
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
    height: "100vh",
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
  },
  withEmail: {
    color: theme.palette.greenVantty.main,
    "&:hover": {
      color: theme.palette.greenVantty.dark
    }
  },
  withEmailGrid: {
    marginTop: theme.spacing(1)
  }
}));

const Register = props => {
  const {
    isAuthenticated,
    user,
    googleRegister,
    facebookRegister,
    changeNavbarValue
  } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({ sendConfirmation: false });

  useEffect(() => {
    changeNavbarValue("register");
  }, [changeNavbarValue]);

  const { sendConfirmation } = formState;

  const handleRegister = event => {
    event.preventDefault();
    setFormState({ ...formState, sendConfirmation: true });
  };

  const responseFacebook = res => {
    facebookRegister(res.accessToken);
  };

  const responseGoogle = res => {
    googleRegister(res.accessToken);
  };

  if (user && isAuthenticated) {
    return <Redirect push to="/role" />;
  }

  if (sendConfirmation) {
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
                  <Grid item xs={12}>
                    <FacebookAuth
                      appId={process.env.REACT_APP_FACEBOOK_ID}
                      fields="name,email,picture"
                      callback={responseFacebook}
                      isMobile={false}
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
                  <Grid item xs={12}>
                    <GoogleAuth
                      clientId={process.env.REACT_APP_GOOGLE_ID}
                      buttonText="Google"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      render={renderProps => (
                        <Button
                          fullWidth
                          color="secondary"
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
                  <Grid item xs={12} className={classes.withEmailGrid}>
                    <Link
                      component={RouterLink}
                      to="/register-email"
                      className={classes.withEmail}
                      variant="h5"
                    >
                      Or with your email address
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="textSecondary" variant="body1">
                      By registering, you agree to our{" "}
                      <Link
                        component={RouterLink}
                        to="/terms"
                        variant="h6"
                        className={classes.link}
                      >
                        Terms
                      </Link>
                      ,{" "}
                      <Link
                        component={RouterLink}
                        to="/policy"
                        variant="h6"
                        className={classes.link}
                      >
                        Data Policy
                      </Link>
                      . You may receive Whatsapp or SMS notifications from us
                      and can opt out any time.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
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
                  </Grid>
                </Grid>
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
  changeNavbarValue: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  googleRegister,
  facebookRegister,
  changeNavbarValue
})(withRouter(Register));
