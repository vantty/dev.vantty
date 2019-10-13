import React, { useState } from "react";

// Components
import { Modal } from "./components";
// import vantty from "../../../../assets/logos/vantty.png";
import vantty from "../../../../assets/logos/9.png";
// Material-UI
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  appbar: {
    backgroundColor: theme.palette.greenVantty.main
  },

  avatar: {
    width: 60,
    height: 60,
    marginRight: "1rem"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

export default function SearchAppBar({ children, modal }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.grow}>
      <AppBar position='static' className={classes.appbar}>
        <Toolbar>
          <img src={vantty} className={classes.avatar} />
          <Typography className={classes.title} variant='h6' noWrap>
            Vantty
          </Typography>
          <div>{children}</div>

          <div className={classes.grow} />

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-haspopup='true'
              onClick={handleClickOpen("paper")}
              color='inherit'
            >
              <FilterListIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {open && <Modal open={open} close={handleClose} modal={modal} />}
    </div>
  );
}
