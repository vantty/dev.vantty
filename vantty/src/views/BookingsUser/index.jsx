import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";

// Actions
import { changeStateBooking, getUserBookings } from "../../actions/book";

// Components
import { BookingList } from "./Components";
import { CustomPaper } from "../Form/components/ComponentsForm";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "white",
    width: "auto"
  }
}));

const Bookings = ({ getUserBookings, changeStateBooking, auth }) => {
  const classes = useStyles();
  useEffect(() => {
    getUserBookings();
  }, []);
  return (
    <CustomPaper
      Children={
        <div className={classes.root}>
          <BookingList
            book={auth.bookings && auth.bookings}
            changeStateBooking={changeStateBooking}
          />
        </div>
      }
    />
  );
};

Bookings.propTypes = {
  getUserBookings: PropTypes.func,
  changeStateBooking: PropTypes.func,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {
  getUserBookings,
  changeStateBooking
})(withRouter(Bookings));
