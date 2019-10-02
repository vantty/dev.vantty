import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Container, Paper } from "@material-ui/core";
import { pages } from "./list";
import { Price, AddPortfolio, Categories } from "../Form/components";
import Navbar from "../../components/Navbar";
import LinkMui from "@material-ui/core/Link";
import { Link } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={7}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 500,
    // position: "center",
    marginTop: "7rem"
    // position: "relative"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  paper: {
    marginTop: "7rem"
  }
}));

export default function Dashb({ page, title, index }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Navbar />
      <Container maxWidth='md'>
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
              <Tab label={title} {...a11yProps(index)} />
              {/* </LinkMui> */}
            </Fragment>
          </Tabs>
          <TabPanel value={value} index={index}>
            {"."}
          </TabPanel>
        </div>
        {/* </Paper> */}
      </Container>
    </Fragment>
  );
}
