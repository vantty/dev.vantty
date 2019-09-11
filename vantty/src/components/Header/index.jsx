import React, { Fragment } from "react";

// Material-UI
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles(theme => ({
  header: {
    paddingTop: theme.spacing(10)
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
