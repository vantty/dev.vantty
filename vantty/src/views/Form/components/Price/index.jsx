import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//Actions
import {
  getCurrentProfile,
  createProfile,
  addService,
  deleteService
} from "../../../../actions/profile";

//Components
import { FormBottomNav, CustomPaper } from "../ComponentsForm";

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

import { Form, ServiceCard, StartService } from "./components";
import { getStrategy } from "../../../../helpers";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "0"
  },
  button: {
    float: "right",
    color: "white",
    boxShadow: "none",
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.greenVantty.light
    }
  },
  content: {
    padding: "1rem"
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
  history,
  addService,
  deleteService
}) => {
  const [formData, setFormData] = useState({
    price: 60
  });
  const [serviceData, setServiceData] = useState({
    typeOfService: "",
    amount: "",
    description: ""
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      price: loading || !profile.price ? "" : profile.price
    });
    // setServiceData({
    //   typeOfService:
    //     loading || !profile.service.typeOfService ? "" : profile.typeOfService
    //   // amount: loading || !profile.service ? "" : profile.amount,
    //   // description: loading || !profile.service ? "" : profile.description
    // });
  }, [loading, getCurrentProfile]);

  const onChange = e =>
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });

  const { price } = formData;
  const { typeOfService, amount, description } = serviceData;

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
    createProfile({ services: serviceData }, history, true);
    createProfile({ price: price }, history, true);
    nextStep();
  };

  const onSubmitStartCost = e => {
    e.preventDefault();
    createProfile({ price: price }, history, true);
  };
  const onSubmitPrice = e => {
    e.preventDefault();
    addService({ typeOfService, amount, description }, history, true);
  };

  const deleteServiceFunction = (e, id) => {
    e.preventDefault();
    deleteService(id);
  };

  const classes = useStyles();
  return (
    <Fragment>
      <CustomPaper
        Children={
          <Fragment>
            {profile ? (
              <form autoComplete='off' noValidate>
                {/* <Divider /> */}

                <StartService price={price} handleChange={handleChange} />
                <Form
                  serviceData={serviceData}
                  onChange={onChange}
                  onSubmit={onSubmitPrice}
                  services={profile.services}
                />
                <Divider />
                <br />
                <CardHeader
                  // subheader='from what value do your services start'
                  title='Services'
                />
                <ServiceCard
                  services={profile.services}
                  deleteService={deleteServiceFunction}
                />

                {/* <ServiceForm /> */}

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
          </Fragment>
        }
      />
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
                        // disabled={!price}
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
                      // component={Link}
                      // to='/settings'
                      className={classes.button}
                      // onClick={e => onSubmitPrice(e)}
                      onClick={e => onSubmitStartCost(e)}
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
  addService: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  addService,
  deleteService
})(withRouter(Price));
