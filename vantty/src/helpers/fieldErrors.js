import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import validate from "validate.js";
//errors
const schema = {
  firstName: {
    presence: { allowEmpty: false, message: "is required" },
    firstName: true,
    length: {
      maximum: 64
    }
  }
};

const fieldErrors = () => {
  const [formState, setFormState] = useState({
    isValid: false,
    showPassword: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const {
    values: { firstName }
  } = formState;

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return <div>{fieldErrors()}</div>;
};

export default fieldErrors;
