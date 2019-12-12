import React, { useState, Fragment, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import { connect } from "react-redux";
import validate from "validate.js";

// Actions
import { getCurrentProfile, createProfile } from "../../actions/profile";

// Material helpers
import { Container, Button } from "@material-ui/core";

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
  CategoriesAndServices,
  Validation,
  StripeAccount
} from "./components";

import { AppBarForm, FormBottomNav } from "./components/ComponentsForm";

import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "react-device-detect";
import {
  schemaErrors,
  schemaErrorsCreateProfile
} from "../../helpers/errorsData";
import { getStrategy } from "../../helpers";
import { updateInfo } from "../../actions/auth";
const log = console.log;
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

const Form = ({
  profile,
  getCurrentProfile,
  uploader: { images },
  updateInfo,
  auth,
  auth: { user },
  history
}) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
    password: "",
    profilePicture: "",
    bio: "",
    profession: "",
    city: "",
    state: "",
    country: "",
    mobileNumber: "",
    instagramUsername: "",
    user: "",
    qualified: "",
    gender: "",
    english: "",
    categories: { makeup: [], hair: [] },
    price: ""
  });

  const [stateHair, setStateHair] = React.useState([]);
  const [stateMakeup, setStateMakeup] = React.useState([]);
  const [services, setServices] = React.useState({
    amount: "",
    typeOfService: ""
  });

  ///Services
  const handleServices = event => {
    setServices({
      ...services,
      [event.target.name]: event.target.value
    });
  };
  var arr = [];
  const handleAddServices = async () => {
    await arr.push(services);
    log("BEfore", arr);
  };

  const onSubmitService = () => {
    setFormData({ ...formData, services: arr });
    log(formData);
  };
  //Categories
  const handleChangeHair = event => {
    setStateHair(event.target.value);
  };

  const handleChangeMakeup = event => {
    setStateMakeup(event.target.value);
  };

  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   id: "",
  //   password: "",
  //   profilePicture: ""
  // });

  //errors
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  ///User Errors
  useEffect(() => {
    const errors = validate(formState.values, schemaErrors);
    setFormState(formState => ({
      ...formState,
      values: formData,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  //User Errors
  const handleChange = async event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.name === "checkbox"
            ? event.target.checked
            : event.target.value
      },

      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  // ///Profile Errors
  // useEffect(() => {
  //   const errors = validate(formStateProfile.values, schemaErrorsCreateProfile);
  //   setFormStateProfile(formStateProfile => ({
  //     ...formStateProfile,
  //     values: formDataProfile,
  //     isValid: errors ? false : true,
  //     errors: errors || {}
  //   }));
  // }, [formStateProfile.values]);

  // const [formStateProfile, setFormStateProfile] = useState({
  //   isValid: false,
  //   values: {},
  //   touched: {},
  //   errors: {}
  // });

  useEffect(() => {
    getCurrentProfile();
    // loadUser();
    const strategy = getStrategy(user);
    setFormData({
      firstName: auth.loading || !strategy ? "" : strategy.firstName,
      lastName: auth.loading || !strategy ? "" : strategy.lastName,
      email: auth.loading || !strategy ? "" : strategy.email,
      profilePicture:
        auth.loading || !strategy.profilePicture ? {} : strategy.profilePicture,
      id: auth.loading || !user._id ? "" : user._id,
      password: auth.loading || !user.password ? "" : user.password
    });
  }, [auth.loading, getCurrentProfile]);

  const onSubmitProfile = async e => {
    e.preventDefault();
    log(formData);
    await updateInfo(formData, true);
    // await onSubmitProfile(e);
    // profile &&
    //   (await createProfile(
    //     {
    //       name: {
    //         firstName: firstName,
    //         lastName: lastName
    //       }
    //     },
    //     history,
    //     true
    //   ));

    nextStep();
  };

  // const onSubmitService = async e => {
  //   e.preventDefault();
  //   log(formData);
  //   await updateInfo(formData, true);

  //   nextStep();
  // };
  // useEffect(() => {
  //   getCurrentProfile();
  // }, []);
  // Handle fields change
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle fields Service
  const onChangeService = services => setFormData({ ...formData, services });

  // Proceed to next step
  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  // Go back to prev step
  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };
  log("DATA", formData);

  function getStepContent(step) {
    switch (step) {
      case 1:
        return (
          <PersonalInfo
            step={activeStep}
            nextStep={nextStep}
            formData={formData}
            formState={formState}
            handleChange={handleChange}
            hasError={hasError}
            onChange={onChange}
          />
        );
      case 2:
        return (
          <CategoriesAndServices
            stateHair={stateHair}
            stateMakeup={stateMakeup}
            handleChangeHair={handleChangeHair}
            handleChangeMakeup={handleChangeMakeup}
            formData={formData}
            onChangeService={onChangeService}
            handleServices={handleServices}
            services={services}
            handleAddServices={handleAddServices}
          />
        );
      // case 3:
      //   return (
      //     <Validation
      //       formData={formData}
      //       step={activeStep}
      //       nextStep={nextStep}
      //       getCurrentProfile={getCurrentProfile}
      //       prevStep={prevStep}
      //       onChange={onChange}
      //     />
      //   );
      // case 4:
      // return <CategoriesAndServices formData={formData} onch />;
      case 3:
        return (
          <AddPortfolio
            step={activeStep}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      // case 7:
      //   return (
      //     <Price step={activeStep} nextStep={nextStep} prevStep={prevStep} />
      //   );
      case 4:
        return (
          <InfoContact
            step={activeStep}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return <StripeAccount />;
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
                    {/* {isMobile && ( */}
                    <FormBottomNav
                      step={activeStep}
                      Children={
                        <div>
                          <div>
                            {activeStep == 1 && (
                              <Fragment>
                                <Button onClick={prevStep}>Back</Button>
                                <Button
                                  onClick={e => onSubmitProfile(e)}
                                  className={classes.button}
                                  // disabled={!formState.isValid}
                                >
                                  Next
                                </Button>
                              </Fragment>
                            )}
                            {activeStep == 2 && (
                              <Fragment>
                                <Button onClick={prevStep}>Back</Button>
                                <Button
                                  onClick={e => onSubmitService(e)}
                                  className={classes.button}
                                  // disabled={!formState.isValid}
                                >
                                  Next
                                </Button>
                              </Fragment>
                            )}
                            {/* <Fragment>
                              <Button onClick={prevStep}>Back</Button>
                              <Button
                                onClick={e => onSubmitProfile(e)}
                                className={classes.button}
                                // disabled={!formState.isValid}
                              >
                                Next
                              </Button>
                            </Fragment> */}
                          </div>
                        </div>
                      }
                    />
                    {/* )} */}
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
  createProfile: PropTypes.func.isRequired,
  uploader: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  uploader: state.uploader
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  createProfile,
  updateInfo
})(withRouter(Form));
