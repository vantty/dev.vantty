import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CardElement, injectStripe } from "react-stripe-elements";

// Actions
import { payment } from "../../../../actions/pay";

// Helpers
const log = console.log;

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: "36px",
        color: "#424770",
        fontFamily: "Open Sans, sans-serif",
        letterSpacing: "0.025em",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#c23d4b"
      }
    }
  };
};

const _StripeForm = props => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Card details
          <CardElement onChange={handleChange} {...createOptions()} />
        </label>
        <div role="alert">{errorMessage}</div>
        <button>Pay</button>
      </form>
    </div>
  );
};

const StripeForm = injectStripe(_StripeForm);

StripeForm.propTypes = {
  payment: PropTypes.func
};

export default connect(
  null,
  { payment }
)(StripeForm);