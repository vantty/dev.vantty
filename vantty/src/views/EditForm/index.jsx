import React, { useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//actions
import { getCurrentProfile } from "../../actions/profile";

//Material-UI
import CssBaseline from "@material-ui/core/CssBaseline";
import { Box, Grid, Hidden } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { Container } from "@material-ui/core";

import { Alert, SimpleAppBar, Header } from "../../components";
import { isMobile } from "react-device-detect";
import Settings from "../../views/Settings";

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
  }
}));

const EditForm = ({
  profile: { profile, loading },
  auth: { user },
  Children,
  children,
  match,
  page,
  title,
  auth,
  index
}) => {
  const classes = useStyles();
  useEffect(() => {
    // getCurrentProfile(profile ? isOwner(auth, profile.user._id) : true);
  }, []);
  return (
    <Fragment>
      <CssBaseline />
      <Header />
      {/* <div> {isMobile && <AppBarForm step={null} />}</div> */}
      {isMobile && (
        <SimpleAppBar
          path={
            match.url === "/bookings" || match.url === "/bank"
              ? "/settings"
              : "/settings/profile"
          }
        />
      )}
      <Fragment>
        <Fragment>
          <Alert />
        </Fragment>
        {/* {user ? ( */}
        <Box pt={3} pb={11}>
          <div className={classes.root}>
            <Grid container>
              <Hidden xsDown>
                <Grid item lg={4} md={4} xs={4}>
                  <Container maxWidth='md'>
                    <Settings match={match} />
                  </Container>
                </Grid>
              </Hidden>
              <Grid item lg={8} md={8} xl={8} xs={12} sm={8}>
                <Fragment>{Children}</Fragment>
                <Fragment>{children}</Fragment>
              </Grid>
            </Grid>
          </div>
        </Box>
        {/* ) : ( */}
        {/* <Progress /> */}
        {/* )} */}
      </Fragment>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, { getCurrentProfile })(
  withRouter(EditForm)
);
