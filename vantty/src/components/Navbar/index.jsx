import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { logout } from "../../actions/auth";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LinkMui from "@material-ui/core/Link";
import Progress from "@material-ui/core/LinearProgress";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

// Assets
import Logo from "../../assets/logos/logo.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    color: "#505050",
    boxShadow: "0 0.04em 0 0 #808080"
  },
  title: {
    flexGrow: 1
  },
  button: {
    backgroundColor: "inherit",
    color: "black",
    boxShadow: "none",
    transition: theme.transitions.create("backgroundColor"),
    "&:hover": {
      backgroundColor: "rgb(245, 0, 87)",
      color: "rgb(255, 255, 255)"
    },
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3)
  },
  register: {
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    marginLeft: theme.spacing(2),
    "&:hover": {
      backgroundColor: "rgb(245, 0, 87)"
    }
  },
  search: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: "250px",
    borderStyle: "solid",
    borderColor: "#f0f0f0",
    borderWidth: "1px"
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7)
  },
  sectionDesktop: {
    display: "flex"
  }
}));

const HideOnScroll = props => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Navbar = props => {
  const { isAuthenticated, loading, logout } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={classes.root}>
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              <LinkMui underline="none" color="inherit" component={Link} to="/">
                {"Vantty"}
                {/* <img src={Logo} alt="" /> */}
              </LinkMui>
            </Typography>
            {loading ? (
              <Progress data-test="progress" />
            ) : (
              <Fragment>
                {!isAuthenticated ? (
                  <Fragment>
                    <section data-test="noAuthButtons">
                      <div className={classes.sectionDesktop}>
                        <div className={classes.search}>
                          <div className={classes.searchIcon}>
                            <SearchIcon />
                          </div>
                          <InputBase
                            placeholder="Search…"
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput
                            }}
                            inputProps={{ "aria-label": "search" }}
                          />
                        </div>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          component={Link}
                          to="/artists"
                        >
                          Artists
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          size="medium"
                          component={Link}
                          to="/login"
                        >
                          Login
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.register}
                          size="medium"
                          component={Link}
                          to="/register"
                        >
                          Register
                        </Button>
                      </div>
                    </section>
                  </Fragment>
                ) : (
                  <Fragment>
                    <section data-test="authButtons">
                      <div className={classes.sectionDesktop}>
                        <div className={classes.search}>
                          <div className={classes.searchIcon}>
                            <SearchIcon />
                          </div>
                          <InputBase
                            placeholder="Search…"
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput
                            }}
                            inputProps={{ "aria-label": "search" }}
                          />
                        </div>
                        <Button
                          color="inherit"
                          className={classes.button}
                          component={Link}
                          to="/artists"
                        >
                          Artists
                        </Button>
                        <Button
                          color="inherit"
                          className={classes.button}
                          component={Link}
                          to="/dashboard"
                        >
                          Profile
                        </Button>
                        <Button
                          data-test="logoutButton"
                          color="inherit"
                          className={classes.button}
                          component={Link}
                          to="/"
                          onClick={logout}
                        >
                          Logout
                        </Button>
                      </div>
                    </section>
                  </Fragment>
                )}
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
