import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import { pages } from "../../list";
//Actions
import { getProfileById, getCurrentProfile } from "../../../../actions/profile";
import { loadUser } from "../../../../actions/auth";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { Divider, Drawer, Container, ListSubheader } from "@material-ui/core";

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
