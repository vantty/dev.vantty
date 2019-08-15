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
import SimpleAppBar from "../ComponentsForm/SimpleAppBar";
import NumberValidation from "../../../components/NumberValidation";
//Materila-UI
import { Container, Box } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormBottomNav from "../ComponentsForm/FormBottomNav";
import { verifyNumber } from "../../../actions/number";
import setAlert from "../../../actions/alert";

const InfoContact = ({
  profile: { profile, loading },
  number: { numberIsVerified, numberVerified },
  createProfile,
  getCurrentProfile,
  history
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

  return (
    <Fragment>
      <CssBaseline />
      <SimpleAppBar
        message={"3: Whatsapp number"}
        progress={3}
        page={"/profile"}
      />
      <Box pt={11} pb={8}>
        <Container maxWidth='sm'>
          {!numberIsVerified ? (
            <div>
              <Typography component='h5' variant='h6' align='left'>
                Click here to validate ypu Whatsapp number
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
            step={3}
            backPage={"/add-portfolio"}
            nextPage={"/welcome"}
            disabled={true}
          />
        </Container>
      </Box>
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
