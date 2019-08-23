import React, { useState, Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

//npm package
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";

// Actions
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../../actions/profile";

//Components
import NumberValidation from "../../../components/NumberValidation";
//Materila-UI
import { Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import FormBottomNav from "../ComponentsForm/FormBottomNav";
import { verifyNumber } from "../../../actions/number";

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
      {!numberIsVerified ? (
        <div>
          <Typography component='h5' variant='h6' align='left'>
            Click here to validate you Whatsapp number
          </Typography>
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

          <NumberValidation phone={phone} countryCode={countryCode} />
        </div>
      ) : (
        "Hello Artists, your mobile number had been validated. Welcome to"
      )}
      <FormBottomNav
        step={step}
        Children={
          <div>
            <div>
              <Button primary={true} onClick={back}>
                Back
              </Button>

              <Button
                style={{ backgroundColor: "#f5f5" }}
                primary={true}
                onClick={continues}
              >
                Last Step
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
