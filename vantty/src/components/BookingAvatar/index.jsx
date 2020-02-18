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
  avatar: {
    backgroundColor: theme.palette.greenVantty.main
  }
}));

const icon = state => {
  switch (state) {
    case "request":
      return <EventSeatIcon />;
    case "accepted":
      return <CheckIcon />;
    case "declined":
    case "declined-posponed":
    case "declined-user":
      return <ClearIcon />;
    case "completed":
      return <AttachMoneyIcon />;
    default:
      return <WarningIcon />;
  }
};

const BookingAvatar = ({ state }) => {
  const classes = useStyles();
  return <Avatar className={classes.avatar}>{icon(state)}</Avatar>;
};

export default BookingAvatar;
