import React from "react";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import CheckIcon from "@material-ui/icons/Check";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ClearIcon from "@material-ui/icons/Clear";
import WarningIcon from "@material-ui/icons/Warning";

const useStyles = makeStyles(theme => ({
  request: {
    backgroundColor: theme.palette.purpleVantty.light
  },
  accepted: {
    backgroundColor: theme.palette.greenVantty.main
  },
  completed: {
    backgroundColor: theme.palette.greenVantty.light
  },
  declined: {
    backgroundColor: "red"
  }
}));

const BookingAvatar = ({ state }) => {
  const classes = useStyles();

  const icon = state => {
    switch (state) {
      case "request":
        return (
          <Avatar className={classes.request}>
            <EventSeatIcon />
          </Avatar>
        );
      case "accepted":
        return (
          <Avatar className={classes.accepted}>
            <CheckIcon />
          </Avatar>
        );
      case "declined":
      case "declined-posponed":
      case "declined-user":
        return (
          <Avatar className={classes.declined}>
            <ClearIcon />
          </Avatar>
        );
      case "completed":
        return (
          <Avatar className={classes.completed}>
            <AttachMoneyIcon />
          </Avatar>
        );
      default:
        return <WarningIcon />;
    }
  };

  return icon(state);
};

export default BookingAvatar;
