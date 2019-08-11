import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import Progress from "@material-ui/core/LinearProgress";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import DashboardActions from "../dashboard/DashboardActions";
import Education from "./Education";
import Navbar from "../../components/Navbar";
import BottomNavabar from "../../components/BottomNavbar";

//Material-ui
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const classes = useStyles();

  function name(user) {
    if (user && user.hasOwnProperty("google")) {
      return user.google.firstName;
    } else if (user && user.hasOwnProperty("local")) {
      return user.local.firstName;
    } else if (user && user.user.hasOwnProperty("facebook")) {
      return user.facebook.firstName;
    } else {
      return null;
    }
  }

  return loading && profile === null ? (
    <Progress />
  ) : (
    <Fragment>
      {!isMobile ? <Navbar /> : <BottomNavabar />}
      <Container>
        <CssBaseline />
        <Fragment>
          <Typography variant='h4' gutterBottom>
            Dashboard
          </Typography>
          <Typography variant='h5'>Welcome {name(user)}</Typography>

          {profile !== null ? (
            <Fragment>
              <Link to={`/profile/artist/${profile.user._id}`}>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.button}
                >
                  Profile
                </Button>
              </Link>
              <DashboardActions />
              <Education education={profile.education} />
              <Link to='/login'>
                <Button
                  variant='contained'
                  color='secondary'
                  className={classes.button}
                  onClick={() => deleteAccount()}
                >
                  Delete My Account
                </Button>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Typography>Do you want to become an Artists?</Typography>
              <Button variant='contained' color='secondary'>
                <Link to='/create-profile'>Create Profile</Link>
              </Button>
            </Fragment>
          )}
        </Fragment>
      </Container>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
