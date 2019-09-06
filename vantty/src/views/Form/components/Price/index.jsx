import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//Actions
import { getCurrentProfile, createProfile } from "../../../../actions/profile";

//Components
import { FormBottomNav, ImagesUploader } from "../../../../components";

// Externals
import PropTypes from "prop-types";

// Material components

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  Avatar,
  Typography,
  Slider
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import LinkMui from "@material-ui/core/Link";
import Progress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

const useStyles = makeStyles(theme => ({
  root: {}
}));

const Price = ({
  profile: { profile, loading },
  // handleChange,
  createProfile,
  nextStep,
  prevStep,
  step,
  match,
  getCurrentProfile,
  className,
  history
}) => {
  const [formData, setFormData] = useState({
    price: 60
  });
  useEffect(() => {
    getCurrentProfile();
    setFormData({
      price: loading || !profile.price ? "" : profile.price
    });
  }, [loading, getCurrentProfile]);

  const { price } = formData;

  const continues = e => {
    e.preventDefault();
    nextStep();
  };

  const back = e => {
    e.preventDefault();
    prevStep();
  };
  const handleChange = (event, price) => {
    setFormData({ price });
  };
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
    nextStep();
  };
  const onSubmitPrice = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  const classes = useStyles();
  return (
    <Fragment>
      <Fragment>
        <Card className={clsx(classes.root, className)}>
          {profile ? (
            <form autoComplete='off' noValidate>
              <CardHeader
                subheader='from what value do your services start'
                title='Price'
              />
              <Divider />
              <CardContent className={classes.content}>
                <div>
                  <div>
                    <Typography
                      className={classes.locationText}
                      color='textSecondary'
                      variant='body1'
                    >
                      {price}
                    </Typography>
                    <Fragment>
                      <PrettoSlider
                        defaultValue={60}
                        valueLabelDisplay='on'
                        max={500}
                        step={10}
                        disabled={false}
                        value={price}
                        name='price'
                        // onChange={e => onChange(e)}
                        onChange={handleChange}
                        // handleDragStop={price}
                      />
                    </Fragment>
                  </div>
                </div>
              </CardContent>
              <Divider />
              <CardActions>
                <LinkMui component={Link} to='/'>
                  learn how to build the best profile
                </LinkMui>
              </CardActions>
            </form>
          ) : (
            <Progress />
          )}
        </Card>
      </Fragment>
      <Fragment>
        <FormBottomNav
          step={step}
          Children={
            <div>
              <div>
                {match.url === "/price" ? (
                  <Fragment>
                    <Button component={Link} to='/dashboard'>
                      Back
                    </Button>
                    <Button
                      component={Link}
                      to='/dashboard'
                      style={{ backgroundColor: "#f5f5" }}
                      onClick={e => onSubmitPrice(e)}
                    >
                      Update
                    </Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Button onClick={back}>Back</Button>
                    <Button
                      style={{ backgroundColor: "#f5f5" }}
                      onClick={e => onSubmit(e)}
                    >
                      Next
                    </Button>
                  </Fragment>
                )}
              </div>
            </div>
          }
        />
      </Fragment>
    </Fragment>
  );
};

Price.propTypes = {
  className: PropTypes.string,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(Price));
