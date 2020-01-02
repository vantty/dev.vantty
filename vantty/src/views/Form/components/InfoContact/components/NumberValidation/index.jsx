import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

//npm package
import AccountKit from "react-facebook-account-kit";

// Actions
import { verifyNumber } from "../../../../../../actions/number";
import { Button, makeStyles } from "@material-ui/core";

const appId = process.env.REACT_APP_FACEBOOK_ID;
const csfr = "f20825edcc1a0ef2e4a546155119c52c";
const version = "v1.0";

const useStyles = makeStyles(theme => ({
  button: {
    color: "black",
    boxShadow: "none",
    backgroundColor: theme.palette.greenVantty.light,
    "&:hover": {
      color: "black",
      backgroundColor: theme.palette.greenVantty.light
    }
  }
}));

const NumberValidation = ({
  verifyNumber,
  phone,
  countryCode,
  history
}) => {
  const classes = useStyles();
  return (
    <AccountKit
      appId={appId} // Update this!
      version={version} // Version must be in form v{major}.{minor}
      csrf={csfr} // Required for security
      countryCode={`+${countryCode}`} // eg. +60
      phoneNumber={phone.slice(countryCode.length)} // eg. 12345678
      emailAddress={""} // eg. me@site.com
      onResponse={res => verifyNumber(res)}
    >
      {p => (
        <Button variant="contained" className={classes.button} {...p}>
          Validate and finish
        </Button>
      )}
    </AccountKit>
  );
};

NumberValidation.propTypes = {
  verifyNumber: PropTypes.func.isRequired
};

export default connect(null, { verifyNumber })(NumberValidation);
