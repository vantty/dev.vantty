import React from "react";
import { StripeProvider, Elements } from "react-stripe-elements";

// Components
import StripeForm from "./components/StripeForm";

const PaymentForm = () => {
  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY_TEST}>
      {/* <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}> */}
      <Elements>
        <StripeForm />
      </Elements>
    </StripeProvider>
  );
};

export default PaymentForm;
