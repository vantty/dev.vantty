import React, { useState } from "react";

// Components
import { Modal } from "./components";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Badge } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: "white",
    position: "relative"
  },
  logo: {
    height: "100%",
    width: 50,
    marginRight: "1rem"
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  filterIcon: {
    color: theme.palette.greenVantty.dark,
    fontSize: "2rem"
  }
}));

const Logo =
  "https://res.cloudinary.com/vantty/image/upload/v1572320098/seed/zfu1flvxyt4yscytta7g.png";

export default function SearchAppBar({ children, modal, invisible }) {
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
      <AppBar className={classes.appBar}>
        <Toolbar>
          <img src={Logo} className={classes.logo} alt='' />
          <div>{children}</div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-haspopup='true'
              onClick={handleClickOpen("paper")}
              color='inherit'
            >
              <Badge color='secondary' variant='dot' invisible={!invisible[0]}>
                <FilterListIcon className={classes.filterIcon} />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {open && <Modal open={open} close={handleClose} modal={modal} />}
    </div>
  );
}
