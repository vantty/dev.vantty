import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

// Actions
import {
  getProfileById,
  getCurrentProfile,
  deleteAccount
} from "../../actions/profile";
import { loadUser, logout } from "../../actions/auth";

// Helpers
import { isOwner, getStrategy } from "../../helpers";
import { pagesProfile, pagesUser } from "./list";

// Components
import { SimpleAppBar } from "../../components";
import { SettingsProfile, SettingsUser, AvatarUser } from "./components";

// Material-UI
import { Hidden, Typography } from "@material-ui/core";

const Settings = ({
  match,
  getCurrentProfile,
  profile: { profile, loading },
  loadUser,
  logout,
  auth: { user },
  auth,
  history,
  getProfileById,
  deleteAccount
}) => {
  const method = getStrategy(user);

  useEffect(() => {
    loadUser();
    getCurrentProfile(profile ? isOwner(auth, profile.user._id) : true);
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
            user && user.profile && profile
              ? `/profile/artist/${profile.user._id}`
              : "/search"
          }
        />
        {isMobile && user && (
          <AvatarUser
            profilePicture={user && method.profilePicture}
            firstName={user && method.firstName}
          />
        )}
        <br />
      </Hidden>

      {user && user.profile ? (
        <SettingsProfile
          match={match}
          pages={pagesProfile}
          profile={true}
          // deleteAccount={deleteAccount}
        />
      ) : (
        <SettingsProfile match={match} pages={pagesUser} profile={false} />
      )}
    </Fragment>
  );
};

Settings.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  deleteAccount: PropTypes.func
});

export default connect(mapStateToProps, {
  getProfileById,
  getCurrentProfile,
  loadUser,
  logout,
  deleteAccount
})(Settings);

// {user && user.profile ? (
//   <SettingsProfile match={match} pagesProfile={pagesProfile} />
// ) : (
//   <SettingsUser match={match} pages={pagesUser} />
// )}
// {/* {user && user.profile && (
//   <SettingsProfile match={match} pagesProfile={pagesProfile} />
// )} */}
