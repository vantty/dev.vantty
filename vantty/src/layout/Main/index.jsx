import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Footer, BottomNavbar, Navbar } from "./components";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import { loadUser } from "../../actions/auth";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: "100%"
  }
}));
const Main = props => {
  const { children, getCurrentProfile, loadUser } = props;
  const classes = useStyles();

  useEffect(() => {
    getCurrentProfile();
    loadUser();
  }, []);
  return (
    <div
      className={clsx({
        [classes.root]: true
      })}
    >
      <main className={classes.content}>
        {!isMobile ? <Navbar /> : <BottomNavbar />}
        {children}
        <Footer />
      </main>
    </div>
  );
};
Main.propTypes = {
  children: PropTypes.node,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, loadUser })(
  withRouter(Main)
);
