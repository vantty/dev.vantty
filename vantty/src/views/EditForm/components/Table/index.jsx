import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Container, Paper } from "@material-ui/core";
// import { pages } from "./list";

// import Navbar from "../../components/Navbar";
import LinkMui from "@material-ui/core/Link";
import { Link } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 2,
    // backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 300,
    // position: "center",
    // marginTop: "7rem"
    // zIndex: 0,
    width: "120px" + "!important",
    marginRight: "1rem" + "!important"
    // position: "relative"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    marginRight: "1rem" + "!important"
  }
  //   paper: {
  // marginTop: "7rem"
  //   }
}));

export default function Table({ page, title, index }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      {/* <Navbar /> */}
      <Container maxWidth='xs'>
        {/* <Paper className={classes.paper}> */}
        <div className={classes.root}>
          <Tabs
            orientation='vertical'
            // variant='scrollable'
            value={value}
            onChange={handleChange}
            aria-label='Vertical tabs example'
            className={classes.tabs}
          >
            <Fragment>
              {/* <LinkMui component={Link} to={page} className={classes.link}> */}
              <Tab
                label={title}
                {...a11yProps(index)}
                className={classes.tab}
              />
              {/* </LinkMui> */}
            </Fragment>
          </Tabs>
          {/* <TabPanel value={value} index={index}>
            {"Hello"}
          </TabPanel> */}
        </div>
        {/* </Paper> */}
      </Container>
    </Fragment>
  );
}
