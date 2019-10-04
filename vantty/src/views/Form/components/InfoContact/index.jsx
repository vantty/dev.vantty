import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

// Actions
import { createProfile, getCurrentProfile } from "../../../../actions/profile";

// Externals
import PropTypes from "prop-types";

// import ReactPhoneInput from "react-phone-input-mui";
import { TextField, withStyles, Container } from "@material-ui/core";
//npm package
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";
import { Animated } from "react-animated-css";

//Components
import NumberValidation from "../../../../components/NumberValidation";

import { FormBottomNav } from "../../../../components";

// Material helpers
import { makeStyles } from "@material-ui/styles";
import { spacing } from "@material-ui/system";

//Material Compoments
import {
  Button,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Box
} from "@material-ui/core";
import LinkMui from "@material-ui/core/Link";

import clsx from "clsx";
import { isMobile } from "react-device-detect";

// Component styles

const useStyles = makeStyles(() => ({
  root: {},
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
  prevStep,
  className,
  match,
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
  const classes = useStyles();

  return (
    <Fragment>
      <Card className={clsx(classes.root, className)}>
        {/* <form autoComplete='off' noValidate> */}
        <CardHeader
          // subheader='The information can be edited'
          title='Mobile'
        />
        {/* <Divider /> */}
        <CardContent>
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
                <Box>
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
                  <div
                    style={{
                      textAlign: "center"
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block"
                      }}
                    >
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
                        inputExtraProps={{
                          margin: "normal",
                          autoComplete: "phone",
                          name: "custom-username"
                        }}
                        inputClass={classes.field}
                        dropdownClass={classes.countryList}
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
                      history={history}
                    />
                  </Grid>
                  <br />
                </Box>
              </Grid>
            </Grid>
          </Fragment>
        </CardContent>

        {/* </form> */}
      </Card>
      {match.url === "/create-profile" && (
        <div>
          <FormBottomNav
            step={step}
            Children={
              <div>
                <div>
                  <Button onClick={back}>Back</Button>
                </div>
              </div>
            }
          />
        </div>
      )}
      {match.url === "/mobile" && isMobile && (
        <div>
          <FormBottomNav
            step={step}
            Children={
              <div>
                <div>
                  <Button component={Link} to='/settings'>
                    Back
                  </Button>
                </div>
              </div>
            }
          />
        </div>
      )}
    </Fragment>
  );
};

InfoContact.propTypes = {
  className: PropTypes.string,
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
