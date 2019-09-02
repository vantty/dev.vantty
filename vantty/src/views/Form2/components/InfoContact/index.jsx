import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

// Actions
import { createProfile, getCurrentProfile } from "../../../../actions/profile";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

//npm package
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";
import { Animated } from "react-animated-css";

//Components
import NumberValidation from "../../../../components/NumberValidation";

// Material helpers
import {
  withStyles,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Typography,
  Grid
} from "@material-ui/core";

import FormBottomNav from "../../../../components/ComponentsForm/FormBottomNav";

// Material components
import { Button, TextField } from "@material-ui/core";

import { InputLabel, Select, MenuItem } from "@material-ui/core";

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from "../../../../components";

// Component styles
import styles from "./styles";

const InfoContact = ({
  profile: { profile, loading },
  number: { numberIsVerified, numberVerified },
  createProfile,
  getCurrentProfile,
  history,
  nextStep,
  step,
  prevStep,
  classes,
  className,
  ...rest
}) => {
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

  const rootClassName = classNames(classes.root, className);

  return (
    <Fragment>
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader>
          <PortletLabel subtitle='Your whatsapp number' title='Contact' />
        </PortletHeader>
        <PortletContent noPadding>
          <Fragment>
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
            >
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
                  <div>
                    <Typography
                      component='h5'
                      variant='h6'
                      align='center'
                      className={classes.typography}
                    >
                      This number will be where your clients could contact with
                      you. You should have this phone with you to validate it.
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
                      <NumberValidation
                        phone={phone}
                        countryCode={countryCode}
                      />
                    </Grid>
                    <br />
                  </div>
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
          </Fragment>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <div>
            <div>
              <Button onClick={back}>Back</Button>
              <Button component={Link} to='/dashboard'>
                Save and Exit
              </Button>
            </div>
          </div>
        </PortletFooter>
      </Portlet>
    </Fragment>
  );
};

InfoContact.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
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
)(withStyles(styles)(withRouter(InfoContact)));
