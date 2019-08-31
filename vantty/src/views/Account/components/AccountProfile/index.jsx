import React, { useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Actions
import { getCurrentProfile } from "../../../../actions/profile";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Avatar, Typography, Button, LinearProgress } from "@material-ui/core";

// Shared components
import { Portlet, PortletContent, PortletFooter } from "../../../../components";

// Component styles
import styles from "./styles";

const AccountProfile = ({
  auth: { user, isAuthenticated },
  profile: { profile, loading },
  getCurrentProfile,
  history,
  className,
  classes,
  ...rest
}) => {
  const rootClassName = classNames(classes.root, className);

  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <Fragment>
      <Portlet {...rest} className={rootClassName}>
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant='h2'>
                {user && user.local.firstName}
              </Typography>
              <Typography className={classes.locationText} variant='body1'>
                {profile && profile.location.city}
              </Typography>
              <Typography className={classes.dateText} variant='body1'>
                4:32PM (GMT-4)
              </Typography>
            </div>

            <Avatar alt='' src={""} className={classes.avatar}>
              {user.local.firstName
                .split(" ")
                .map((n, i, a) => (i === 0 || i + 1 === a.length ? n[0] : null))
                .join("")
                .toUpperCase()}
            </Avatar>
          </div>
          <div className={classes.progressWrapper}>
            <Typography variant='body1'>Profile Completeness: 70%</Typography>
            <LinearProgress value={70} variant='determinate' />
          </div>
        </PortletContent>
        <PortletFooter>
          <Button
            className={classes.uploadButton}
            color='primary'
            variant='text'
          >
            Upload picture
          </Button>
          <Button variant='text'>Remove picture</Button>
        </PortletFooter>
      </Portlet>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

AccountProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(withStyles(styles)(withRouter(AccountProfile)));
