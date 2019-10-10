import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Container } from "@material-ui/core";
import { Redirect, Link as RouterLink, withRouter } from "react-router-dom";
//actions
import { connect } from "react-redux";

import { loadUser, logout } from "../../../../actions/auth";

// import Navbar from "../../components/Navbar";
import LinkMui from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { isOwner } from "../../../../helpers";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: "sticky",
    float: "left",
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    marginRight: "3rem" + "!important",
    float: "left",
    minWidth: "130px",
    maxWidth: "130px"
  }
}));

const SettingsProfile = ({ match, logout, pagesProfile }) => {
  const classes = useStyles();

  function ListItemLink(props) {
    return <ListItem button component={Link} {...props} />;
  }

  return (
    <Fragment>
      <div className={classes.root}></div>
      <List component='nav' className={classes.root}>
        {pagesProfile.map((page, ind) => (
          <div key={page.title}>
            {/* <Container maxWidth='sm'> */}
            <Container maxWidth='md'>
              <ListItemLink
                href={page.href}
                to={page.href}
                selected={page.href === match.url}
              >
                <ListItemText primary={page.title} />
              </ListItemLink>
            </Container>
            <Divider />
            {/* </Container> */}
          </div>
        ))}
        {/* <Container maxWidth='sm'> */}
        <Container maxWidth='md'>
          <ListItem button onClick={logout}>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </Container>
        <Divider />
        {/* </Container> */}
      </List>
      {/* </Hidden> */}
    </Fragment>
  );
};

SettingsProfile.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(
  null,
  { logout }
)(SettingsProfile);
