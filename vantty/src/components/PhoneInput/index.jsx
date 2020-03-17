import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = ({ onChangePhone, user: { mobileNumber }, userPhone }) => {
  const [phone, setPhone] = useState(mobileNumber || userPhone);
  const handleChange = value => {
    setPhone(value.replace(/[^0-9]+/g, ""));
    onChangePhone(value.replace(/[^0-9]+/g, ""));
  };

  return (
    <ReactPhoneInput
      country="ca"
      onlyCountries={["ca"]}
      masks={{
        ca: "+. (...) ...-..-.."
      }}
      disableAreaCodes
      value={phone}
      onChange={handleChange}
      inputExtraProps={{
        margin: "normal",
        autoComplete: "phone",
        name: "custom-username"
      }}
    />
  );
};

PhoneInput.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {})(PhoneInput);
