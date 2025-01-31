import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'query-string';

// Material-UI
import { CssBaseline, Typography, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Actions
import { createStripeAccount } from '../../actions/book';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2)
  },
  text: {
    marginBottom: theme.spacing(2)
  },
  button: {
    textTransform: 'none',
    marginBottom: theme.spacing(10),
    backgroundColor: theme.palette.greenVantty.main,
    '&:hover': {
      backgroundColor: theme.palette.greenVantty.dark
    }
  }
}));

const CreateArtistAccount = props => {
  const { location, createStripeAccount } = props;
  const { code } = qs.parse(location.search, { ignoreQueryPrefix: true });
  createStripeAccount(code);

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h2" className={classes.title}>
          You account has been successfully created
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          Welcome to Vantty. Our team is verifing your profile, and it will be
          published in 2 hours.
        </Typography>
        <Button
          color="primary"
          variant="contained"
          className={classes.button}
          component={RouterLink}
          to="/"
        >
          View your profile
        </Button>
      </div>
    </Container>
  );
};

export default connect(
  null,
  { createStripeAccount }
)(CreateArtistAccount);
