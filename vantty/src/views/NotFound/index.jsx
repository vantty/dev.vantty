import React, { Fragment } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {},
  text: {
    margin: "4rem",
    padding: "4rem"
  }
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Container maxWidth="md">
        <span className={classes.text}>
          <h1>Page not found</h1>
          <p>Sorry, this page does not exist</p>
        </span>
      </Container>
    </Fragment>
  );
};

export default NotFound;
