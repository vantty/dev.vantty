import React, { Fragment } from "react";
import { AppBar, Toolbar, IconButton, Divider, Grid } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MuiLink from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import TuneIcon from "@material-ui/icons/Tune";

const useStyles = makeStyles(theme => ({
  root: {
    background: "transparent",
    boxShadow: "none",
    paddingRight: "-35%",
    flexGrow: 1,
    height: "3rem"
  },
  buttonSetting: {
    float: "right"
  },
  input: {
    display: "none"
  },
  settings: {
    float: "right",
    fontSize: "26px",
    marginLeft: 0
    // fontWeight: "ligther",
    // marginTop: "1rem"
  },

  tuneIn: {
    // position: "relative",
    float: "right",
    alignContent: "left"
    // fontSize: "26px"
    // fontWeight: "ligther"
    // marginTop: "1rem"
  },

  toolbar: {
    flexGrow: 1
  }
}));

const SimpleAppBar = ({ history, path, owner }) => {
  const classes = useStyles();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div>
      <Fragment>
        <AppBar position='static' color='default' className={classes.root}>
          <Toolbar>
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
            >
              {path ? (
                <Fragment>
                  <MuiLink
                    underline='none'
                    color='inherit'
                    component={Link}
                    // onClick={handleBack}
                    to={path}
                  >
                    <IconButton className={classes.arrowBack}>
                      <ArrowBackIcon />
                    </IconButton>
                  </MuiLink>
                </Fragment>
              ) : (
                <MuiLink underline='none' color='inherit' onClick={handleBack}>
                  <IconButton className={classes.arrowBack}>
                    <ArrowBackIcon />
                  </IconButton>
                </MuiLink>
              )}
              {owner && (
                <div className={classes.tuneIn}>
                  <MuiLink
                    underline='none'
                    color='inherit'
                    component={Link}
                    to={owner}
                  >
                    <IconButton>
                      <TuneIcon />
                    </IconButton>
                  </MuiLink>
                </div>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
        <Divider />
      </Fragment>
    </div>
  );
};

export default withRouter(SimpleAppBar);
