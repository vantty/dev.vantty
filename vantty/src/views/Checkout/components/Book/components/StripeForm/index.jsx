import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements";

// Material-UI
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

// Actions
import { payment } from "../../../../../../actions/book";

// Helpers
const log = console.log;

const _PaymentForm = props => {
  const { stripe, payment } = props;
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = ({ error }) => {
    if (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSubmit = async evt => {
    try {
      evt.preventDefault();
      if (stripe) {
        let { token } = await stripe.createToken();
        let amount = "100";
        payment(token, amount);
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }
    } catch (error) {
      log(error);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={6}>
            <TextField required id="cardName" label="Name on card" fullWidth />
          </Grid> */}
          <Grid item xs={12} md={6}>
            <CardNumberElement onChange={handleChange} />
            {/* <TextField required id="cardNumber" label="Card number" fullWidth /> */}
          </Grid>
          <Grid item xs={12} md={6}>
            <CardExpiryElement onChange={handleChange} />
            {/* <TextField required id="expDate" label="Expiry date" fullWidth /> */}
          </Grid>
          <Grid item xs={12} md={6}>
            <CardCVCElement onChange={handleChange} />
            {/* <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
          /> */}
          </Grid>
          <div role="alert">{errorMessage}</div>
          <Grid item xs={12}>
            <Button type="submit">PAY</Button>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveCard" value="yes" />
              }
              label="Remember credit card details for next time"
            />
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

const PaymentForm = injectStripe(_PaymentForm);

PaymentForm.propTypes = {
  payment: PropTypes.func
};

export default connect(null, { payment })(PaymentForm);

// const _StripeForm = props => {
//   const { stripe, payment } = props;
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = ({ error }) => {
//     if (error) {
//       setErrorMessage(error.message);
//     }
//   };

//   const handleSubmit = async evt => {
//     try {
//       evt.preventDefault();
//       if (stripe) {
//         let { token } = await stripe.createToken();
//         let amount = "100";
//         payment(token, amount);
//       } else {
//         console.log("Stripe.js hasn't loaded yet.");
//       }
//     } catch (error) {
//       log(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>
//             Card number
//             <CardNumberElement {...createOptions()} onChange={handleChange} />
//           </label>
//           <label>
//             Expiration date
//             <CardExpiryElement {...createOptions()} onChange={handleChange} />
//           </label>
//         </div>
//         <div>
//           <label>
//             CVC
//             <CardCVCElement {...createOptions()} onChange={handleChange} />
//           </label>
//           <label>
//             Postal code
//             <input
//               name="name"
//               type="text"
//               placeholder="94115"
//               className="StripeElement"
//               required
//             />
//           </label>
//         </div>
//         <div role="alert">{errorMessage}</div>
//         <button>Pay</button>
//       </form>
//     </div>
//   );
// };

// const StripeForm = injectStripe(_StripeForm);

// StripeForm.propTypes = {
//   payment: PropTypes.func
// };

// export default connect(
//   null,
//   { payment }
// )(StripeForm);

// import React, { useState } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import {
//   CardNumberElement,
//   CardExpiryElement,
//   CardCVCElement,
//   injectStripe
// } from "react-stripe-elements";

// // Actions
// import { payment } from "../../../../actions/pay";

// // Helpers
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

//   const handleSubmit = async evt => {
//     try {
//       evt.preventDefault();
//       if (stripe) {
//         let { token } = await stripe.createToken();
//         let amount = "100";
//         payment(token, amount);
//       } else {
//         console.log("Stripe.js hasn't loaded yet.");
//       }
//     } catch (error) {
//       log(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>
//             Card number
//             <CardNumberElement {...createOptions()} onChange={handleChange} />
//           </label>
//           <label>
//             Expiration date
//             <CardExpiryElement {...createOptions()} onChange={handleChange} />
//           </label>
//         </div>
//         <div>
//           <label>
//             CVC
//             <CardCVCElement {...createOptions()} onChange={handleChange} />
//           </label>
//           <label>
//             Postal code
//             <input
//               name="name"
//               type="text"
//               placeholder="94115"
//               className="StripeElement"
//               required
//             />
//           </label>
//         </div>
//         <div role="alert">{errorMessage}</div>
//         <button>Pay</button>
//       </form>
//     </div>
//   );
// };

// const StripeForm = injectStripe(_StripeForm);

// StripeForm.propTypes = {
//   payment: PropTypes.func
// };

// export default connect(
//   null,
//   { payment }
// )(StripeForm);
