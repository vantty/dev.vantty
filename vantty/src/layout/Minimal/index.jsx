import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { isMobile } from "react-device-detect";

// Components
import { Footer, Navbar } from "../Main/components";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

///actions
import { getCurrentProfile } from "../../actions/profile";
import { loadUser } from "../../actions/auth";

// Material-UI
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    // height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    // height: "100%"
  }
}));

const Minimal = props => {
  const { children, loadUser, getCurrentProfile } = props;

  useEffect(() => {
    // getCurrentProfile();
    // loadUser();
  }, []);
  const classes = useStyles();
  return (
    <div
      className={clsx({
        [classes.root]: true
      })}
    >
      <main className={classes.content}>
        {!isMobile && <Navbar />}
        {children}
        {!isMobile && <Footer />}
      </main>
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  uploader: state.uploader
});

export default connect(mapStateToProps, { getCurrentProfile, loadUser })(
  withRouter(Minimal)
);
