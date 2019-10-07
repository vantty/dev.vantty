import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";

import { Footer } from "./components";
import { Navbar } from "../../components";
import { isMobile } from "react-device-detect";
import BottomNavbar from "../../components/BottomNavbar";

const useStyles = makeStyles(theme => ({
  root: {
    // paddingTop: 26,
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

const Main = props => {
  const { children, match } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true
  });

  return (
    <div
      className={clsx({
        [classes.root]: true
        // [classes.shiftContent]: isDesktop
      })}
    >
      {/* <Topbar onSidebarOpen={handleSidebarOpen} /> */}

      <main className={classes.content}>
        {!isMobile ? <Navbar /> : <BottomNavbar />}
        {children}
        <Footer />
      </main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
