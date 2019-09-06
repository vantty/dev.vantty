import React, { useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from "@material-ui/core";

//helpers
import { getInitials, getStrategyName } from "../../../../helpers";

// Actions
import { getCurrentProfile } from "../../../../actions/profile";

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: "flex"
  },
  avatar: {
    marginLeft: "auto",
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = ({
  auth: { user, isAuthenticated },
  profile: { profile, loading },
  getCurrentProfile,
  history,
  className,
  // classes,
  ...rest
}) => {
  // const { className, ...rest } = props;

  useEffect(() => {
    getCurrentProfile();
  }, []);

  const classes = useStyles();

  // const user = {
  //   name: "Shen Zhi",
  //   city: "Los Angeles",
  //   country: "USA",
  //   timezone: "GTM-7",
  //   avatar: "/images/avatars/avatar_11.png"
  // };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant='h2'>
              {user && getStrategyName(user)}
            </Typography>
            <Typography
              className={classes.locationText}
              color='textSecondary'
              variant='body1'
            >
              {/* {user.city}, {user.country} */}
            </Typography>
            <Typography
              className={classes.dateText}
              color='textSecondary'
              variant='body1'
            >
              {moment().format("hh:mm A")}
              {/* ({user.timezone}) */}
            </Typography>
          </div>
          <Avatar className={classes.avatar} src={""}>
            {user && getInitials(getStrategyName(user))}
          </Avatar>
        </div>
        <div className={classes.progress}>
          <Typography variant='body1'>Profile Completeness: 70%</Typography>
          <LinearProgress value={70} variant='determinate' />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button className={classes.uploadButton} color='primary' variant='text'>
          Upload picture
        </Button>
        <Button variant='text'>Remove picture</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getStrategyName: PropTypes.func
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(withRouter(AccountProfile));
