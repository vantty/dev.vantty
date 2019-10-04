import React from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
//Components
import ProgressBarForm from "../ProgressBar";

//Material
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  typography: {
    color: "#000000"
  },
  appBar: {
    backgroundColor: "#ffffff",
    height: "3rem"
  },
  grow: {
    flexGrow: 1
  }
}));

const SimpleAppBar = ({ step, page }) => {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Container maxWidth='md'>
            <MuiLink
              underline='none'
              color='inherit'
              component={Link}
              to={"/home"}
            >
              <Typography
                variant='h6'
                color='inherit'
                noWrap
                className={classes.typography}
                type='title'
              >
                Vantty
              </Typography>
            </MuiLink>
          </Container>
        </Toolbar>
        {step && <ProgressBarForm value={step} />}
      </AppBar>
    </div>
  );
};

export default SimpleAppBar;
