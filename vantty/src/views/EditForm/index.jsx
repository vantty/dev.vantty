import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

// Actions
import { getCurrentProfile } from '../../actions/profile';

//Material-UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box, Grid, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

// Components
import { Alert, SimpleAppBar } from '../../components';
import Settings from '../../views/Settings';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }
}));

const EditForm = ({
  auth: { user },
  Children,
  match,
  loading,
  getCurrentProfile
}) => {
  const classes = useStyles();
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return (
    <Fragment>
      <CssBaseline />
      {loading && <LinearProgress />}
      {isMobile && <SimpleAppBar />}
      <Fragment>
        <Fragment>
          <Alert />
        </Fragment>
        <Box pt={3} pb={11}>
          <div className={classes.root}>
            <Grid container>
              <Hidden xsDown>
                <Grid item xs={4}>
                  <Container maxWidth="md">
                    <Settings match={match} />
                  </Container>
                </Grid>
              </Hidden>
              <Grid item xs={12} sm={8}>
                <Fragment>{Children}</Fragment>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Fragment>
    </Fragment>
  );
};

EditForm.propTypes = {
  auth: PropTypes.object,
  loading: PropTypes.bool,
  getCurrentProfile: PropTypes.func
};

const mapStateToProps = state => ({
  auth: state.auth,
  loading: state.book.loading
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(withRouter(EditForm));
