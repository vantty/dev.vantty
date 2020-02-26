import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Progress from "@material-ui/core/LinearProgress";

// Actions
import { register } from "../../actions/auth";

const Confirmation = ({ match, register, isAuthenticated }) => {
  register(match.params.token);
  if (isAuthenticated) {
    return <Redirect to="/role" />;
  }
  return <Progress />;
};

Confirmation.propTypes = {
  register: PropTypes.func,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Confirmation);
