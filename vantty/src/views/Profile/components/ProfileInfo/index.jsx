import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Helpers
import { getStrategyName, getInitials, isOwner } from "../../../../helpers";

// Material-UI
import VerifiedIcon from "@material-ui/icons/VerifiedUserRounded";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import { Typography, Toolbar, IconButton, Icon } from "@material-ui/core";
import Star from "@material-ui/icons/StarRateOutlined";

// Styles
import styles from "./styles";
import { isMobile } from "react-device-detect";
// import AvatarUploader from "../../../../components/AvatarUploader";

const ProfileInfo = ({
  auth,
  profile: {
    user,
    city,
    profilePicture,
    bio,
    profession,
    name,
    categories,
    loading,
    verified
  },

  classes,
  ...rest
}) => {
  return (
    <div>
      <div>
        <div className={classes.profile}>
          <Grid container justify='center' alignItems='center'>
            {profilePicture ? (
              isMobile ? (
                <Avatar src={profilePicture} className={classes.bigAvatar} />
              ) : (
                <Avatar src={profilePicture} className={classes.bigAvatar} />
              )
            ) : (
              <Avatar className={classes.bigAvatar} src={""}>
                {user && getInitials(name.firstName)}
              </Avatar>
            )}
          </Grid>

          <div>
            <h1 className={classes.name}>
              {`${name.firstName} ${name.lastName}`}
            </h1>
            <br />

            <h3 className={classes.subTitle}>{profession}</h3>
            {verified && (
              <span>{<VerifiedIcon className={classes.verifiedIcon} />}</span>
            )}
            <br />
            <h5 className={classes.subSubTitle}>
              {categories.makeup.join(" | ")}
            </h5>
            <br />
            <br />
            <h3 className={classes.description}>{bio}</h3>
            <br />
            <p>{<span>{city}</span>}</p>
            <div style={{ display: "inline-block" }}></div>
            <Grid>
              <Fragment>
                {isOwner(auth, user._id) === true && (
                  <Button
                    component={Link}
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    to={isMobile ? "/settings" : "/personal-info"}
                  >
                    settings
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

{
  /* <Toolbar>
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
              </Toolbar> */
}
