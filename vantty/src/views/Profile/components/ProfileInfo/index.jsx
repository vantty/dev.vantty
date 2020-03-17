import React from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";

// Styles
const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center"
  },
  avatar: {
    margin: 10,
    width: 90,
    height: 90,
    fontWeight: "bold",
    fontSize: "35px",
    backgroundColor: theme.palette.greenVantty.main
  },
  verifiedIcon: {
    color: "rgb(0, 223, 212)",
    marginLeft: "0.3rem",
    marginBottom: "-0.3rem",
    width: "1rem"
  },
  button: {
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
  },
  city: {
    marginBottom: theme.spacing(3)
  }
}));

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
  }
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center" spacing={3}>
        {profileImage ? (
          <Avatar src={profileImage} className={classes.avatar} />
        ) : (
          <Avatar className={classes.avatar} src={""}>
            {user && getInitials(name.firstName)}
          </Avatar>
        )}
        <Grid item xs={12}>
          <Typography variant="h2">
            {`${name.firstName} ${name.lastName}`}
            {verified && <VerifiedIcon className={classes.verifiedIcon} />}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">{profession}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">{`${categories.makeup.join(
            " | "
          )} | ${categories.hair.join(" | ")}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{bio}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.city}>
          <Typography variant="h6">{city}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {isOwner(auth, user) === true && user === auth.user._id && !isMobile && (
          <Button
            component={Link}
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SettingsIcon />}
            to={"/personal-info"}
          >
            Settings
          </Button>
        )}
      </Grid>
    </div>
  );
};

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object,
  auth: PropTypes.object.isRequired
};

export default ProfileInfo;
