import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";

// Actions
import { getBook, changeStateBooking } from "../../actions/book";

// Components
import { BookingList } from "./Components";
import { CustomPaper } from "../Form/components/ComponentsForm";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "white",
    width: "auto"
  },
  appBar: {
    backgroundColor: "white"
  }
}));

const Bookings = ({ getBook, book: { book }, changeStateBooking }) => {
  useEffect(() => {
    getBook();
  }, []);
  const classes = useStyles();
  return (
    <CustomPaper
      Children={
        <Fragment>
          {book.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <div className={classes.root}>
              <BookingList
                book={book && book}
                changeStateBooking={changeStateBooking}
              />
            </div>
          )}
        </Fragment>
      }
    />
  );
};

Bookings.propTypes = {
  book: PropTypes.object.isRequired,
  getBook: PropTypes.func,
  changeStateBooking: PropTypes.func
};

const mapStateToProps = state => ({
  book: state.book
});

export default connect(mapStateToProps, { getBook, changeStateBooking })(
  withRouter(Bookings)
);
