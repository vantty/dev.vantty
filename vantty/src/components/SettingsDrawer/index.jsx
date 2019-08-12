import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MuiLink from "@material-ui/core/Link";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";

const useStyles = makeStyles({
  list: {
    width: "auto"
  },
  fullList: {
    width: "auto"
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
    fontWeight: "ligther"
  },
  arrowBack: {
    float: "left",
    fontSize: "26px",
    fontWeight: "ligther",
    marginTop: "1rem"
  }
});

const SettingsDrawer = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
    "Edit Profile": "/dashboard",
    "Change Password": "/",
    "Change Lenguage": "/",
    "Privacy Policy": "/",
    "Terms & Conditions": "/",
    "Add Porfolio": "/add-portfolio",
    "Add Education": "add-education",
    "Delete My Account": "/"
  });
  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <h3>Settings</h3>
      <List>
        {[
          "Edit Profile",
          "Change Password",
          "Change Lenguage",
          "Privacy Policy",
          "Terms & Conditions",
          "Add Porfolio",
          "Add Education",
          "Delete My Account"
        ].map((text, index) => (
          <Fragment>
            <ListItem button key={text} component={Link} to={`${state[text]}`}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <MuiLink
        underline='none'
        color='inherit'
        onClick={toggleDrawer("right", true)}
      >
        <SettingsIcon className={classes.settings} />
      </MuiLink>

      <SwipeableDrawer
        anchor='right'
        open={state.right}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {sideList()}
      </SwipeableDrawer>
    </div>
  );
};

export default SettingsDrawer;
