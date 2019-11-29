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
    backgroundColor: theme.palette.background.paper
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    marginRight: `3rem !important`,
    float: "left",
    minWidth: "130px",
    maxWidth: "130px"
  },
  arrow: {
    marginLeft: "7px",
    color: theme.palette.text.primary,
    fontSize: "18px"
  }
}));

const SettingsProfile = ({ match, pages, logout }) => {
  const classes = useStyles();

  function ListItemLink(props) {
    return <ListItem button component={Link} {...props} />;
  }

  return (
    <Fragment>
      <div className={classes.root}></div>
      <List component='nav' className={classes.root}>
        {pages.map((page, ind) => (
          <div key={page.title}>
            <Container maxWidth='md'>
              <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='center'
              >
                <Grid item xs={11} md={12} lg={12} xl={12}>
                  <ListItemLink
                    href={page.href}
                    to={page.href}
                    selected={page.href === match.url}
                  >
                    <ListItemText primary={page.title} />
                  </ListItemLink>
                </Grid>
                <Grid item xs={1}>
                  {isMobile && (
                    <ArrowForwardIosIcon className={classes.arrow} />
                  )}
                </Grid>
              </Grid>
            </Container>
            <Divider />
          </div>
        ))}
        <Container maxWidth='md'>
          {isMobile && (
            <ListItemLink to={"/create-profile"}>
              <ListItemText primary={"Become to an Artists"} />
            </ListItemLink>
          )}
          {!isMobile && (
            <ListItem button onClick={logout}>
              <ListItemText primary={"Logout"} />
            </ListItem>
          )}
          {/* <ListItemLink to={"/settings/account"}>
            <ListItemText primary={"Account"} />
          </ListItemLink> */}
        </Container>
        <Divider />
      </List>
    </Fragment>
  );
};

SettingsProfile.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(SettingsProfile);
