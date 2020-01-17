import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Container } from "@material-ui/core";
import { BookingCard } from "./components";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
    color: "black",
    backgroundColor: "white"
  },
  title: {
    marginLeft: theme.spacing(1),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ booking, changeStateBooking }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size="small" variant="contained" onClick={handleClickOpen}>
        View
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Container maxWidth="sm">
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Container>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
          <BookingCard
            booking={booking}
            changeStateBooking={changeStateBooking}
          />
        </Container>
      </Dialog>
    </div>
  );
}
