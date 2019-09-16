import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

//Actions
import { getProfileById, getCurrentProfile } from "../../actions/profile";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MuiLink from "@material-ui/core/Link";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import { Divider, Drawer, Container, ListSubheader } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ImageIcon from "@material-ui/icons/Image";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import LockOpenIcon from "@material-ui/icons/LockOpen";
import { SimpleAppBar } from "../../components";
import { AppBarSettings } from "./components";
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

  arrowBack: {
    float: "left",
    fontSize: "26px",
    fontWeight: "ligther",
    marginTop: "1rem"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0
  },
  title: {
    backgroundColor: "#FAFAFA",
    height: "25px",
    lineHeight: "1.5"
  }
});

const Settings = ({
  getProfileById,
  getCurrentProfile,
  profile: { profile, loading },
  auth,
  match,
  history
}) => {
  const classes = useStyles();
  useEffect(() => {
    getCurrentProfile();
  }, []);
  const pages = [
    {
      title: "Profile Image",
      href: "/personal-info",
      icon: <PeopleIcon />
    },
    {
      title: "Profile",
      href: "/edit-profile",
      icon: <LockOpenIcon />
    },
    {
      title: "Portfolio",
      href: "/add-portfolio",
      icon: <ImageIcon />
    },
    {
      title: "Service",
      href: "/price",
      icon: <ImageIcon />
    },
    {
      title: "Mobile",
      href: "/mobile",
      icon: <ShoppingBasketIcon />
    },

    {
      title: "Account",
      href: "/account",
      icon: <AccountBoxIcon />
    },
    {
      title: "Change Password",
      href: "/password",
      icon: <ImageIcon />
    },

    {
      title: "Settings",
      href: "/settings",
      icon: <SettingsIcon />
    }
  ];

  const sideList = side => (
    <div className={classes.list}>
      <AppBarSettings id={profile && profile.user._id} />
      <br />
      <Container>
        <List subheader={<li />}>
          <ListSubheader className={classes.title}>{"Profile"}</ListSubheader>
          {pages.map((page, index) => (
            <Fragment>
              {page.title === "Account" && (
                <ListSubheader className={classes.title}>
                  {"Account"}
                </ListSubheader>
              )}
              <ListItem
                button
                key={page.title}
                component={Link}
                to={`${page.href}`}
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.title} />
                <Divider />
              </ListItem>
            </Fragment>
          ))}
        </List>
      </Container>
    </div>
  );

  return <div>{sideList()}</div>;
};

Settings.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileById, getCurrentProfile }
)(Settings);
