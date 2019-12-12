import React from "react";
import { StripeProvider, Elements } from "react-stripe-elements";

// Components
import StripeForm from "./components/StripeForm";

const PaymentForm = ({
  onChangeTarget,
  stripeCustomerId,
  cards,
  isEdit,
  cardSelected
}) => {
  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY_TEST}>
      {/* <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}> */}
      <Elements>
        <StripeForm
          onChangeTarget={onChangeTarget}
          stripeCustomerId={stripeCustomerId}
          cards={cards}
          isEdit={isEdit}
          cardSelected={cardSelected}
        />
      </Elements>
    </StripeProvider>
  );
};

export default PaymentForm;
