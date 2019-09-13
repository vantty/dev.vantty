import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "./components/AppBar";
import Toolbar, { styles as toolbarStyles } from "./components/Toolbar";
import LogoAloneWhite from "../../../assets/logos/LogoAloneWhite.png";

const styles = theme => ({
  root: {
    position: "absolute",
    backgroundColor: "#13e0d9"
  },
  title: {
    fontSize: 24
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between"
  },
  left: {
    flex: 1
  },
  leftLinkActive: {
    color: theme.palette.common.white
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end"
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3)
  },
  linkSecondary: {
    color: theme.palette.secondary.main
  },
  logo: {
    marginTop: theme.spacing(28)
  }
});

function AppAppBar(props) {
  const { classes } = props;

  return (
    <div>
      <AppBar className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />

          <img
            src={LogoAloneWhite}
            width="200"
            alt="Logo Vantty"
            className={classes.logo}
          />

          <div className={classes.right}></div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppAppBar);
