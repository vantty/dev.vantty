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
  Slider,
  Container
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
                subheader='from what value do your services start'
                title='Price'
              />
              <Divider />
              <CardContent className={classes.content}>
                <div>
                  <div>
                    <Container>
                      <Typography color='textSecondary' variant='body1'>
                        This is the minimum price for which you provide a
                        service but you define the final price with the customer
                      </Typography>
                      <br />
                      <br />
                      <br />
                      <Fragment>
                        <Grid
                          container
                          direction='row'
                          justify='center'
                          alignItems='center'
                        >
                          <Grid item xs={8}>
                            <PrettoSlider
                              defaultValue={60}
                              valueLabelDisplay='on'
                              max={500}
                              step={10}
                              disabled={false}
                              value={price || 80}
                              name='price'
                              // onChange={e => onChange(e)}
                              onChange={handleChange}
                              handleDragStop={price}
                            />
                            <br />
                            <br />
                            <Typography
                              // className={classes.locationText}
                              // color='textSecondary'
                              variant='body1'
                            >
                              I provide a service minimum for{" "}
                              <strong>${price}</strong>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Fragment>
                    </Container>
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
