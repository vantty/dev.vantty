import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Headroom from "react-headroom";

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
import Container from "@material-ui/core/Container";
import Progress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    color: "#505050",
    boxShadow: "0 0.04em 0 0 #808080"
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = ({ isAuthenticated, loading, logout }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <section data-test="navbar">
        <Headroom>
          <CssBaseline />
          <AppBar position="relative" className={classes.root}>
            <Container maxWidth="xl">
              <Toolbar>
                <Typography variant="h5" className={classes.title}>
                  <LinkMui
                    underline="none"
                    color="inherit"
                    component={Link}
                    to="/"
                  >
                    {"Vantty"}
                  </LinkMui>
                </Typography>
                {loading ? (
                  <Progress data-test="progress" />
                ) : (
                  <Fragment>
                    {!isAuthenticated ? (
                      <Fragment>
                        <section data-test="noAuthButtons">
                          <Button
                            color="inherit"
                            component={Link}
                            to="/artists"
                          >
                            Artists
                          </Button>
                          <Button
                            color="inherit"
                            component={Link}
                            to="/register"
                          >
                            Register
                          </Button>
                          <Button color="inherit" component={Link} to="/login">
                            Login
                          </Button>
                        </section>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <section data-test="authButtons">
                          <Button
                            color="inherit"
                            component={Link}
                            to="/artists"
                          >
                            Artists
                          </Button>
                          <Button
                            color="inherit"
                            component={Link}
                            to="/dashboard"
                          >
                            Dashboard
                          </Button>
                          <Button
                            data-test="logoutButton"
                            color="inherit"
                            component={Link}
                            to="/"
                            onClick={logout}
                          >
                            Logout
                          </Button>
                        </section>
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </Toolbar>
            </Container>
          </AppBar>
        </Headroom>
      </section>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
