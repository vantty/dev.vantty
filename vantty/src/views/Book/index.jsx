import React from "react";
import { StripeProvider, Elements } from "react-stripe-elements";

// Components
import StripeForm from "./components/StripeForm";

export default function index() {
  return (
    <StripeProvider apiKey="pk_test_HHkuqizzDlMmZMauV39jofnJ000LOHKMAN">
      <Elements>
        <StripeForm />
      </Elements>
    </StripeProvider>
  );
}
