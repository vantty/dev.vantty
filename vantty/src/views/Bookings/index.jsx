import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Material-UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
        <div className={classes.root}>
          <BookingList
            book={book && book}
            changeStateBooking={changeStateBooking}
          />
        </div>
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
