import React from "react";
import { StripeProvider, Elements } from "react-stripe-elements";

// Components
import StripeForm from "./components/StripeForm";

import CheckoutContext from "../../CheckoutContext";

const PaymentForm = ({
  onChangeTarget,
  stripeCustomerId,
  cards,
  isEdit,
  cardSelected
}) => {
  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}>
      <CheckoutContext.Provider value={{ onChangeTarget }}>
        <Elements>
          <StripeForm
            stripeCustomerId={stripeCustomerId}
            cards={cards}
            isEdit={isEdit}
            cardSelected={cardSelected}
          />
        </Elements>
      </CheckoutContext.Provider>
    </StripeProvider>
  );
};

export default PaymentForm;
