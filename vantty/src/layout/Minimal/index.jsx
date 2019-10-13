import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { isMobile } from "react-device-detect";

// Components
import { Footer, Navbar } from "../Main/components";

// Material-UI
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: "100%"
  }
}));

const Minimal = props => {
  const { children } = props;
  const classes = useStyles();
  return (
    <div
      className={clsx({
        [classes.root]: true
      })}
    >
      <main className={classes.content}>
        {!isMobile && <Navbar />}
        {children}
        {!isMobile && <Footer />}
      </main>
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node
};

export default Minimal;
