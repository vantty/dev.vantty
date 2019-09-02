import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Actions
import { getCurrentProfile, createProfile } from "../../actions/profile";

// Material helpers
import { withStyles, Typography, Container } from "@material-ui/core";

// Material components
import { Grid } from "@material-ui/core";
import Progress from "@material-ui/core/LinearProgress";

// Shared layouts
import { Dashboard as DashboardLayout } from "../../layouts";

// Custom components
import { CreateProfile, AddPortfolio, InfoContact } from "./components";

import { AppBarForm } from "../../components";

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing()
  }
});

const steps = ["I am ...", "My Profile & Portfolio", "Contact Number"];

const Form2 = ({ profile, classes }) => {
  const [formData, setFormData] = useState({
    profilePicture: "",
    bio: "",
    profession: "",
    city: "",
    mobileNumber: "",
    instagramUsername: ""
  });

  const {
    bio,
    country,
    state,
    city,
    instagramUsername,
    mobileNumber,
    profilePicture,
    profession
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
          <CreateProfile
            step={activeStep}
            nextStep={nextStep}
            handleChange={handleChange}
            formData={formData}
          />
        );
      case 2:
        return (
          <AddPortfolio
            step={activeStep}
            nextStep={nextStep}
            handleChange={handleChange}
            prevStep={prevStep}
            values={formData}
          />
        );
      case 3:
        return (
          <InfoContact
            step={activeStep}
            nextStep={nextStep}
            handleChange={handleChange}
            prevStep={prevStep}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    // <DashboardLayout title='Profile'>
    <div className={classes.root}>
      <div>
        <AppBarForm step={activeStep} />
      </div>
      <div>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Container maxWidth={activeStep === 2 ? "md" : "xs"}>
              <Fragment>
                {activeStep === steps.length + 1 ? (
                  <Fragment>
                    <Typography variant='h5' gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant='subtitle1'>
                      Your order number is #2001539. We have emailed your order
                      confirmation, and will send you an update when your order
                      has shipped.
                    </Typography>
                  </Fragment>
                ) : (
                  <Fragment>{getStepContent(activeStep)}</Fragment>
                )}
              </Fragment>
            </Container>
          </Grid>
        </Grid>
      </div>
    </div>

    // </DashboardLayout>
  );
};

Form2.propTypes = {
  classes: PropTypes.object.isRequired,
  createProfile: PropTypes.func
};

export default connect(
  null,
  { createProfile }
)(withStyles(styles)(Form2));
