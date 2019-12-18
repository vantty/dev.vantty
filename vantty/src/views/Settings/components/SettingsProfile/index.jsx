import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, ListItemText } from "@material-ui/core";
//actions
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

import { logout } from "../../../../actions/auth";
import { deleteAccount } from "../../../../actions/profile";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: "sticky",
    float: "left",
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    fontSize: "20px"
  },
  tabs: {
    borderRight: `4px solid ${theme.palette.divider}`,
    marginRight: `3rem !important`,
    float: "left",
    minWidth: "130px",
    maxWidth: "130px",
    color: theme.palette.common.black
  },
  title: {
    color: theme.palette.text.primary,
    backgroundColor: "#F3F3F3",
    paddingTop: "0.09rem" + "!important",
    paddingBottom: "0.09rem" + "!important"
  },
  listItem: {
    paddingTop: "0.2rem" + "!important",
    paddingBottom: "0.2rem" + "!important"
  },
  arrow: {
    marginLeft: "7px",
    color: theme.palette.text.primary,
    fontSize: "16px"
  }
}));

const SettingsProfile = ({ match, logout, pages, user, deleteAccount }) => {
  const classes = useStyles();

  function ListItemLink(props) {
    return <ListItem button component={Link} {...props} />;
  }

  return (
    <Fragment>
      <List component="nav">
        <Container maxWidth="md">
          <ListItem className={classes.title}>
            <ListItemText primary={"Manage"} />
          </ListItem>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={11} md={12} lg={12} xl={12}>
              <ListItemLink to={"/bookings"} className={classes.listItem}>
                <ListItemText
                  primary={"Booking"}
                  // className={classes.title}
                />
              </ListItemLink>
            </Grid>
            {isMobile && <ArrowForwardIosIcon className={classes.arrow} />}
            <Grid item xs={11} md={12} lg={12} xl={12}>
              <Divider />
            </Grid>
            <Grid item xs={11} md={12} lg={12} xl={12}>
              <ListItemLink to={"/bank"} className={classes.listItem}>
                <ListItemText
                  primary={"Bank info"}
                  // className={classes.title}
                />
              </ListItemLink>
            </Grid>

            {isMobile && <ArrowForwardIosIcon className={classes.arrow} />}
            <Divider />
          </Grid>

          <ListItem className={classes.title}>
            <ListItemText primary={"Update Profile"} />
          </ListItem>
        </Container>

        {pages.map((page, ind) => (
          <div key={page.title}>
            {/* <Container maxWidth='sm'> */}
            <Container maxWidth="md">
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={11} md={12} lg={12} xl={12}>
                  <ListItemLink
                    href={page.href}
                    to={page.href}
                    selected={page.href === match.url}
                    className={classes.listItem}
                  >
                    <ListItemText
                      primary={page.title}
                      // className={classes.title}
                    >
                      {/* <Typography variant='h5'>{page.title}</Typography> */}
                    </ListItemText>
                  </ListItemLink>
                </Grid>
                <Grid item xs={1}>
                  {isMobile && (
                    <ArrowForwardIosIcon className={classes.arrow} />
                  )}
                </Grid>
              </Grid>
              <Divider />
              {/* </Container> */}
            </Container>
          </div>
        ))}
        {/* <Container maxWidth='sm'> */}
        <Container maxWidth="md">
          <ListItem className={classes.title}>
            <ListItemText primary={"Account"} />
          </ListItem>
          {isMobile && (
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={11} md={12} lg={12} xl={12}>
                <ListItemLink
                  to={"/settings/account"}
                  className={classes.listItem}
                >
                  <ListItemText
                    primary={"Detalils"}
                    // className={classes.title}
                  />
                </ListItemLink>
              </Grid>

              <Grid item xs={1}>
                <ArrowForwardIosIcon className={classes.arrow} />
              </Grid>
              <Grid item xs={11} md={12} lg={12} xl={12}>
                <ListItemLink to={"/help-center"} className={classes.listItem}>
                  <ListItemText
                    primary={"Help Center"}
                    // className={classes.title}
                  />
                </ListItemLink>
              </Grid>

              <Grid item xs={1}>
                <ArrowForwardIosIcon className={classes.arrow} />
              </Grid>
            </Grid>
          )}
          <ListItem button onClick={deleteAccount} className={classes.listItem}>
            <ListItemText primary={"Delete Account"} />
          </ListItem>
          {!isMobile && (
            <ListItem button onClick={logout} className={classes.listItem}>
              <ListItemText primary={"Logout"} />
            </ListItem>
          )}
        </Container>
        <Divider />
        {/* </Container> */}
      </List>
      {/* </Hidden> */}
    </Fragment>
  );
};

SettingsProfile.propTypes = {
  logout: PropTypes.func,
  deleteAccount: PropTypes.func
};

export default connect(null, { logout, deleteAccount })(SettingsProfile);
