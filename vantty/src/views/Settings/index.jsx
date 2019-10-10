import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Hidden, Button, Container } from "@material-ui/core";
import { pagesProfile, pagesUser } from "./list";
import { Redirect, Link as RouterLink, withRouter } from "react-router-dom";
//actions
import { connect } from "react-redux";
import { getProfileById, getCurrentProfile } from "../../actions/profile";
import { loadUser, logout } from "../../actions/auth";

// import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { isOwner } from "../../helpers";
import { isMobile } from "react-device-detect";
import { SimpleAppBar } from "../../components";
import { SettingsProfile, SettingsUser } from "./components";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: "sticky",
    float: "left",
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    marginRight: "3rem" + "!important",
    float: "left",
    minWidth: "130px",
    maxWidth: "130px"
  }
}));

const Settings = ({
  match,
  getCurrentProfile,
  profile: { profile, loading },
  loadUser,
  logout,
  auth,
  history,
  getProfileById
}) => {
  const classes = useStyles();

  useEffect(() => {
    // profile &&
    getCurrentProfile(profile ? isOwner(auth, profile.user._id) : true);

    loadUser();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      {!isMobile && match.url === "/settings" && (
        <Redirect to='/personal-info' />
      )}

      <Hidden only={["md", "lg", "xl"]}>
        <SimpleAppBar
          history={history}
          path={
            profile && profile.mobileNumber !== null
              ? `/profile/artist/${profile.user._id}`
              : "/search"
          }
        />
      </Hidden>

      {profile && profile.mobileNumber ? (
        <SettingsProfile match={match} pagesProfile={pagesProfile} />
      ) : (
        <SettingsUser match={match} pagesProfile={pagesUser} />
      )}
    </Fragment>
  );
};

Settings.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById, getCurrentProfile, loadUser, logout }
)(Settings);
