import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { BookingList } from "./Components";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { changeStateBooking, getUserBookings } from "../../actions/book";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {children}
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
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "white",
    width: "auto"
  },
  appBar: {
    backgroundColor: "white"
  }
}));

const Bookings = ({ getUserBookings, changeStateBooking, auth }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    // changeNavbarValue("bookings");
    getUserBookings(auth && auth.user._id);
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      {/* <AppBar position='static' className={classes.appBar}> */}
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="New" {...a11yProps(0)} />
        <Tab label="All" {...a11yProps(1)} />
        {/* <Tab label='Item Three' {...a11yProps(2)} /> */}
      </Tabs>
      {/* </AppBar> */}
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <BookingList
            book={auth.bookings && auth.bookings}
            changeStateBooking={changeStateBooking}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <BookingList />
        </TabPanel>
        {/* <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel> */}
      </SwipeableViews>
    </div>
  );
};

Bookings.propTypes = {
  getUserBookings: PropTypes.func,
  changeStateBooking: PropTypes.func,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {
  getUserBookings,
  changeStateBooking
})(withRouter(Bookings));
