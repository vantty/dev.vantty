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
import Event from "@material-ui/icons/Event";
import SearchIcon from "@material-ui/icons/Search";
import AccountIcon from "@material-ui/icons/AccountCircle";
import { getCurrentProfile } from "../../../../actions/profile";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { CssBaseline } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { getStrategy, getInitials } from "../../../../helpers";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: 10,
    borderTopWidth: "10px",
    borderTopColor: "black"
  },
  avatar: {
    width: 22,
    height: 22,
    fontWeight: "bold",
    fontSize: "10px",
    backgroundColor: theme.palette.greenVantty.main
  },
  select: {
    margin: 0
  }
}));

const BottomNavbar = props => {
  const {
    auth: { isAuthenticated, user },
    navbarValue
  } = props;

  const method = getStrategy(user);

  const classes = useStyles();

  return (
    <Fragment>
      <CssBaseline />
      <Fragment>
        <BottomNavigation
          value={navbarValue}
          className={classes.root}
          showLabels
        >
          <BottomNavigationAction
            label='Home'
            value='home'
            component={Link}
            to='/'
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label='Search'
            value='search'
            component={Link}
            to='/search'
            icon={<SearchIcon />}
          />
          {isAuthenticated && (
            <BottomNavigationAction
              label='Bookings'
              value='bookings'
              component={Link}
              to={user && user.profile ? "/bookings" : "/bookings-user"}
              icon={<Event />}
            />
          )}
          {!isAuthenticated ? (
            <BottomNavigationAction
              label='Join Now'
              value='register'
              component={Link}
              to='/register'
              icon={<AccountIcon />}
            />
          ) : (
            <BottomNavigationAction
              label='Profile'
              value='profile'
              className={classes.selected}
              component={Link}
              to={
                user && user.profile
                  ? `/profile/artist/${user && user._id}`
                  : "/settings"
              }
              icon={
                user ? (
                  method.profilePicture && method.profilePicture.original ? (
                    <Avatar
                      alt=''
                      src={method.profilePicture.original}
                      className={classes.avatar}
                    />
                  ) : (
                    <Avatar className={classes.avatar} src={""}>
                      {user && getInitials(method.firstName)}
                    </Avatar>
                  )
                ) : (
                  <Avatar className={classes.avatar} src={""}>
                    {user && getInitials(method.firstName)}
                  </Avatar>
                )
              }
            />
          )}
          {user && user.role === "Admin" && (
            <BottomNavigationAction
              label='Admin'
              value='admin'
              component={Link}
              to='/dashboard'
              icon={<LocationOnIcon />}
            />
          )}
        </BottomNavigation>
      </Fragment>
    </Fragment>
  );
};

BottomNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  navbarValue: PropTypes.string.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  navbarValue: state.navbar.navbarValue
});

export default connect(mapStateToProps, { logout, getCurrentProfile })(
  BottomNavbar
);
