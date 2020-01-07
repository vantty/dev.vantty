import React, { useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
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
import { login, googleLogin, facebookLogin } from "../../actions/auth";
import { changeNavbarValue } from "../../actions/navbar";

// Components
import { Alert } from "../../components";

const LoginPhoto =
  "https://res.cloudinary.com/vantty/image/upload/v1572358347/seed/rscpy0xhyou7dmehngv4.jpg";

// const Logo =
//   "https://res.cloudinary.com/vantty/image/upload/v1572304171/seed/pms9bvmck4uygtqs0ljz.png";

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
    // textShadow: "0 0 1.5px #000"
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

const Login = props => {
  const {
    isAuthenticated,
    googleLogin,
    facebookLogin,
    changeNavbarValue,
    history
  } = props;

  const classes = useStyles();

  useEffect(() => {
    changeNavbarValue("login");
  }, []);

  const responseFacebook = res => {
    facebookLogin(res.accessToken);
  };

  const responseGoogle = res => {
    googleLogin(res.accessToken);
  };

  if (isAuthenticated) {
    history.goBack();
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
              {/* <img src={Logo} alt="" className={classes.logo} /> */}
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
              <form className={classes.form}>
                <Typography className={classes.title} variant="h2">
                  Login
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
                      to="/login-email"
                      className={classes.withEmail}
                      variant="h5"
                    >
                      Or with your email address
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="textSecondary" variant="body1">
                      Don't have an account?{" "}
                      <Link
                        component={RouterLink}
                        to="/register"
                        variant="h6"
                        className={classes.link}
                      >
                        Register
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

Login.propTypes = {
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

export default connect(mapStateToProps, {
  login,
  googleLogin,
  facebookLogin,
  changeNavbarValue
})(withRouter(Login));
