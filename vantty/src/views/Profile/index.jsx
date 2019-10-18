import React, { Fragment, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
// Components
import { Header } from "../../components/";
import { Review, Slider } from "./components";

//Components inside
import { ProfileCarousel, ProfileInfo, ContactButton } from "./components";

// Actions
import { getProfileById } from "../../actions/profile";
// Material-UI
import {CssBaseline,Container} from "@material-ui/core";
import Progress from "@material-ui/core/LinearProgress";
import { SimpleAppBar } from "../../components";
import { BottomNavbar } from "../../layout/Main/components";

const useStyles = makeStyles(theme => ({
  mainGrid: {
    [theme.breakpoints.down("sm", "xs")]: {
      marginBottom: theme.spacing(7)
    }
  },

  sticky: {
    position: "-webkit-sticky" /* Safari */,
    position: "sticky",
    top: "0"
  },
  progress: {
    margin: "1rem"
  }
}));

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  auth: { user },
  match,
  history
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  // const handleBack = () => {
  //   history.goBack();
  // };

  const classes = useStyles();
  
  return (
    <Fragment>
      {isMobile && (
        <Fragment>
          <SimpleAppBar path={"/search"} />
        </Fragment>
      )}
      {!profile ? (
        <Progress className={classes.progress} />
      ) : (
        <Fragment>
          <Container maxWidth='md'>
            {/* <main> */}
            <Grid container spacing={1} className={classes.mainGrid}>
              {/* Main content */}
              <Fragment>
                {/* <Wait on='sidebar' fallback={<Progress />}> */}
                <CssBaseline />
                {profile === null || loading ? (
                  <Progress />
                ) : (
                  <Fragment>
                    <Grid item xs={12} md={8}>
                      <Header />

                      <Fragment>
                        <ProfileInfo profile={profile} auth={auth} />
                        <br />

                        <ProfileCarousel profile={profile} />

                        <br />
                        <br />
                        <Review profile={profile} />
                      </Fragment>
                    </Grid>
                    <Hidden smDown>
                      <Grid item md={4}>
                        <div className={classes.sticky}>
                          <Slider
                            profile={profile}
                            disabled={user && user._id === profile.user._id}
                          />
                        </div>
                      </Grid>
                    </Hidden>
                  </Fragment>
                )}
              </Fragment>
              {/* End main content */}
            </Grid>
            {/* </main> */}
          </Container>
          <div>
            {profile === null ||
            (!loading &&
              auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id) ? (
              isMobile ? (
                <BottomNavbar />
              ) : null
            ) : (
              isMobile && (
                <ContactButton
                  profile={profile}
                  location={auth.currentLocation}
                />
              )
            )}
          </div>
        </Fragment>
      )}
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
