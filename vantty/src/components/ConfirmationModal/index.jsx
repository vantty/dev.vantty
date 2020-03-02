import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Material-UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  buttonAccept: {
    color: "white",
    fontWeight: "bold",
    borderRadius: "0.5rem",
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
  },
  buttons: {
    backgroundColor: "inherit",
    "&:hover": {
      color: theme.palette.greenVantty.dark,
      backgroundColor: "inherit"
    }
  }
}));

const ConfirmationModal = ({
  buttonText,
  modalText,
  changeStateBooking,
  bookingId,
  bookId,
  state,
  byUser,
  text,
  loading
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleNo = () => {
    setOpen(false);
  };
  const handleYes = async () => {
    await changeStateBooking(bookingId, bookId, state, text, byUser);
    await setOpen(false);
  };

  return (
    <div>
      <MenuItem
        className={
          buttonText === "Accept" ? classes.buttonAccept : classes.buttons
        }
        onClick={handleClickOpen}
      >
        {buttonText}
      </MenuItem>
      <Dialog open={open} onClose={handleNo}>
        <DialogTitle>{"Booking Request"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{modalText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNo} color="primary" disabled={loading}>
            No
          </Button>
          <Button
            onClick={handleYes}
            color="primary"
            disabled={loading}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ConfirmationModal.propTypes = {
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.book.loading
});

export default connect(mapStateToProps, {})(withRouter(ConfirmationModal));
