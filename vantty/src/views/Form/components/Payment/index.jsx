import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Components
import PaymentForm from "../../../Checkout/components/PaymentForm";
import { CustomPaper } from "../ComponentsForm";

const Payment = ({ user }) => {
  return (
    <CustomPaper
      Children={
        <PaymentForm
          stripeCustomerId={user && user.stripeCustomerId}
          cards={user && user.cards}
          isEdit={true}
        />
      }
    />
  );
};

Payment.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {})(Payment);
