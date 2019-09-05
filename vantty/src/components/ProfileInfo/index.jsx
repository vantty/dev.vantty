import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Material-UI
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import { Typography, Toolbar } from "@material-ui/core";
import Star from "@material-ui/icons/StarRateOutlined";

// Styles
import styles from "./styles";
import { isMobile } from "react-device-detect";

const ProfileInfo = ({
  auth,
  profile: { user, location, profilePicture, bio, profession, loading },

  classes,
  ...rest
}) => {
  return (
    <div>
      <div>
        <div className={classes.profile}>
          <Grid container justify='center' alignItems='center'>
            {isMobile ? (
              <Avatar
                src={profilePicture}
                className={classes.bigAvatar}
                style={{ marginTop: "-10px" }}
              />
            ) : (
              <Avatar src={profilePicture} className={classes.bigAvatar} />
            )}
          </Grid>

          <div>
            <h1 className={classes.name}>
              {user.local.firstName} {user.local.lastName}
            </h1>
            <br />
            <h3 className={classes.subTitle}>{profession}</h3>
            <br />
            <br />
            <h3 className={classes.description}>{bio}</h3>
            <br />
            <p>{location && <span>{location.city}</span>}</p>
            <div style={{ display: "inline-block" }}>
              {/* <Toolbar>
                <Typography
                  type='title'
                  color='inherit'
                  style={{
                    borderRight: "0.1em solid black",
                    padding: "0.5em",
                    display: "block"
                  }}
                >
                  trew rew
                </Typography>

                <Typography
                  type='title'
                  color='inherit'
                  style={{ padding: "0.5em" }}
                >
                  <Star style={{ color: "#fdd835" }} />
                  hello
                </Typography>
              </Toolbar> */}
            </div>
            <Grid>
              <Fragment>
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === user._id && (
                    <Button
                      component={Link}
                      variant='contained'
                      color='primary'
                      className={classes.button}
                      to='/edit-profile'
                    >
                      Edit Profile
                    </Button>
                  )}
              </Fragment>
              <Fragment />
            </Grid>
          </div>
        </div>

        <Divider variant='middle' />
      </div>
    </div>
  );
};

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object,
  auth: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileInfo);
