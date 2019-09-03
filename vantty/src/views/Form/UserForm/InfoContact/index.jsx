import React, { useState, Fragment, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

//npm package
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";
import { Animated } from "react-animated-css";
// Actions
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../../../actions/profile";

//Components
import NumberValidation from "../../../../components/NumberValidation";
//Materila-UI
import { Button, Grid, Box } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import FormBottomNav from "../../../../components/ComponentsForm/FormBottomNav";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  formControl: {
    // width: "80%",
    alignContent: "center",
    alignItems: "center"
  },
  typography: {
    // marginTop: "1rem",
    marginBottom: "1.5rem"
  }
}));

const InfoContact = ({
  profile: { profile, loading },
  number: { numberIsVerified, numberVerified },
  createProfile,
  getCurrentProfile,
  history,
  nextStep,
  step,
  prevStep
}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    mobileNumber: ""
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      mobileNumber: loading || !profile.mobileNumber ? "" : profile.mobileNumber
    });
  }, [loading, getCurrentProfile]);

  //validation
  const [formDataNumber, setFormDataNumber] = useState({
    phone: "",
    countryCode: ""
  });

  const { phone, countryCode } = formDataNumber;

  function handleOnChange(value, data) {
    setFormDataNumber({
      phone: value.replace(/[^0-9]+/g, ""),
      countryCode: data.countryCode === "co" ? "57" : "1"
    });
  }

  const continues = e => {
    e.preventDefault();
    nextStep();
  };

  const back = e => {
    e.preventDefault();
    prevStep();
  };

  return (
    <Fragment>
      <CssBaseline />
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          container
          direction='row'
          justify='center'
          alignItems='center'
        >
          {!numberIsVerified ? (
            <Box mr={1}>
              <Typography
                component='h5'
                variant='h6'
                align='center'
                className={classes.typography}
              >
                This number will be where your clients could contact with you.
                You should have this phone with you to validate it.
              </Typography>
              <br />
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "inline-block" }}>
                  <ReactPhoneInput
                    defaultCountry='us'
                    onlyCountries={["co", "us", "ca"]}
                    masks={{
                      co: "+.. (...) ...-..-..",
                      ca: "+. (...) ...-..-..",
                      us: "+. (...) ...-..-.."
                    }}
                    disableAreaCodes
                    value={phone}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <br />

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                container
                direction='row'
                justify='center'
                alignItems='center'
              >
                <NumberValidation phone={phone} countryCode={countryCode} />
              </Grid>
            </Box>
          ) : (
            <Animated
              animationIn='slideInDown'
              // animationOut='fadeOut'
              isVisible={true}
              animationInDuration={2000}
            >
              <div>
                <Typography component='h1' variant='h3' align='center'>
                  Welcome to Vantty
                </Typography>
                <br />
                <Typography component='h4' variant='h6' align='center'>
                  It is a pleasure for us to have you with us. Our team of
                  artists will activate your account in 10 hours.
                </Typography>
              </div>
            </Animated>
          )}
        </Grid>
      </Grid>
      <FormBottomNav
        step={step}
        Children={
          <div>
            <div>
              <Button onClick={back}>Back</Button>
              <Button component={Link} to='/dashboard'>
                Save and Exit
              </Button>
            </div>
          </div>
        }
      />
    </Fragment>
  );
};

InfoContact.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  number: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  number: state.number
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(InfoContact));
