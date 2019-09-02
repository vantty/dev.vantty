import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Actions
import { createProfile } from "../../../actions/profile";

//Custom  components
import CreateProfile from "./CreateProfile";
import AddPortfolio from "./AddPortfolio";
import InfoContact from "./InfoContact";
import AppBarForm from "../../../components/ComponentsForm/AppBar";

//Material-UI
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Style from "../style";
import { Container } from "@material-ui/core";

const steps = ["I am ...", "My Profile & Portfolio", "Contact Number"];

const UserForm = ({ profile }) => {
  const classes = Style();

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
    <Fragment>
      <CssBaseline />
      <div>
        <AppBarForm step={activeStep} />
      </div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Container maxWidth='xs'>
            <Typography component='h1' variant='h4' align='center'>
              {activeStep !== 3 ? steps[activeStep - 1] : null}
            </Typography>
            <br />
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
        </Paper>
      </main>
    </Fragment>
  );
};

UserForm.propTypes = {
  createProfile: PropTypes.func
};

export default connect(
  null,
  { createProfile }
)(withRouter(UserForm));
