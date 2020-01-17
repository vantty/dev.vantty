import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Container, Grid } from "@material-ui/core";
import Slider from "../Slider";

// const useStyles = makeStyles(theme => ({
//   appBar: {
//     position: "relative"
//   },
//   title: {
//     marginLeft: theme.spacing(2),
//     flex: 1
//   }
// }));

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: "#FAFAFA",
    overflow: "hidden",
    position: "fixed",
    bottom: 0,
    border: "grey",
    marginBottom: "1remknm  "
  },

  button: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    width: "10rem",
    float: "right",
    color: "white",
    boxShadow: "none",
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.greenVantty.light
    }
  },
  price: {
    color: theme.palette.purpleVantty.light,
    fontSize: "22px"
  },
  infoPrice: {
    fontSize: "10px"
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  buttonDrawer: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    marginRight: "0.5rem",
    marginLeft: "0.5rem",
    width: "10rem",
    float: "right",
    backgroundColor: theme.palette.greenVantty.main,
    color: "white"
  },
  appBar: {
    color: "black",
    backgroundColor: "white"
  },
  toolbar: {
    backgroundColor: "grey"
  },
  buttom: {
    // margin: "2rem"
  },
  book: {
    paddingTop: "-4rem"
  },
  wtsp: {
    backgroundColor: theme.palette.greenVantty.main
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  profile,
  onChangeDate,
  state,
  loadService
}) {
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
      <Fragment>
        <div className={classes.root}>
          <Container maxWidth="md">
            <Fragment>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Grid item>
                  <h4 className={classes.price}>
                    ${profile.price}{" "}
                    <span className={classes.infoPrice}>/cad start</span>
                  </h4>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.button}
                    onClick={handleClickOpen}
                    variant="contained"
                  >
                    Book
                  </Button>
                </Grid>
              </Grid>
            </Fragment>
          </Container>
        </div>
      </Fragment>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <span className={classes.book}>
            <Slider
              profile={profile}
              onChangeDate={onChangeDate}
              state={state}
              loadService={loadService}
            />
          </span>
        </List>
      </Dialog>
    </div>
  );
}
