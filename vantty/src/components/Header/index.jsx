import React, { Fragment } from "react";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles(theme => ({
  header: {
    paddingTop: "50px"
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <Fragment>
      {!isMobile ? <header className={classes.header} /> : null}
    </Fragment>
  );
};

export default Header;
