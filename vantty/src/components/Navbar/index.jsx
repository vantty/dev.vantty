import React, { Fragment, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { logout } from "../../actions/auth";
import { searchValue } from "../../actions/search";

// Material-UI
// import { ThemeProvider } from "@material-ui/styles";
import { fade, makeStyles } from "@material-ui/core/styles";
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

import SearchBar from "../../views/Favorites/Components/SearchBar";

// Assets
import Logo from "../../assets/logos/logo.png";
// import theme from "../../assets/theme/theme.js";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#FFF",
    boxShadow: "0 0 0 0 #808080"
  },
  title: {
    flexGrow: 1
  },
  logo: {
    height: "100%",
    width: "8.5rem",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2)
  },
  button: {
    backgroundColor: "inherit",
    color: theme.palette.greenVantty.tooDark,
    boxShadow: "none",
    transition: theme.transitions.create("backgroundColor"),
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.main,
      color: theme.palette.greenVantty.contrastText
    },
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    textTransform: "capitalize"
  },
  register: {
    backgroundColor: "rgb(19, 224, 216)",
    textTransform: "capitalize",
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    marginLeft: theme.spacing(2),
    "&:hover": {
      backgroundColor: "red"
    }
  },
  search: {
    marginRight: theme.spacing(1),
    color: "#000",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    },
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
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
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
  const { isAuthenticated, loading, logout, searchValue, goSearch } = props;

  const [search, setSearch] = useState("");

  const handleChange = event => {
    event.persist();
    setSearch(event.target.value);
  };

  const handleSearch = async event => {
    event.preventDefault();
    searchValue(search);
  };

  const classes = useStyles();

  return (
    <Fragment>
      {goSearch ? (
        <Redirect to="/favorites" />
      ) : (
        <Fragment>
          <CssBaseline />
          <HideOnScroll {...props}>
            <AppBar className={classes.root}>
              <Toolbar>
                <Typography variant="h5" className={classes.title}>
                  <LinkMui
                    underline="none"
                    color="inherit"
                    component={Link}
                    to="/home"
                  >
                    <img src={Logo} alt="" className={classes.logo} />
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
                            {/* <div className={classes.search}>
                              <div className={classes.searchIcon}>
                                <SearchIcon />
                              </div>
                              <form onSubmit={handleSearch}>
                                <InputBase
                                  onChange={handleChange}
                                  placeholder="Search…"
                                  classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                  }}
                                  inputProps={{ "aria-label": "search" }}
                                />
                              </form>
                            </div> */}
                            <Button
                              size="large"
                              variant="contained"
                              color="secondary"
                              className={classes.button}
                              component={Link}
                              to="/artists"
                            >
                              Artists
                            </Button>
                            <Button
                              size="large"
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
                              size="large"
                              variant="contained"
                              color="secondary"
                              className={classes.button}
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
      )}
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  searchValue: PropTypes.func,
  goSearch: PropTypes.bool
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  goSearch: state.search.goSearch
});

export default connect(
  mapStateToProps,
  { logout, searchValue }
)(Navbar);
