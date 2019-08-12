import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import ArrowBackMui from "@material-ui/icons/ArrowBackIosOutlined";
import LinkMui from "@material-ui/core/Link";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  arrowBack: {
    float: "left",
    fontSize: "26px",
    fontWeight: "ligther"
    // marginTop: "1rem"
  }
}));

export default function ArrowBack({ page }) {
  const classes = useStyles();
  return (
    <Fragment>
      <LinkMui underline='none' color='inherit' component={Link} to={page}>
        <ArrowBackMui className={classes.arrowBack} />
      </LinkMui>
    </Fragment>
  );
}

// export default ArrowBack;
