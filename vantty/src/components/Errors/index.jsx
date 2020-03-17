// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import validate from "validate.js";
// import { schemaErrors } from "../../helpers/errorsData";
// //errors

// const fieldErrors = field => {
//   const [formState, setFormState] = useState({
//     isValid: false,
//     showPassword: false,
//     values: {},
//     touched: {},
//     errors: {}
//   });

//   useEffect(() => {
//     const errors = validate(formState.values, schemaErrors);
//     setFormState(formState => ({
//       ...formState,
//       isValid: errors ? false : true,
//       errors: errors || {}
//     }));
//   }, [formState.values]);

//   const {
//     values: { field }
//   } = formState;

//   const hasError = field =>
//     formState.touched[field] && formState.errors[field] ? true : false;

//   return <div>{}</div>;
// };

// export default fieldErrors;
