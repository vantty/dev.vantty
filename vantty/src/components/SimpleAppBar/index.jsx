import React, { Fragment } from "react";
import { AppBar, Toolbar, IconButton, Divider } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MuiLink from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  buttonSetting: {
    float: "right"
  },
  input: {
    display: "none"
  },
  settings: {
    float: "right",
    fontSize: "26px"
    // fontWeight: "ligther",
    // marginTop: "1rem"
  },

  arrowBack: {
    // float: "left"
    // fontSize: "26px"
    // fontWeight: "ligther"
    // marginTop: "1rem"
  },
  appbar: {
    background: "transparent",
    boxShadow: "none",
    // paddingRight: "-35%",
    height: "3rem"
  },
  toolbar: {
    flexGrow: 1
  }
}));

const SimpleAppBar = ({ history }) => {
  const classes = useStyles();

  const handleBack = () => {
    history.goBack(-2);
  };

  return (
    <div>
      <Fragment>
        <AppBar position='static' color='default' className={classes.appbar}>
          <Toolbar>
            <IconButton onClick={handleBack} className={classes.arrowBack}>
              <ArrowBackIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Divider />
      </Fragment>
    </div>
  );
};

export default SimpleAppBar;
