import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const RoutePrivateWithLayout = props => {
  const {
    layout: Layout,
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={matchProps =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )
      }
    />
  );
};

RoutePrivateWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(RoutePrivateWithLayout);
