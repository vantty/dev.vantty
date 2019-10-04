import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Container, Paper, ListSubheader, Hidden } from "@material-ui/core";
import { pagesProfile, pagesUser } from "../../list";
import { Redirect, Link as RouterLink, withRouter } from "react-router-dom";
//actions
import { connect } from "react-redux";
import { getProfileById, getCurrentProfile } from "../../../../actions/profile";
import { loadUser, logout } from "../../../../actions/auth";

// import Navbar from "../../components/Navbar";
import LinkMui from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import { minWidth } from "@material-ui/system";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { isOwner } from "../../../../helpers";
import { isMobile } from "react-device-detect";
import { SimpleAppBar } from "../../../../components";

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

const Table = ({
  match,
  getCurrentProfile,
  profile: { profile, loading },
  loadUser,
  logout,
  auth,
  history,
  getProfileById
}) => {
  const classes = useStyles();

  useEffect(() => {
    // profile &&
    getCurrentProfile(profile ? isOwner(auth, profile.user._id) : true);
    loadUser();
  }, [getCurrentProfile]);

  function ListItemLink(props) {
    return <ListItem button component={Link} {...props} />;
  }

  return (
    <Fragment>
      {!isMobile && match.url === "/settings" && (
        <Redirect to='/personal-info' />
      )}
      <Hidden only={["md", "lg", "xl"]}>
        <SimpleAppBar
          history={history}
          path={
            profile && profile.mobileNumber !== null
              ? `/profile/artist/${profile.user._id}`
              : "/artists"
          }
        />
      </Hidden>
      <div className={classes.root}></div>
      <Container maxWidth='md'>
        <List component='nav' className={classes.root}>
          {profile &&
          isOwner(auth, profile.user._id) &&
          profile.mobileNumber !== null
            ? pagesProfile.map((page, ind) => (
                <div key={page.title}>
                  {/* <Container maxWidth='sm'> */}
                  <ListItemLink
                    href={page.href}
                    to={page.href}
                    selected={page.href === match.url}
                  >
                    <ListItemText primary={page.title} />
                  </ListItemLink>
                  <Divider />
                  {/* </Container> */}
                </div>
              ))
            : pagesUser.map((page, ind) => (
                <div key={page.title}>
                  {/* <Container maxWidth='sm'> */}
                  <ListItemLink
                    href={page.href}
                    to={page.href}
                    selected={page.href === match.url}
                  >
                    <ListItemText primary={page.title} />
                  </ListItemLink>
                  <Divider />
                  {/* </Container> */}
                </div>
              ))}
          {/* <Container maxWidth='sm'> */}
          <ListItem button onClick={logout}>
            <ListItemText primary={"Logout"} />
          </ListItem>
          <Divider />
          {/* </Container> */}
        </List>
      </Container>
      {/* </Hidden> */}
    </Fragment>
  );
};

Table.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById, getCurrentProfile, loadUser, logout }
)(Table);

// {profile &&
//   isOwner(auth, profile.user._id) &&
//   profile.mobileNumber !== null ? (
//     isMobile ? (
//       <Settings pages={pagesProfile} id={auth.user._id} />
//     ) : (
//       <DashDesktop
//         pages={pagesProfile}
//         id={auth.user._id}
//         logout={logout}
//       />
//     )
//   ) : isMobile ? (
//     <Settings pages={pagesUser} />
//   ) : (
//     <DashDesktop pages={pagesUser} />
//   )}
// </Fragment>
// )}
