import React from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";

// Components
import StripeForm from "./components/StripeForm";

// Helpers
// const log = console.log;

// const createOptions = () => {
//   return {
//     style: {
//       base: {
//         fontSize: "36px",
//         color: "#424770",
//         fontFamily: "Open Sans, sans-serif",
//         letterSpacing: "0.025em",
//         "::placeholder": {
//           color: "#aab7c4"
//         }
//       },
//       invalid: {
//         color: "#c23d4b"
//       }
//     }
//   };
// };

// const _StripeForm = props => {
//   const { stripe, payment } = props;
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = ({ error }) => {
//     if (error) {
//       setErrorMessage(error.message);
//     }
//   };

//   const handleSubmit = evt => {
//     evt.preventDefault();
//     if (stripe) {
//       stripe.createToken().then(res => {
//         let { token } = res;
//         let amount = "100";
//         payment(token);
//       });
//     } else {
//       console.log("Stripe.js hasn't loaded yet.");
//     }
//   };

//   return (
//     <div className="CardDemo">
//       <form onSubmit={handleSubmit}>
//         <label>
//           Card details
//           <CardElement onChange={handleChange} {...createOptions()} />
//         </label>
//         <div className="error" role="alert">
//           {errorMessage}
//         </div>
//         <button>Pay</button>
//       </form>
//     </div>
//   );
// };

// const StripeForm = injectStripe(_StripeForm);

const Book = () => {
  return (
    <StripeProvider apiKey={"pk_test_HHkuqizzDlMmZMauV39jofnJ000LOHKMAN"}>
      <Elements>
        <StripeForm />
      </Elements>
    </StripeProvider>
  );
};

export default Book;

// Book.propTypes = {
//   payment: PropTypes.func
// };

// export default connect(
//   null,
//   { payment }
// )(Book);
