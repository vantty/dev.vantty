import React, { Fragment } from "react";
import { Link } from "react-router-dom";

//Materila-UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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

const SimpleBottomNav = ({ step, backPage, nextPage, disabled }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <AppBar position='fixed' color='inherit' className={classes.appBar}>
        <Container maxWidth='sm'>
          <Toolbar>
            <Typography
              style={{ color: "#bdbdbd" }}
            >{`${step} / 3`}</Typography>

            <div className={classes.grow} />
            <Button
              disabled={step === 1}
              component={Link}
              to={backPage}
              className={classes.backButton}
            >
              Back
            </Button>
            {nextPage === "" ? (
              <Button
                style={{ backgroundColor: "#f5ff" }}
                disabled={disabled}
                type='submit'
                variant='outlined'
                color='inherit'
              >
                {step === 3 ? "Finish" : "Next"}
              </Button>
            ) : (
              <Button
                style={{ color: "#f5ff" }}
                component={Link}
                to={nextPage}
                variant='outlined'
                color='inherit'
              >
                {"Next"}
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  );
};

export default SimpleBottomNav;
