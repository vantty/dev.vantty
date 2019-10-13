// import React from "react";
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import {
  ReactiveBase,
  DataSearch,
  MultiDataList
} from "@appbaseio/reactivesearch";
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

  const [values, setValues] = useState("");
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
            <Button color='inherit' onClick={close}>
              Apply
            </Button>
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
