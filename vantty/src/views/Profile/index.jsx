import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";

import Divider from "@material-ui/core/Divider";

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
import {
  CssBaseline,
  Container,
  Toolbar,
  AppBar,
  IconButton,
  Button
} from "@material-ui/core";
import LinkMui from "@material-ui/core/Link";
import Progress from "@material-ui/core/LinearProgress";
// import ArrowBack from "../../components/ArrowBack";
import MuiLink from "@material-ui/core/Link";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import { SimpleAppBar } from "../../components";
import { BottomNavbar } from "../../layout/Main/components";
import { isOwner } from "../../helpers";

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto"
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },

  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  },

  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0)
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.white
  },
  sidebarSection: {
    marginTop: theme.spacing(3)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  },
  sticky: {
    position: "-webkit-sticky" /* Safari */,
    position: "sticky",
    top: "0"
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
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  const handleBack = () => {
    history.goBack();
  };

  const classes = useStyles();

  return (
    <Fragment>
      <Container maxWidth='md'>
        <main>
          <Grid container spacing={1} className={classes.mainGrid}>
            {/* Main content */}
            <Fragment>
              <CssBaseline />
              {profile === null || loading ? (
                <Progress />
              ) : (
                <Fragment>
                  {isMobile && (
                    <Fragment>
                      <SimpleAppBar path={"/search"} />
                    </Fragment>
                  )}
                  <Grid item xs={12} md={8}>
                    <Header />
                    {/* <Container maxWidth='md'> */}
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
                    {/* </Container> */}
                  </Grid>
                  <Hidden smDown>
                    <Grid item md={4}>
                      <div className={classes.sticky}>
                        <Slider
                          profile={profile}
                          disabled={auth.user._id === profile.user._id}
                        />
                      </div>
                    </Grid>
                  </Hidden>
                  <div>
                    {profile === null ||
                      (!loading &&
                      auth.isAuthenticated &&
                      auth.loading === false &&
                      auth.user._id === profile.user._id
                        ? null
                        : null)}
                  </div>
                </Fragment>
              )}
            </Fragment>
            {/* End main content */}
          </Grid>
        </main>
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
            <ContactButton profile={profile} location={auth.currentLocation} />
          )
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
