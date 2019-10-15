import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import { Badge } from "@material-ui/core";
import { ReactiveBase } from "@appbaseio/reactivesearch";
const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
    backgroundColor: theme.palette.purpleVantty.light
  },
  categories: {
    margin: "1rem"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
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
              edge='start'
              color='inherit'
              onClick={close}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            {/* <Typography variant='h6' className={classes.title}>
              Sound
            </Typography> */}
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
