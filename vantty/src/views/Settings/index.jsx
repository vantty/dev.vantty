import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

// Actions
import { deleteAccount } from "../../actions/profile";
import { logout } from "../../actions/auth";

// Helpers

import { pagesProfile, pagesUser } from "./list";

// Components
import { SimpleAppBar } from "../../components";
import { SettingsProfile, AvatarUser, SettingsUser } from "./components";

// Material-UI
import { Hidden, CssBaseline } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
const Settings = ({
  match,
  profile: { profile, loading },
  auth: { user },
  auth,
  history,
  deleteAccount
}) => {
  return (
    <Fragment>
      <CssBaseline />
      {!isMobile && match.url === "/settings" && (
        <Redirect to='/personal-info' />
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
            {/* {console.log(user.profileImage.original)} */}
            <AvatarUser
              profileImage={user.profileImage.original}
              firstName={user.firstName}
              profile={user.profile}
            />
          </Fragment>
        )}
        <br />
      </Hidden>

      {/* {user && user.profile ? (
        <SettingsProfile
          match={match}
          pages={pagesProfile}
          profile={true}
          // deleteAccount={deleteAccount}
        />
      ) : (
        <SettingsProfile match={match} pages={pagesUser} profile={false} />
      )} */}
      {isMobile ? (
        <SettingsUser
          match={match}
          profile={user && user.profile ? true : false}
          // deleteAccount={deleteAccount}
        />
      ) : (
        <SettingsProfile
          match={match}
          pages={user && user.profile ? pagesProfile : pagesUser}
          profile={user && user.profile ? true : false}
          // deleteAccount={deleteAccount}
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
