import React, { Fragment } from "react";

//Materila-UI
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Container, AppBar, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  appBar: {
    top: "auto",
    bottom: 0
  }
}));

const SimpleBottomNav = ({ step, Children }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <AppBar position='fixed' color='inherit' className={classes.appBar}>
        <Container maxWidth='sm'>
          <Toolbar>
            {step !== undefined && (
              <Typography
                style={{ color: "#bdbdbd" }}
              >{`${step} / 4`}</Typography>
            )}
            <div className={classes.grow} />
            {Children}
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  );
};

export default SimpleBottomNav;
