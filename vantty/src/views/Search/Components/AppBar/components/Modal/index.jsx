import React, { forwardRef } from "react";

// material-UI
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import ArrowUp from "@material-ui/icons/KeyboardArrowUp";

import { ReactiveBase } from "@appbaseio/reactivesearch";
const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
    backgroundColor: theme.palette.greenVantty.dark
  },
  categories: {
    margin: "1rem"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  arrowUp: {
    fontSize: "40px"
  },
  icon: {
    padding: 0
  }
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} timeout={400} />;
});
export default function Modal({ open, close, modal }) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={close}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="end"
              color="inherit"
              onClick={close}
              aria-label="close"
              className={classes.icon}
            >
              <ArrowUp className={classes.arrowUp} />
            </IconButton>
            {/* <Button color='inherit' onClick={close}>
            <Button color="inherit" onClick={close}>
              Apply
            </Button> */}
          </Toolbar>
        </AppBar>

        <ReactiveBase
          app={process.env.REACT_APP_APPBASE_INDEX}
          credentials={process.env.REACT_APP_APPBASE_CREDENTIALS}
        >
          <form className={classes.categories}>{modal}</form>
        </ReactiveBase>
      </Dialog>
    </div>
  );
}
