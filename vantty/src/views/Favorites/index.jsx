import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Search from "./Components/MainSearch";

// Actions
import { changeNavbarValue } from "../../actions/navbar";

const Favorites = ({ changeNavbarValue }) => {
  useEffect(() => {
    changeNavbarValue("search");
  }, []);
  return (
    <Fragment>
      <Search />
    </Fragment>
  );
};

Favorites.propTypes = {
  changeNavbarValue: PropTypes.func.isRequired
};

export default connect(
  null,
  { changeNavbarValue }
)(Favorites);
