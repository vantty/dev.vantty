import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Actions
import { getCurrentProfile, createProfile } from "../../actions/profile";

// Material helpers
import { Container } from "@material-ui/core";
import { spacing } from "@material-ui/system";

// Material components
import { Grid, Box } from "@material-ui/core";
import Progress from "@material-ui/core/LinearProgress";

// Custom components
import {
  CreateProfile,
  AddPortfolio,
  InfoContact,
  Price,
  PersonalInfo
} from "./components";

import { AppBarForm } from "../../components";

import { makeStyles } from "@material-ui/core/styles";

// Component styles
const useStyles = makeStyles(theme => ({
  root: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(13),
      marginBottom: theme.spacing(12),
      padding: theme.spacing(1)
    }
  }
}));

const Form = ({ profile }) => {
  const [formData, setFormData] = useState({
    profilePicture: "",
    bio: "",
    profession: "",
    city: "",
    state: "",
    country: "",
    mobileNumber: "",
    instagramUsername: "",
    user: ""
  });
  const classes = useStyles();

  const {
    bio,
    country,
    state,
    city,
    instagramUsername,
    mobileNumber,
    profilePicture,
    profession,
    user
  } = formData;

  const [activeStep, setActiveStep] = useState(1);

  // Handle fields change
  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Proceed to next step
  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  // Go back to prev step
  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 1:
        return (
          <PersonalInfo
            step={activeStep}
            nextStep={nextStep}
            handleChange={handleChange}
          />
        );
      case 2:
        return (
          <CreateProfile
            step={activeStep}
            nextStep={nextStep}
            handleChange={handleChange}
            formData={formData}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <AddPortfolio
            step={activeStep}
            nextStep={nextStep}
            handleChange={handleChange}
            prevStep={prevStep}
            values={formData}
          />
        );
      case 4:
        return (
          <Price
            step={activeStep}
            nextStep={nextStep}
            handleChange={handleChange}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <InfoContact
            step={activeStep}
            nextStep={nextStep}
            handleChange={handleChange}
            prevStep={prevStep}
            // values={formData}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <Fragment>
      <div>
        <AppBarForm step={activeStep} />
      </div>
      <Box pt={11} pb={11}>
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <Container maxWidth='md'>
                <Fragment>
                  <Fragment>{getStepContent(activeStep)}</Fragment>
                </Fragment>
              </Container>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Fragment>
  );
};

export default connect(
  null,
  { createProfile }
)(withRouter(Form));
