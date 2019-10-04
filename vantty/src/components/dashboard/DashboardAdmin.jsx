import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import Progress from "@material-ui/core/LinearProgress";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import DashboardActions from "./DashboardActions";
import Education from "./Education";
import Navbar from "../Navbar";
import BottomNavabar from "../BottomNavbar";

//Helpers
import { getStrategyName } from "../../helpers";
import { Header } from "..";
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

const DashboardAdmin = ({
  getCurrentProfile,
  deleteAccount,
  number: { numberIsVerified, numberVerified },
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const classes = useStyles();

  return loading && profile === null ? (
    <Progress />
  ) : (
    <Fragment>
      {!isMobile ? <Navbar /> : <BottomNavabar />}
      <Header />
      <Container>
        <CssBaseline />
        <Fragment>
          <Typography variant='h4' gutterBottom>
            DashboardAdmin
          </Typography>
          <Typography variant='h5'>Welcome {getStrategyName(user)}</Typography>

          {profile !== null ? (
            <Fragment>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                to={`/profile/artist/${profile.user._id}`}
                component={Link}
              >
                Profile
              </Button>

              <DashboardActions />
              {/* <Education education={profile.education} /> */}
              <Button
                variant='contained'
                color='secondary'
                className={classes.button}
                onClick={() => deleteAccount(profile.elasticId)}
                to='/login'
                component={Link}
              >
                Delete My Account
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Typography>Do you want to become an Artists?</Typography>
              <Button
                variant='contained'
                color='secondary'
                to='/create-profile'
                component={Link}
              >
                Create Profile
              </Button>
              <Button
                variant='contained'
                color='secondary'
                to='/personal-info'
                component={Link}
              >
                Personal Info
              </Button>
            </Fragment>
          )}
        </Fragment>
      </Container>
    </Fragment>
  );
};

DashboardAdmin.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  number: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  number: state.number
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(DashboardAdmin);
