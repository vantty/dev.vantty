import React, { useEffect, Fragment, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Components
import AppBarForm from "../../components/ComponentsForm/AppBar";

//actions
import { getCurrentProfile } from "../../actions/profile";

//Material-UI
import CssBaseline from "@material-ui/core/CssBaseline";
import { Box, Grid, Hidden } from "@material-ui/core";
import Progress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";

import { Container } from "@material-ui/core";
import { Table } from "./components";
import { isOwner } from "../../helpers";

// Component styles
const useStyles = makeStyles(theme => ({
  root: {
    width: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(13),
      marginBottom: theme.spacing(12),
      padding: theme.spacing(1)
    }
  }
}));

const EditForm = ({
  profile: { profile, loading },
  auth: { user },
  getCurrentProfile,
  Children,
  match,
  page,
  title,
  auth,
  index
}) => {
  const [state, setState] = useState();

  const shoot = (e, own) => (e, own) => {
    e.preventDefault();
    setState(own);
    console.log(own);
  };

  const classes = useStyles();
  useEffect(() => {
    getCurrentProfile(profile ? isOwner(auth, profile.user._id) : true);
    // getCurrentProfile();
  }, []);
  return (
    <Fragment>
      <CssBaseline />
      <div>
        <AppBarForm step={null} />
      </div>
      {match.url === "/personal-info" ? (
        user ? (
          <Box pt={11} pb={11}>
            <div className={classes.root}>
              <Grid container>
                <Hidden xsDown>
                  <Grid item lg={4} md={4} xs={4}>
                    <Table page={page} title={title} match={match} />
                  </Grid>
                </Hidden>
                <Grid item lg={8} md={8} xl={8} xs={12} sm={8}>
                  <Fragment>{Children}</Fragment>
                </Grid>
              </Grid>
            </div>
          </Box>
        ) : (
          <Progress />
        )
      ) : profile ? (
        <Fragment>
          <Container maxWidth='md'>
            <Box pt={11} pb={11}>
              <div className={classes.root}>
                <Grid container>
                  <Hidden xsDown>
                    <Grid item lg={4} md={4} xs={4}>
                      <Table page={page} title={title} match={match} />
                    </Grid>
                  </Hidden>
                  <Grid item lg={8} md={8} xl={8} xs={12} sm={8}>
                    <Fragment>{Children}</Fragment>
                  </Grid>
                </Grid>
              </div>
            </Box>
          </Container>
        </Fragment>
      ) : (
        <Progress />
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(withRouter(EditForm));
