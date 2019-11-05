import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//Actions
import { getCurrentProfile, createProfile } from "../../../../actions/profile";

//Components
import { FormBottomNav } from "../ComponentsForm";

import { isMobile } from "react-device-detect";

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
  Typography,
  Slider,
  Container
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Progress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

import { Services, StartService } from "./components";

const PrettoSlider = withStyles(theme => ({
  root: {
    color: theme.palette.purpleVantty.light,
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
}))(Slider);

const useStyles = makeStyles(theme => ({
  root: {},
  button: {
    float: "right",
    color: "white",
    boxShadow: "none",
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.greenVantty.light
    }
  }
}));

const Price = ({
  profile: { profile, loading },
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

  // const continues = e => {
  //   e.preventDefault();
  //   nextStep();
  // };

  const back = e => {
    e.preventDefault();
    prevStep();
  };
  const handleChange = (event, price) => {
    setFormData({ price });
  };
  const onSubmit = e => {
    e.preventDefault();
    createProfile({ price }, history, true);
    nextStep();
  };
  const onSubmitPrice = e => {
    e.preventDefault();
    createProfile({ price }, history, true);
  };

  const classes = useStyles();
  return (
    <Fragment>
      <Fragment>
        <Card className={clsx(classes.root, className)}>
          {profile ? (
            <form autoComplete='off' noValidate>
              <CardHeader
                // subheader='from what value do your services start'
                title='Price'
              />
              {/* <Divider /> */}
              <CardContent className={classes.content}>
                {/* <StartService price={price} handleChange={handleChange} /> */}
                <Services />
              </CardContent>
              {match.url === "/price" && !isMobile && (
                <Fragment>
                  <Divider />
                  <CardActions>
                    <Grid
                      container
                      direction='row'
                      justify='flex-end'
                      alignItems='flex-start'
                    >
                      <Button
                        className={classes.button}
                        onClick={e => onSubmitPrice(e)}
                      >
                        Update
                      </Button>
                    </Grid>
                  </CardActions>
                </Fragment>
              )}
            </form>
          ) : (
            <Progress />
          )}
        </Card>
      </Fragment>
      <Fragment>
        {match.url === "/create-profile" ? (
          <FormBottomNav
            step={step}
            Children={
              <div>
                <div>
                  {match.url === "/price" ? (
                    <Fragment>
                      <Button component={Link} to='/settings'>
                        Back
                      </Button>
                      <Button
                        component={Link}
                        to='/settings'
                        className={classes.button}
                        onClick={e => onSubmitPrice(e)}
                      >
                        Update
                      </Button>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Button onClick={back}>Back</Button>
                      <Button
                        className={classes.button}
                        onClick={e => onSubmit(e)}
                        disabled={!price}
                      >
                        Next
                      </Button>
                    </Fragment>
                  )}
                </div>
              </div>
            }
          />
        ) : null}

        {match.url === "/price" && isMobile ? (
          <FormBottomNav
            step={step}
            Children={
              <div>
                <div>
                  <Fragment>
                    <Button component={Link} to='/settings'>
                      Back
                    </Button>
                    <Button
                      component={Link}
                      to='/settings'
                      className={classes.button}
                      onClick={e => onSubmitPrice(e)}
                    >
                      Update
                    </Button>
                  </Fragment>
                </div>
              </div>
            }
          />
        ) : null}
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
