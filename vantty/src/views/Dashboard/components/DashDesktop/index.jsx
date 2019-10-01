import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Paper,
  ListSubheader,
  Container,
  Toolbar,
  Typography,
  Grid
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { pages } from "../../list";

import { connect } from "react-redux";

//Actions
import { getProfileById, getCurrentProfile } from "../../../../actions/profile";
import { loadUser } from "../../../../actions/auth";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
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
  }
}));

function DashDesktop(props) {
  const {
    container,
    getProfileById,
    getCurrentProfile,
    loadUser,
    profile: { profile, loading },
    auth: { user },
    match,
    history
  } = props;
  const classes = useStyles();
  const theme = useTheme();
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
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
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
              onClick={e => onSubmit(e, page.component)}
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.title} />
              <Divider />
            </ListItem>
          </span>
        ))}
      </List>
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
          <Grid item md={8} sm={9} xl={12}>
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
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  )
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById, getCurrentProfile, loadUser }
)(DashDesktop);
