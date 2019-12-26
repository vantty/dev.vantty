import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isMobile } from "react-device-detect";

// Actions
import { createProfile, getCurrentProfile } from "../../../../actions/profile";

// Components
import { NumberValidation } from "./components";
import { FormBottomNav, CustomPaper } from "../ComponentsForm";

// Material helpers
import { makeStyles } from "@material-ui/styles";

//Material Compoments
import { Button, Typography, Grid, Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {},
  formControl: {
    // width: "80%",
    alignContent: "center",
    alignItems: "center"
  },
  typography: {
    // marginTop: "1rem",
    marginBottom: "1.5rem"
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
    // getCurrentProfile();

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

  // const continues = e => {
  //   e.preventDefault();
  //   nextStep();
  // };

  const back = e => {
    e.preventDefault();
    prevStep();
  };
  const next = e => {
    e.preventDefault();
    nextStep();
  };

  const classes = useStyles();

  return (
    <Fragment>
      {/* <Divider /> */}

      <CustomPaper
        Children={
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
                  {!numberIsVerified ? (
                    <Typography
                      component='h5'
                      variant='h6'
                      align='center'
                      className={classes.typography}
                    >
                      This number will be where your clients could contact with
                      you. You should have this phone with you to validate it.
                    </Typography>
                  ) : (
                    <Typography
                      component='h5'
                      variant='h6'
                      align='center'
                      className={classes.typography}
                    >
                      This number has been verified!
                    </Typography>
                  )}

                  <br />
                  {!numberIsVerified ? (
                    <Fragment>
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
                          id={profile && profile.user._id}
                        />
                      </Grid>
                    </Fragment>
                  ) : (
                    "he;;p"
                  )}

                  <br />
                </Box>
              </Grid>
            </Grid>
          </Fragment>
        }
      />

      {/* </form> */}

      {match.url === "/create-profile" && (
        <div>
          <FormBottomNav
            step={step}
            Children={
              <div>
                <div>
                  <Button onClick={back}>Back</Button>
                  <Button
                    onClick={next}
                    className={classes.button}
                    // disabled={!numberIsVerified}
                  >
                    Next
                  </Button>
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

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(InfoContact)
);
