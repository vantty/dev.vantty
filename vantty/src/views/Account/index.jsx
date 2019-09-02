import React, { useEffect } from "react";

// Externals
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Actions
import { getCurrentProfile } from "../../actions/profile";

// Material helpers
import { withStyles, Container } from "@material-ui/core";

// Material components
import { Grid } from "@material-ui/core";
import Progress from "@material-ui/core/LinearProgress";

// Shared layouts
import { Dashboard as DashboardLayout } from "../../layouts";

// Custom components
import { AccountDetails, AccountProfile } from "./components";

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  }
});

const Account = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
  classes,
  ...rest
}) => {
  const state = { tabIndex: 0 };
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <DashboardLayout title='Account'>
      <Container>
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
      </Container>
    </DashboardLayout>
  );
};

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(withStyles(styles)(Account));
