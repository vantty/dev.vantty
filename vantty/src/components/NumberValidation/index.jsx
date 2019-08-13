import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AccountKit from "react-facebook-account-kit";

// Actions
import { verifyNumber } from "../../actions/number";

const appId = "619096385268555";
const csfr = "f20825edcc1a0ef2e4a546155119c52c";
const version = "v1.0";

const NumberValidation = ({ verifyNumber }) => {
  return (
    <AccountKit
      appId={appId} // Update this!
      version={version} // Version must be in form v{major}.{minor}
      csrf={csfr} // Required for security
      countryCode={""} // eg. +60
      phoneNumber={""} // eg. 12345678
      emailAddress={""} // eg. me@site.com
      onResponse={res => verifyNumber(res)}
    >
      {p => <button {...p}>Validate</button>}
    </AccountKit>
  );
};

NumberValidation.propTypes = {
  verifyNumber: PropTypes.func.isRequired
};

export default connect(
  null,
  { verifyNumber }
)(NumberValidation);
