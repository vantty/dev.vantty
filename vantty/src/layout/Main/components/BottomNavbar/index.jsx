import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { logout } from "../../../../actions/auth";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccountIcon from "@material-ui/icons/AccountCircle";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { getCurrentProfile } from "../../../../actions/profile";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflow: "hidden",
    position: "fixed",
    bottom: 0,
    zIndex: 10,
    borderTopWidth: "5px"
  }
});

function HideOnScroll({ children, window }) {
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
}

const BottomNavbar = props => {
  const {
    auth: { isAuthenticated, loading },
    profile: { profile },
    navbarValue
  } = props;

  HideOnScroll.propTypes = {
    children: PropTypes.node.isRequired,
    window: PropTypes.func,
    location: PropTypes.object
  };

  const classes = useStyles();

  return (
    <Fragment>
      <Fragment>
        {/* <HideOnScroll {...props}> */}
        <BottomNavigation
          value={navbarValue}
          className={classes.root}
          showLabels
        >
          <BottomNavigationAction
            label="Home"
            value="home"
            component={Link}
            to="/"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="Search"
            value="search"
            component={Link}
            to="/search"
            icon={<SearchIcon />}
          />
          {/* <BottomNavigationAction
            label="Favorites"
            value="favorites"
            component={Link}
            to="/favorites"
            icon={<FavoriteIcon />}
          /> */}
          {!loading && !isAuthenticated ? (
            <BottomNavigationAction
              label="Register"
              value="register"
              component={Link}
              to="/register"
              icon={<AccountIcon />}
            />
          ) : (
            <BottomNavigationAction
              label="Profile"
              value="profile"
              component={Link}
              to={profile ? `/profile/artist/${profile.user._id}` : "/settings"}
              icon={<AccountIcon />}
            />
          )}
        </BottomNavigation>
        {/* </HideOnScroll> */}
      </Fragment>
    </Fragment>
  );
};

BottomNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  navbarValue: PropTypes.string.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  navbarValue: state.navbar.navbarValue,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logout, getCurrentProfile }
)(BottomNavbar);
