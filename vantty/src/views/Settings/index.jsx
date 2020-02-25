import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

// Actions
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import { logout } from "../../actions/auth";

// Helpers
import { desktopArtist, desktopUser, mobileSettings } from "./list";

// Components
import { SimpleAppBar } from "../../components";
import { MenuDesktop, AvatarUser, MenuMobile } from "./components";

// Material-UI
import { Hidden, CssBaseline } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const Settings = ({
  match,
  profile: { profile },
  auth: { user },
  history,
  getCurrentProfile
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return (
    <Fragment>
      <CssBaseline />
      {!isMobile && match.url === "/settings" && (
        <Redirect to="/personal-info" />
      )}
      <Hidden only={["md", "lg", "xl"]}>
        <SimpleAppBar
          history={history}
          path={
            user && user.profile && profile
              ? `/profile/artist/${profile.user}`
              : "/search"
          }
        />
        {!user ? (
          <CircularProgress />
        ) : (
          <Fragment>
            <AvatarUser
              profileImage={user.profileImage.original}
              firstName={user.firstName}
              profile={user.profile}
            />
          </Fragment>
        )}
        <br />
      </Hidden>
      {isMobile ? (
        <MenuMobile
          match={match}
          pages={mobileSettings}
          profile={user && user.profile ? true : false}
        />
      ) : (
        <MenuDesktop
          match={match}
          pages={user && user.profile ? desktopArtist : desktopUser}
          profile={user && user.profile ? true : false}
        />
      )}
    </Fragment>
  );
};

Settings.propTypes = {
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
  logout,
  deleteAccount,
  getCurrentProfile
})(Settings);
