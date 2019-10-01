import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LinkMui from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  ListSubheader,
  Container,
  Toolbar,
  Typography,
  Grid,
  Button
} from "@material-ui/core";

import { connect } from "react-redux";

//Actions
import { getProfileById, getCurrentProfile } from "../../../../actions/profile";
import { loadUser } from "../../../../actions/auth";
import { EditPersonalInfo } from "../../../EditForm/components";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 1
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },

  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    left: "12rem" + "!important"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  link: {
    position: "right"
  }
}));

function DashDesktop(props) {
  const { pages, id, logout } = props;
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [component, setComponent] = useState(pages[0].component);

  const onSubmit = (e, component) => {
    e.preventDefault();
    setComponent(component);
  };
  useEffect(() => {
    getCurrentProfile();
    loadUser();
  }, []);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List subheader={<li />}>
        <ListSubheader className={classes.title}>{"Profile"}</ListSubheader>
        {pages.map((page, index) => (
          <span key={page.title}>
            {page.title === "Change Password" && (
              <ListSubheader className={classes.title}>
                {"Account"}
              </ListSubheader>
            )}

            <ListItem
              button
              key={page.title}
              onClick={
                e => onSubmit(e, page.component)
                // page.title === "logout" && logout)
              }
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.title} />
              <Divider />
            </ListItem>
          </span>
        ))}
        <Fragment>
          {/* <LinkMui
            component={Link}
            to={`/profile/artist/${id}`}
            className={classes.link}
          >
            Visit my profile
          </LinkMui> */}
        </Fragment>
      </List>
      {/* <Grid
        container
        direction='column'
        justify='flex-end'
        alignItems='stretch'
      >
        <Grid item>
          <Button
            component={Link}
            style={{ backgroundColor: "rgb(0, 223, 212)" }}
            to={"/create-profile"}
          >
            Create Profile as Artist
          </Button>
        </Grid>
      </Grid> */}
    </div>
  );

  return (
    <Container>
      <Container maxWidth='md'>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='flex-start'
        >
          <Grid item md={4} sm={3}>
            <Hidden smDown implementation='css'>
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant='permanent'
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </Grid>
          <Grid item md={8} sm={12} xl={12}>
            {component}
          </Grid>

          {/* </div> */}
        </Grid>
      </Container>
    </Container>
  );
}

DashDesktop.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */

  profile: PropTypes.object,
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  )
};

export default connect(
  null,
  { loadUser }
)(DashDesktop);
