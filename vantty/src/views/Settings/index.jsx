import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

//Actions
import { getProfileById, getCurrentProfile } from "../../actions/profile";
import { loadUser } from "../../actions/auth";

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
  loadUser,
  profile: { profile, loading },
  auth: { user },
  match,
  history
}) => {
  const classes = useStyles();
  useEffect(() => {
    getCurrentProfile();
    loadUser();
  }, []);
  const pages = [
    {
      title: "Profile Image",
      href: "/personal-info",
      icon: <PeopleIcon />
    },
    {
      title: "Biografy",
      href: "/edit-profile",
      icon: <ImageIcon />
    },

    {
      title: "Portfolio",
      href: "/add-portfolio",
      icon: <ImageIcon />
    },
    {
      title: "Categories",
      href: "/categories",
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
      title: "**Change Password",
      href: "/password",
      icon: <ImageIcon />
    },
    {
      title: "D == Create profile",
      href: "/create-profile",
      icon: <LockOpenIcon />
    },

    {
      title: "D == Main Page",
      href: "/",
      icon: <SettingsIcon />
    },
    {
      title: "D == Dashboard",
      href: "/Dashboard",
      icon: <SettingsIcon />
    }
  ];

  const pagesUser = [
    {
      title: "Profile Image",
      href: "/personal-info",
      icon: <PeopleIcon />
    },
    {
      title: "Profile",
      href: "/edit-profile",
      icon: <LockOpenIcon />
    }
  ];

  const sideList = side => (
    <div className={classes.list}>
      <AppBarSettings id={user && user._id} />
      <Container>
        <br />
        <List subheader={<li />}>
          <ListSubheader className={classes.title}>{"Profile"}</ListSubheader>
          {pages.map((page, index) => (
            <span key={page.title}>
              {page.title === "**Change Password" && (
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
            </span>
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
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById, getCurrentProfile, loadUser }
)(Settings);
