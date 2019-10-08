import React, { Fragment, useEffect } from "react";
import { Redirect, Link as RouterLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Progress from "@material-ui/core/LinearProgress";

// Actions
import { confirmEmail, register } from "../../actions/auth";

const Confirmation = ({ match, confirmEmail, register, isAuthenticated }) => {
  confirmEmail(match.params.token);

  if (isAuthenticated) {
    return <Redirect to='/' />;
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
  { confirmEmail, register }
)(Confirmation);
