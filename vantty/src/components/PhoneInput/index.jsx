import React, { useState } from "react";
import ReactPhoneInput from "react-phone-input-2";

const PhoneInput = ({ onChangePhone }) => {
  const [phone, setPhone] = useState("");

  const handleChange = value => {
    setPhone(value.replace(/[^0-9]+/g, ""));
    onChangePhone(value.replace(/[^0-9]+/g, ""));
  };

  return (
    <ReactPhoneInput
      defaultCountry="ca"
      onlyCountries={["ca", "us", "co"]}
      masks={{
        ca: "+. (...) ...-..-..",
        us: "+. (...) ...-..-..",
        co: "+.. (...) ...-..-.."
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

export default PhoneInput;
