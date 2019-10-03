import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Container, Paper, ListSubheader, Hidden } from "@material-ui/core";
import { pagesProfile } from "../../list";

// import Navbar from "../../components/Navbar";
import LinkMui from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import { minWidth } from "@material-ui/system";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // // backgroundColor: theme.palette.background.paper,
    // display: "flex",
    // height: 300,
    // position: "sticky",
    float: "left",
    // // zIndex: 0,
    // // width: "130px" + "!important",
    // marginRight: "10rem" + "!important",

    // // minWidth: "160px",
    // // maxWidth: "160px",
    // paddingRigth: "20px",
    // position: "relative"
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
  //   paper: {
  // marginTop: "7rem"
  //   }
}));

export default function Table({ index, match }) {
  const classes = useStyles();

  function ListItemLink(props) {
    return <ListItem button component={Link} {...props} />;
  }
  return (
    <Fragment>
      {/* <Hidden xsDown> */}
      <Container maxWidth='lg'>
        <div className={classes.root}></div>
        <List component='nav' className={classes.root}>
          {pagesProfile.map((page, ind) => (
            <div key={page.title}>
              <ListItemLink
                href={page.href}
                to={page.href}
                selected={page.href === match.url}
              >
                <ListItemText primary={page.title} />
              </ListItemLink>
              <Divider />
            </div>
          ))}
        </List>
      </Container>
      {/* </Hidden> */}
    </Fragment>
  );
}
