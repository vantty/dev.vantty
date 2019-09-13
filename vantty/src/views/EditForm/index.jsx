import React, { useEffect, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Components
import AppBarForm from "../../components/ComponentsForm/AppBar";

//actions
import { getCurrentProfile } from "../../actions/profile";

//Material-UI
import CssBaseline from "@material-ui/core/CssBaseline";
import { Box, Grid } from "@material-ui/core";
import Progress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";

import { Container } from "@material-ui/core";

// Component styles
const useStyles = makeStyles(theme => ({
  root: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
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
  match
}) => {
  const classes = useStyles();
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return (
    <Fragment>
      <CssBaseline />
      <div>
        <AppBarForm step={null} />
      </div>
      {match.url === "/personal-info" ? (
        <Box pt={11} pb={11}>
          <div className={classes.root}>
            <Grid container spacing={4}>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <Container maxWidth='md'>
                  <Fragment>{Children}</Fragment>
                </Container>
              </Grid>
            </Grid>
          </div>
        </Box>
      ) : profile ? (
        <Box pt={11} pb={11}>
          <div className={classes.root}>
            <Grid container spacing={4}>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <Container maxWidth='md'>
                  <Fragment>{Children}</Fragment>
                </Container>
              </Grid>
            </Grid>
          </div>
        </Box>
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
