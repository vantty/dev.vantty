import React, { useEffect, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Components
import AppBarForm from "../../../components/ComponentsForm/AppBar";

//actions
import { getCurrentProfile } from "../../../actions/profile";

//Material-UI
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Progress from "@material-ui/core/LinearProgress";

import Style from "../style";
import { Container } from "@material-ui/core";

const FrameForm = ({
  profile: { profile, loading },
  getCurrentProfile,
  Children
}) => {
  const classes = Style();
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return (
    <Fragment>
      <CssBaseline />
      <div>
        <AppBarForm step={null} />
      </div>
      {profile ? (
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Fragment>
              <Container maxWidth='xs'>{Children}</Container>
            </Fragment>
          </Paper>
        </main>
      ) : (
        <Progress />
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(withRouter(FrameForm));
