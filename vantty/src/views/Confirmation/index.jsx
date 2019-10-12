import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Progress from "@material-ui/core/LinearProgress";

// Actions
import { confirmEmail } from "../../actions/auth";

const Confirmation = ({ match, confirmEmail, isAuthenticated }) => {
  confirmEmail(match.params.token);
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return <Progress />;
};

Confirmation.propTypes = {
  confirmEmail: PropTypes.func,
  register: PropTypes.func,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { confirmEmail }
)(Confirmation);
