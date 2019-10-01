import React, { useEffect, Fragment, useState } from "react";
import { isMobile, isTablet, isBrowser } from "react-device-detect";
import { Settings, DashDesktop } from "./components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById, getCurrentProfile } from "../../actions/profile";
import { loadUser, logout } from "../../actions/auth";
import { pagesUser, pagesProfile } from "./list";
import Progress from "@material-ui/core/LinearProgress";
import { isOwner } from "../../helpers";
const Dashboard = ({
  getCurrentProfile,
  profile: { profile, loading },
  loadUser,
  logout,
  auth,
  getProfileById
}) => {
  const [state, setState] = useState();

  useEffect(() => {
    getCurrentProfile(state);
    loadUser();
  }, [getCurrentProfile]);

  const shoot = (e, own) => {
    const owner = (e, own) => {
      e.preventDefault();
      setState(own);
    };
  };

  return (
    <Fragment>
      {profile && shoot(e => e, isOwner(auth, profile.user._id))}

      <Fragment>
        {loading && profile === null ? (
          <Progress />
        ) : (
          <Fragment>
            {profile &&
            isOwner(auth, profile.user._id) &&
            profile.mobileNumber !== null ? (
              isMobile ? (
                <Settings pages={pagesProfile} id={auth.user._id} />
              ) : (
                <DashDesktop
                  pages={pagesProfile}
                  id={auth.user._id}
                  logout={logout}
                />
              )
            ) : isMobile ? (
              <Settings pages={pagesUser} />
            ) : (
              <DashDesktop pages={pagesUser} />
            )}
          </Fragment>
        )}
      </Fragment>
    </Fragment>
  );
};

Dashboard.propTypes = {
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
)(Dashboard);
