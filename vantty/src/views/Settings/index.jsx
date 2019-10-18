import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

// Actions
import { getProfileById, getCurrentProfile } from "../../actions/profile";
import { loadUser, logout } from "../../actions/auth";

// Helpers
import { isOwner } from "../../helpers";
import { pagesProfile, pagesUser } from "./list";

// Components
import { SimpleAppBar } from "../../components";
import { SettingsProfile, SettingsUser } from "./components";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import { Hidden } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
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
            profile && profile.mobileNumber
              ? `/profile/artist/${profile.user._id}`
              : "/search"
          }
        />
      </Hidden>
      {!profile && profile.mobileNumber ? (
        <SettingsProfile match={match} pagesProfile={pagesProfile} />
      ) : (
        <SettingsUser match={match} pages={pagesUser} />
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
