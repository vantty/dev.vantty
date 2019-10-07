import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
// Components
import Navbar from "../../components/Navbar";
// import SettingsDrawer from "../Settings";
// import SideBar from "../../layouts/Main/components/Sidebar";

//Comonents

import { Header } from "../../components/";
import { Review } from "./components";

//Components inside
import { ProfileCarousel, ProfileInfo, ContactButton } from "./components";

// Actions
import { getProfileById } from "../../actions/profile";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Container,
  Toolbar,
  AppBar,
  IconButton,
  Button
} from "@material-ui/core";
import Progress from "@material-ui/core/LinearProgress";
// import ArrowBack from "../../components/ArrowBack";
import MuiLink from "@material-ui/core/Link";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import { SimpleAppBar } from "../../components";

const useStyles = makeStyles(theme => ({
  buttonSetting: {
    float: "right"
  },
  input: {
    display: "none"
  },
  settings: {
    float: "right",
    fontSize: "26px"
    // fontWeight: "ligther",
    // marginTop: "1rem"
  },

  arrowBack: {
    float: "left",
    fontSize: "26px",
    fontWeight: "ligther",
    marginTop: "1rem"
  },
  appbar: {
    // background: "transparent",
    boxShadow: "none",
    paddingRight: "-35%"
  },
  toolbar: {
    flexGrow: 1
  }
}));

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
  history
}) => {
  useEffect(() => {
    getProfileById(auth, match.params.id);
  }, [getProfileById, match.params.id]);

  const handleBack = () => {
    history.goBack();
  };

  const classes = useStyles();

  return (
    <Fragment>
      {/* {!isMobile && <Navbar />} */}
      <CssBaseline />
      {profile === null || loading ? (
        <Progress />
      ) : (
        // <div>
        <Fragment>
          {isMobile && (
            <Fragment>
              <SimpleAppBar path={"/artists"} />
            </Fragment>
          )}
          {/* <Header /> */}
          <Container maxWidth='md'>
            <Fragment>
              <ProfileInfo profile={profile} auth={auth} />
              <br />
              {!isMobile ? (
                <Container maxWidth='md'>
                  <ProfileCarousel profile={profile} />
                </Container>
              ) : (
                <ProfileCarousel profile={profile} />
              )}
              <br />
              <br />
              <Review profile={profile} />
            </Fragment>
          </Container>
        </Fragment>
      )}
      <div>
        {profile === null ||
        (!loading &&
          auth.isAuthenticated &&
          auth.loading === false &&
          auth.user._id === profile.user._id) ? (
          isMobile ? (
            "<BottomNavabar />"
          ) : null
        ) : (
          <ContactButton profile={profile} location={auth.currentLocation} />
        )}
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  navbar: PropTypes.object.isRequired,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  navbar: state.navbar
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
