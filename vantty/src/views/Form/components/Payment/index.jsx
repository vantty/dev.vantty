import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PaymentForm from "../../../Checkout/components/PaymentForm";

// Actions
import { loadUser } from "../../../../actions/auth";

const Payment = ({ loadUser, user }) => {
  // useEffect(() => {
  //   loadUser();
  // }, []);
  return (
    <PaymentForm
      stripeCustomerId={user && user.stripeCustomerId}
      cards={user && user.cards}
      isEdit={true}
    />
  );
};

Payment.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { loadUser })(Payment);
