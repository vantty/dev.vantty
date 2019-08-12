import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

// Components
import Navbar from "../../components/Navbar";
import SettingsDrawer from "../../components/SettingsDrawer";
import ProfileInfo from "../../components/ProfileInfo";
import ProfileCarousel from "../../components/ProfileCarousel";
import ReviewCard from "../../components/ReviewCard";
import ConctactButton from "../../components/ContactButton";
import BottomNavabar from "../../components/BottomNavbar";

// Actions
import { getProfileById } from "../../actions/profile";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Container, Toolbar, AppBar } from "@material-ui/core";
import Progress from "@material-ui/core/LinearProgress";
import ArrowBack from "../../components/ArrowBack";

const useStyles = makeStyles(theme => ({
  buttonSetting: {
    float: "right"
  },
  input: {
    display: "none"
  },
  settings: {
    float: "right",
    fontSize: "26px",
    fontWeight: "ligther",
    marginTop: "1rem"
  },
  arrowBack: {
    float: "left",
    fontSize: "26px",
    fontWeight: "ligther",
    marginTop: "1rem"
  },
  appbar: {
    background: "transparent",
    boxShadow: "none",
    paddingRight: "-35%"
  }
}));

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(auth, match.params.id);
  }, [getProfileById, match.params.id]);

  const classes = useStyles();

  return (
    <Fragment>
      {!isMobile && <Navbar />}
      <Container maxWidth='md'>
        <CssBaseline />
        {profile === null || loading ? (
          <Progress />
        ) : (
          // <div>
          <Fragment>
            {isMobile ? (
              <AppBar
                position='static'
                color='default'
                className={classes.appbar}
              >
                <Toolbar>
                  <ArrowBack page={"/artists"} />{" "}
                  <div style={{ flexGrow: 1 }}>
                    {auth.isAuthenticated &&
                      auth.loading === false &&
                      auth.user._id === profile.user._id &&
                      (isMobile && <SettingsDrawer />)}
                  </div>
                </Toolbar>
              </AppBar>
            ) : (
              undefined
            )}

            <ProfileInfo profile={profile} auth={auth} />
            <br />
            <ProfileCarousel profile={profile} />
            <br />
            <ReviewCard profile={profile} />
          </Fragment>
        )}
      </Container>
      <div>
        {profile === null ||
        (!loading &&
          auth.isAuthenticated &&
          auth.loading === false &&
          auth.user._id === profile.user._id) ? (
          isMobile ? (
            <BottomNavabar />
          ) : (
            <Navbar />
          )
        ) : (
          <ConctactButton profile={profile} />
        )}
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  navbar: PropTypes.object.isRequired
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

{
  /* <Grid>
<h1>Education</h1>
{profile.education.length > 0 ? (
  <Fragment>
    {profile.education.map(education => (
      <ProfileEducation
        key={education._id}
        education={education}
      />
    ))}
  </Fragment>
) : (
  <h4>No Education</h4>
)}
</Grid> */
}
