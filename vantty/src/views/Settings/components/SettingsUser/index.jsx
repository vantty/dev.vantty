import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { isMobile } from "react-device-detect";
import { logout } from "../../../../actions/auth";
import { connect } from "react-redux";
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
const SettingsUser = ({ match, pages, logout, profile, deleteAccount }) => {
  const classes = useStyles();

  function ListItemLink(props) {
    return <ListItem button component={Link} {...props} />;
  }

  return (
    <Fragment>
      <List component='nav'>
        <Container maxWidth='md'>
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
          >
            <Grid item xs={11} md={12} lg={12} xl={12}>
              <ListItemLink
                to={profile ? "settings/profile" : "/personal-info"}
                className={classes.listItem}
              >
                <ListItemText primary={"Profile"}></ListItemText>
              </ListItemLink>
            </Grid>
            <Grid item xs={1}>
              {isMobile && <ArrowForwardIosIcon className={classes.arrow} />}
            </Grid>
          </Grid>
          <Divider />

          {/* 2 */}
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
          >
            <Grid item xs={11} md={12} lg={12} xl={12}>
              <ListItemLink
                to={profile ? "/bookings" : "/bookings-user"}
                className={classes.listItem}
              >
                <ListItemText primary={"Bookings"}></ListItemText>
              </ListItemLink>
            </Grid>
            <Grid item xs={1}>
              {isMobile && <ArrowForwardIosIcon className={classes.arrow} />}
            </Grid>
          </Grid>
          <Divider />
          {/* 3 */}
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
          >
            <Grid item xs={11} md={12} lg={12} xl={12}>
              <ListItemLink
                to={profile ? "/bank" : "/payments"}
                className={classes.listItem}
              >
                <ListItemText primary={"Banking"}></ListItemText>
              </ListItemLink>
            </Grid>
            <Grid item xs={1}>
              {isMobile && <ArrowForwardIosIcon className={classes.arrow} />}
            </Grid>
          </Grid>
          <Divider />
          {/* 4 */}
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
          >
            <Grid item xs={11} md={12} lg={12} xl={12}>
              <ListItemLink
                to={"settings/account"}
                className={classes.listItem}
              >
                <ListItemText primary={"Account"}></ListItemText>
              </ListItemLink>
            </Grid>
            <Grid item xs={1}>
              {isMobile && <ArrowForwardIosIcon className={classes.arrow} />}
            </Grid>
          </Grid>
          <Divider />
          {/* 5 */}
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
          >
            <Grid item xs={11} md={12} lg={12} xl={12}>
              <ListItemLink to={"/help"} className={classes.listItem}>
                <ListItemText primary={"Help Center"}></ListItemText>
              </ListItemLink>
            </Grid>
            <Grid item xs={1}>
              {isMobile && <ArrowForwardIosIcon className={classes.arrow} />}
            </Grid>
          </Grid>
          <Divider />

          {/* <Container maxWidth='md'> */}
          {isMobile && (
            <ListItem button onClick={logout} className={classes.listItem}>
              <ListItemText primary={"Logout"} />
            </ListItem>
          )}
          {/* </Container> */}
        </Container>

        <Divider />
        {/* </Container> */}
      </List>
    </Fragment>
  );
};

SettingsUser.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(SettingsUser);
