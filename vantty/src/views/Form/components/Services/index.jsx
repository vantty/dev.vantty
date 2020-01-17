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
  CardHeader,
  Divider,
  Button,
  CardActions,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Progress from "@material-ui/core/LinearProgress";

import { Form, ServiceCard, StartService } from "./components";

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
  const [availability, setAvailability] = useState("");

  useEffect(() => {
    // getCurrentProfile();

    setFormData({
      price: loading || !profile.price ? "" : profile.price
    });
  }, [loading, getCurrentProfile]);

  const onChange = e =>
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });

  const onChangeAvailability = e =>
    setAvailability({ ...availability, [e.target.name]: e.target.value });

  const { price } = formData;
  const { typeOfService, amount, description } = serviceData;

  const back = e => {
    e.preventDefault();
    prevStep();
  };

  const handleChange = (event, price) => {
    setFormData({ price });
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile({ price: price }, history, true);
    createProfile({ availability: availability }, history, true);
    nextStep();
  };

  const onSubmitAvailability = e => {
    e.preventDefault();
    console.log("222");
    createProfile(availability, history, true);
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
              <form autoComplete="off" noValidate>
                {/* <Divider /> */}

                <StartService price={price} handleChange={handleChange} />
                <Form
                  serviceData={serviceData}
                  onChange={onChange}
                  onSubmitPrice={onSubmitPrice}
                  services={profile.services}
                  availability={availability}
                  onChangeAvailability={onChangeAvailability}
                  onSubmitAvailability={onSubmitAvailability}
                />
                <Divider />

                <CardHeader
                  // subheader='from what value do your services start'
                  title="Services"
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
                        direction="row"
                        justify="flex-end"
                        alignItems="flex-start"
                      >
                        <Button
                          className={classes.button}
                          onClick={e => onSubmitStartCost(e)}
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
                      <Button component={Link} to="/settings/profile">
                        Back
                      </Button>
                      <Button
                        component={Link}
                        to="/settings/profile"
                        className={classes.button}
                        onClick={e => onSubmitAvailability(e)}
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
                        disabled={profile.services.length === 0}
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
                    <Button component={Link} to="/settings">
                      Back
                    </Button>
                    <Button
                      // component={Link}
                      // to='/settings'
                      className={classes.button}
                      // onClick={e => onSubmitPrice(e)}
                      onClick={e => onSubmitAvailability(e)}
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
