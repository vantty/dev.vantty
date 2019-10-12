import React, { useState, Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Actions
import { getCurrentProfile, createProfile } from "../../actions/profile";

// Material helpers
import { Container } from "@material-ui/core";

// Material components
import { Grid, Box } from "@material-ui/core";
import Progress from "@material-ui/core/LinearProgress";

// Custom components
import {
  CreateProfile,
  AddPortfolio,
  InfoContact,
  Price,
  PersonalInfo,
  Categories
} from "./components";

import { AppBarForm } from "./components/ComponentsForm";

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

const Form = ({ profile, getCurrentProfile }) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(1);

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

  useEffect(() => {
    getCurrentProfile();
  }, []);
  // Handle fields change
  const onChange = e =>
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
        return <PersonalInfo step={activeStep} nextStep={nextStep} />;
      case 2:
        return (
          <CreateProfile
            step={activeStep}
            nextStep={nextStep}
            getCurrentProfile={getCurrentProfile}
            formData={formData}
            prevStep={prevStep}
            onChange={onChange}
          />
        );
      case 3:
        return (
          <Categories
            step={activeStep}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <AddPortfolio
            step={activeStep}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <Price step={activeStep} nextStep={nextStep} prevStep={prevStep} />
        );
      case 6:
        return (
          <InfoContact
            step={activeStep}
            nextStep={nextStep}
            prevStep={prevStep}
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
        {profile ? (
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
        ) : (
          <Progress />
        )}
      </Box>
    </Fragment>
  );
};

Form.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, createProfile }
)(withRouter(Form));
