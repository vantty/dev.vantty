import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LinkMui from "@material-ui/core/Link";
import Progress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";

// Assets
import Logo from "../../../../assets/logos/logo.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#FFF"
  },
  title: {
    flexGrow: 1
  },
  logo: {
    height: "80%",
    width: "5rem",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2)
  },
  button: {
    backgroundColor: "inherit",
    color: theme.palette.text.primary,
    boxShadow: "none",
    transition: theme.transitions.create("backgroundColor"),
    "&:hover": {
      backgroundColor: "inherit",
      color: theme.palette.greenVantty.dark
    },
    "&:action": {},
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    textTransform: "capitalize"
  },
  sectionDesktop: {
    display: "flex"
  }
}));

// const HideOnScroll = props => {
//   const { children, window } = props;
//   const trigger = useScrollTrigger({ target: window ? window() : undefined });
//   return (
//     // <Slide appear={false} direction='down' in={!trigger}>
//     <Slide appear={false} direction='down'>
//       {children}
//     </Slide>
//   );
// };

const Navbar = props => {
  const {
    isAuthenticated,
    loading,
    user,
    profile: { profile }
  } = props;

  const classes = useStyles();

  return (
    <Fragment>
      <CssBaseline />
      <AppBar className={classes.root}>
        <Toolbar>
          <Typography variant='h5' className={classes.title}>
            <LinkMui underline='none' color='inherit' component={Link} to='/'>
              <img src={Logo} alt='' className={classes.logo} />
            </LinkMui>
          </Typography>
          {loading ? (
            <Progress data-test='progress' />
          ) : (
            <Fragment>
              {!isAuthenticated ? (
                <Fragment>
                  <section data-test='noAuthButtons'>
                    <div className={classes.sectionDesktop}>
                      <Button
                        className={classes.button}
                        component={Link}
                        to='/search'
                      >
                        Artists
                      </Button>
                      <Button
                        className={classes.button}
                        component={Link}
                        to='/login'
                      >
                        Login
                      </Button>
                      <Button
                        className={classes.button}
                        component={Link}
                        to='/register'
                      >
                        Register
                      </Button>
                    </div>
                  </section>
                </Fragment>
              ) : (
                <Fragment>
                  <section data-test='authButtons'>
                    <div className={classes.sectionDesktop}>
                      <Button
                        className={classes.button}
                        component={Link}
                        to='/search'
                      >
                        Artists
                      </Button>
                      {user ? (
                        user.profile ? (
                          // <a
                          //   href={`https://www.vantty.ca/profile/artist/${user &&
                          //     user._id}`}
                          //   // href={`http://localhost:3000/profile/artist/${user &&
                          //   //   user._id}`}
                          // >
                          //   <Button className={classes.button}>Profile</Button>

                          // </a>
                          <Button
                            className={classes.button}
                            component={Link}
                            to={`/profile/artist/${user && user._id}`}
                          >
                            Profile
                          </Button>
                        ) : (
                          <Button
                            className={classes.button}
                            component={Link}
                            to={"/settings"}
                          >
                            Profile
                          </Button>
                        )
                      ) : (
                        <Button
                          className={classes.button}
                          component={Link}
                          to={"/settings"}
                        >
                          Profile
                        </Button>
                      )}
                      {user && user.role === "Admin" && (
                        <Button
                          color='inherit'
                          className={classes.button}
                          component={Link}
                          to='/dashboard'
                        >
                          Admin
                        </Button>
                      )}
                    </div>
                  </section>
                </Fragment>
              )}
            </Fragment>
          )}
        </Toolbar>
        <Divider />
      </AppBar>
    </Fragment>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  profile: PropTypes.object.isRequired
};

// HideOnScroll.propTypes = {
//   children: PropTypes.element.isRequired,
//   window: PropTypes.func
// };

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {}
)(Navbar);
