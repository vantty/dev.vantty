import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

//Helpers
import { getInitials, isOwner } from "../../../../helpers";

// Material-UI
import VerifiedIcon from "@material-ui/icons/VerifiedUserRounded";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

// Styles
import styles from "./styles";

const ProfileInfo = ({
  auth,
  profile: {
    user,
    city,
    profileImage,
    bio,
    profession,
    name,
    categories,
    verified
  },
  classes
}) => {
  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        {profileImage ? (
          <Avatar src={profileImage} className={classes.avatar} />
        ) : (
          <Avatar className={classes.avatar} src={""}>
            {user && getInitials(name.firstName)}
          </Avatar>
        )}
      </Grid>
      <Typography variant="h2" className={classes.name}>
        {`${name.firstName} ${name.lastName}`}
        {verified && <VerifiedIcon className={classes.verifiedIcon} />}
      </Typography>
      <h3 className={classes.subTitle}>{profession}</h3>
      <br />
      <h5 className={classes.subSubTitle}>{`${categories.makeup.join(
        " | "
      )} | ${categories.hair.join(" | ")}`}</h5>
      <h3 className={classes.description}>{bio}</h3>
      <p>{<span>{city}</span>}</p>
      <div style={{ display: "inline-block" }}></div>
      <Grid>
        {isOwner(auth, user) === true && user === auth.user._id && !isMobile && (
          <Button
            component={Link}
            variant="outlined"
            size="small"
            className={classes.button}
            to={"/personal-info"}
          >
            Settings
          </Button>
        )}
      </Grid>

      <Divider variant="middle" />
    </div>
  );
};

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object,
  auth: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileInfo);
