import React, { useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Progress from "@material-ui/core/LinearProgress";
import { AccountProfile, AccountDetails } from "./components";

// Actions
import { getCurrentProfile } from "../../actions/profile";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
  ...rest
}) => {
  const state = { tabIndex: 0 };
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {profile ? (
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <AccountProfile />
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <AccountDetails />
          </Grid>
        </Grid>
      ) : (
        <Progress />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Account);
