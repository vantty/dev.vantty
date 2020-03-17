import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import Event from "@material-ui/icons/Event";
import SearchIcon from "@material-ui/icons/Search";
import AccountIcon from "@material-ui/icons/AccountCircle";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { CssBaseline, Badge } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

// Helpers
import { getInitials } from "../../../../helpers";

// Actions
import { getBook, getUserBookings } from "../../../../actions/book";

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
    auth: { isAuthenticated, user, id, bookings },
    book: { book },
    getBook,
    getUserBookings,
    navbarValue
  } = props;

  const classes = useStyles();

  useEffect(() => {
    getBook();
    getUserBookings(id);
  }, [getBook, getUserBookings, id]);

  const countBookingsArtist = () => {
    const arr = [];
    book.map(bookings => bookings.state === "request" && arr.push(bookings));
    return arr.length;
  };

  const countBookingsUser = () => {
    const arr = [];
    bookings.map(
      book =>
        book.state !== "request" &&
        book.state !== "declined-user" &&
        arr.push(bookings)
    );
    return arr.length;
  };
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
          {isAuthenticated &&
            (user && user.profile ? (
              <BottomNavigationAction
                label="Bookings"
                value="bookings"
                component={Link}
                to={"/bookings"}
                icon={
                  <Badge color="secondary" badgeContent={countBookingsArtist()}>
                    <Event />
                  </Badge>
                }
              />
            ) : (
              <BottomNavigationAction
                label="Bookings"
                value="bookings"
                component={Link}
                to={"/bookings-user"}
                icon={
                  <Badge color="secondary" badgeContent={countBookingsUser()}>
                    <Event />
                  </Badge>
                }
              />
            ))}
          {!isAuthenticated ? (
            <BottomNavigationAction
              label="Join Now"
              value="register"
              component={Link}
              to="/register"
              icon={<AccountIcon />}
            />
          ) : (
            <BottomNavigationAction
              label="Profile"
              value="profile"
              className={classes.selected}
              component={Link}
              to={
                user && user.profile
                  ? `/profile/artist/${user && user._id}`
                  : "/settings"
              }
              icon={
                user ? (
                  user.profileImage && user.profileImage.original ? (
                    <Avatar
                      alt=""
                      src={user.profileImage.original}
                      className={classes.avatar}
                    />
                  ) : (
                    <Avatar className={classes.avatar} src={""}>
                      {user && getInitials(user.firstName)}
                    </Avatar>
                  )
                ) : (
                  <Avatar className={classes.avatar} src={""}>
                    {user && getInitials(user.firstName)}
                  </Avatar>
                )
              }
            />
          )}
          {user && user.role === "Admin" && (
            <BottomNavigationAction
              label="Admin"
              value="admin"
              component={Link}
              to="/dashboard"
              icon={<LocationOnIcon />}
            />
          )}
        </BottomNavigation>
      </Fragment>
    </Fragment>
  );
};

BottomNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
  navbarValue: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  book: state.book,
  navbarValue: state.navbar.navbarValue
});

export default connect(mapStateToProps, { getBook, getUserBookings })(
  BottomNavbar
);
