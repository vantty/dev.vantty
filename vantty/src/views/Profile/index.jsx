import React, { Fragment, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
// Components
import { Header } from "../../components/";
import { Review, Slider, MessageVerified, ContactBook } from "./components";

//Components inside
import { ProfileCarousel, ProfileInfo, ContactButton } from "./components";

// Actions
import { getProfileById } from "../../actions/profile";
import { loadService } from "../../actions/pay";
// Material-UI
import { CssBaseline, Container } from "@material-ui/core";
import Progress from "@material-ui/core/LinearProgress";
import { SimpleAppBar } from "../../components";
import { BottomNavbar } from "../../layout/Main/components";
import { getImagesById } from "../../actions/uploader";
import { isOwner } from "../../helpers";
const log = console.log;

const useStyles = makeStyles(theme => ({
  mainGrid: {
    [theme.breakpoints.down("sm", "xs")]: {
      marginBottom: theme.spacing(7)
    }
  },
  sticky: {
    position: "-webkit-sticky" /* Safari */,
    position: "sticky", //it must keep here
    top: "0"
  },
  progress: {
    margin: "1rem"
  }
}));

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  uploader: { images },
  getImagesById,
  auth,
  auth: { user },
  pay: { services },
  match,
  history,
  loadService
}) => {
  useEffect(() => {
    getProfileById(match.params.id || (services && services.id));
    getImagesById(match.params.id || (services && services.id));
  }, [getProfileById, match.params.id]);

  // const handleBack = () => {
  //   history.goBack();
  // };

  const [state, setState] = useState({
    id: match.params.id
  });

  const onChangeDate = value => {
    // e.preventDefault();

    setState({
      ...state,
      ...value
      // [e.target.name]: e.target.value
    });
  };
  log(state);

  // const onChange = value => event => {
  //   if (event.target.checked) {
  //     setState({
  //       ...state,
  //       services: {
  //         [event.target.name]: { type: event.target.value, amount: value }
  //       }
  //     });
  //   } else {
  //     delete state[event.target.name];
  //   }
  // };

  const classes = useStyles();

  return (
    <Fragment>
      {isMobile && (
        <Fragment>
          <SimpleAppBar
            path={"/search"}
            // path={history}
            owner={
              isOwner(auth, user && user._id) === true &&
              profile &&
              profile.user._id === auth.user._id &&
              isMobile &&
              "/settings"
            }
          />
        </Fragment>
      )}

      {(!profile && !images) || profile === null || loading || !images ? (
        // {(!profile && !images) || profile === null || loading ? (
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
                {/* {profile === null || loading || !images ? ( */}
                {/* <Progress />) : ( */}
                <Fragment>
                  {isOwner(auth, user && user._id) === true &&
                    profile &&
                    profile.user._id === auth.user._id &&
                    profile.mobileNumber &&
                    !profile.verified && <MessageVerified profile={profile} />}
                  <Grid item xs={12} md={8} sm={10}>
                    <Header />

                    <Fragment>
                      <ProfileInfo profile={profile} auth={auth} />
                      <br />
                      {/* {images ? (
                        <ProfileCarousel profile={profile} images={images} />
                      ) : (
                        <Progress className={classes.progress} />
                      )} */}
                      <ProfileCarousel
                        // profile={profile}
                        images={images}
                      />

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
                          verified={profile.verified}
                          disabled={user && user._id === profile.user._id}
                          user={user}
                          // onChange={onChange}
                          loadService={loadService}
                          onChangeDate={onChangeDate}
                          state={state}
                          owner={isOwner(auth, user)}
                        />
                      </div>
                    </Grid>
                  </Hidden>
                </Fragment>
                {/* )} */}
              </Fragment>
              {/* End main content */}
            </Grid>
            {/* </main> */}
          </Container>
          <div>
            {/* {profile === null ||
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
            )} */}
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
                <ContactBook
                  profile={profile}
                  onChangeDate={onChangeDate}
                  state={state}
                  loadService={loadService}
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
  getImagesById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  navbar: PropTypes.object.isRequired,
  history: PropTypes.object,
  uploader: PropTypes.object.isRequired,
  pay: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  navbar: state.navbar,
  uploader: state.uploader,
  pay: state.pay
});

export default connect(mapStateToProps, {
  getProfileById,
  getImagesById,
  loadService
})(Profile);
