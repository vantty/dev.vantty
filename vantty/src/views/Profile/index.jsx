import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

// Components
import {
  Review,
  Slider,
  MessageVerified,
  ContactBook,
  ProfileCarousel,
  ProfileInfo
} from "./components";
import { SimpleAppBar } from "../../components";
import { BottomNavbar } from "../../layout/Main/components";

// Actions
import { getProfileById, loadService } from "../../actions/profile";
import { getImagesById } from "../../actions/uploader";

// Material-UI
import {
  CssBaseline,
  Container,
  Grid,
  Hidden,
  LinearProgress as Progress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Helpers
import { isOwner } from "../../helpers";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2)
  },
  mainGrid: {
    [theme.breakpoints.down("sm", "xs")]: {
      marginBottom: theme.spacing(7)
    }
  },
  sticky: {
    // position: "-webkit-sticky" /* Safari */,
    position: "sticky", //it must keep here
    top: "0"
  },
  grid: {
    marginBottom: theme.spacing(3)
  }
}));

const Profile = ({
  getProfileById,
  profile: { profile, loading, services },
  uploader: { images },
  getImagesById,
  auth,
  auth: { user },
  match,
  history,
  loadService
}) => {
  useEffect(() => {
    getProfileById(match.params.id || (services && services.id));
    getImagesById(match.params.id || (services && services.id));
  }, [getProfileById, match.params.id]);

  const [state, setState] = useState({
    id: match.params.id
  });

  const onChangeDate = value => {
    setState({
      ...state,
      ...value
    });
  };

  const classes = useStyles();

  return (
    <Fragment>
      {(!profile && !images) ||
      profile === null ||
      loading ||
      !images ||
      auth.loading ? (
        <Progress />
      ) : (
        <Fragment>
          {isMobile && (
            <Fragment>
              <SimpleAppBar
                path={"/search"}
                owner={
                  isOwner(auth, user && user._id) === true &&
                  profile &&
                  profile.user === auth.user._id &&
                  isMobile &&
                  "/settings"
                }
              />
            </Fragment>
          )}
          <Container maxWidth="md" className={classes.container}>
            <Grid container spacing={1} className={classes.mainGrid}>
              <Fragment>
                <CssBaseline />
                <Fragment>
                  {isOwner(auth, user && user._id) === true &&
                    profile &&
                    profile.user === auth.user._id &&
                    profile.mobileNumber &&
                    !profile.verified && <MessageVerified profile={profile} />}
                  <Grid item xs={12} md={8} sm={10}>
                    <div>
                      <ProfileInfo profile={profile} auth={auth} />
                    </div>
                    <div className={classes.grid}>
                      <ProfileCarousel images={images} />
                    </div>
                    <div className={classes.grid}>
                      <Review profile={profile} />
                    </div>
                  </Grid>
                  <Hidden smDown>
                    <Grid item md={4}>
                      <div className={classes.sticky}>
                        <Slider
                          profile={profile}
                          verified={profile.verified}
                          disabled={user && user._id === profile.user}
                          user={user && user}
                          loadService={loadService}
                          onChangeDate={onChangeDate}
                          state={state}
                          owner={isOwner(auth, profile.user)}
                        />
                      </div>
                    </Grid>
                  </Hidden>
                </Fragment>
              </Fragment>
            </Grid>
          </Container>
          <div>
            {profile === null ||
            (!loading &&
              auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user) ? (
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
