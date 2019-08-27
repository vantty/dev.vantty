import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Actions
import { createProfile } from "../../../actions/profile";

//Components
import CreateProfile from "../CreateProfile";
import AddPortfolio from "../AddPortfolio";
import InfoContact from "../InfoContact";
import SimpleAppBar from "../ComponentsForm/SimpleAppBar";

//Material-UI
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
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
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const steps = ["I am ...", "My Profile & Portfolio", "Contact Number"];

const UserForm = ({ profile }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    profilePicture: "",
    bio: "",
    profession: "",
    location: { country: "", state: "", city: "" },
    // location: {},
    mobileNumber: "",
    instagramUsername: ""
  });

  const {
    bio,
    country,
    state,
    city,
    location,
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
        <SimpleAppBar step={activeStep} />
      </div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
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
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </Fragment>
            ) : (
              <Fragment>{getStepContent(activeStep)}</Fragment>
            )}
          </Fragment>
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
