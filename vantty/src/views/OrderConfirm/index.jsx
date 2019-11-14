import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Progress from "@material-ui/core/LinearProgress";
import qs from "query-string";

// Actions
import { confirmStripeAccount } from "../../actions/pay";

const OrderConfirm = ({ location, confirmStripeAccount }) => {
  const { code } = qs.parse(location.search, { ignoreQueryPrefix: true });
  confirmStripeAccount(code);

  return (
    <Fragment>
      <h1>STRIPE</h1>
    </Fragment>
  );
};

// OrderConfirm.propTypes = {
//   confirmEmail: PropTypes.func,
//   register: PropTypes.func,
//   isAuthenticated: PropTypes.bool
// };

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// });

export default connect(null, { confirmStripeAccount })(OrderConfirm);
