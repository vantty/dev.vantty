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

const Logo =
  "https://res.cloudinary.com/vantty/image/upload/q_auto:low/v1581100032/seed/ylzghomgp2petjxms0sx.webp";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#FFF"
  },
  title: {
    flexGrow: 1
  },
  logo: {
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
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    textTransform: "none"
  },
  buttonArtist: {
    backgroundColor: "inherit",
    color: theme.palette.greenVantty.dark,
    boxShadow: "none",
    transition: theme.transitions.create("backgroundColor"),
    "&:hover": {
      backgroundColor: "inherit",
      color: theme.palette.greenVantty.main
    },
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    textTransform: "none"
  },
  sectionDesktop: {
    display: "flex"
  }
}));

const Navbar = props => {
  const { isAuthenticated, loading, user } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            <LinkMui underline="none" color="inherit" component={Link} to="/">
              <img src={Logo} alt="" className={classes.logo} />
            </LinkMui>
          </Typography>
          {loading ? (
            <Progress />
          ) : (
            <Fragment>
              <div className={classes.sectionDesktop}>
                {!isAuthenticated || (user && !user.profile) ? (
                  <Button
                    className={classes.buttonArtist}
                    component={Link}
                    to="/register"
                  >
                    Become an artist partner
                  </Button>
                ) : (
                  <Button
                    className={classes.buttonArtist}
                    component={Link}
                    to="/bookings"
                  >
                    Bookings
                  </Button>
                )}
                <Button className={classes.button} component={Link} to="/help">
                  Help center
                </Button>
                <Button
                  className={classes.button}
                  component={Link}
                  to="/search"
                >
                  See all artists
                </Button>
                {!isAuthenticated ? (
                  <Fragment>
                    <Button
                      className={classes.button}
                      component={Link}
                      to="/login"
                    >
                      Login
                    </Button>
                    <Button
                      className={classes.button}
                      component={Link}
                      to="/register"
                    >
                      Register
                    </Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    {user && user.profile ? (
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
                    )}
                    {user && user.role === "Admin" && (
                      <Button
                        color="inherit"
                        className={classes.button}
                        component={Link}
                        to="/dashboard"
                      >
                        Admin
                      </Button>
                    )}
                  </Fragment>
                )}
              </div>
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
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user
});

export default connect(mapStateToProps, {})(Navbar);
