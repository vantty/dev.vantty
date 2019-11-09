import React from "react";
import { StripeProvider, Elements } from "react-stripe-elements";

// Components
import StripeForm from "./components/StripeForm";

const Book = () => {
  return (
    <StripeProvider apiKey={"pk_test_bwLsCIDJL7qmxZCb2XHPWtnZ00eRusQUf1"}>
      <Elements>
        <StripeForm />
      </Elements>
    </StripeProvider>
  );
};

export default Book;
