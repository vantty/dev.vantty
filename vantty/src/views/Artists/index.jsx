import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

import { isMobile } from "react-device-detect";

// Components
import ProfileCard from "../../components/ProfileCard";
import Navbar from "../../components/Navbar";
import BottomNavabar from "../../components/BottomNavbar";

// Actions
import { getProfiles } from "../../actions/profile";
import { changeNavbarValue } from "../../actions/navbar";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Progress from "@material-ui/core/LinearProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

const Artists = ({
  getProfiles,
  profile: { profiles, loading },
  changeNavbarValue
}) => {
  useEffect(() => {
    getProfiles();
    changeNavbarValue("artists");
  }, []);

  const classes = useStyles();

  return (
    <Fragment>
      {!isMobile ? <Navbar /> : <BottomNavabar />}
      <Fragment>
        {loading ? (
          <Progress />
        ) : (
          <Fragment>
            <CssBaseline />
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <Container>
                  <Grid item key={profile._id}>
                    <ProfileCard key={profile._id} profile={profile} />
                  </Grid>
                </Container>
              ))
            ) : (
              <Progress />
            )}
          </Fragment>
        )}
      </Fragment>
    </Fragment>
  );
};

Artists.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  changeNavbarValue: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles, changeNavbarValue }
)(Artists);
