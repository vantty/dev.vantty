import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Typography,
  Container,
  Button,
  TextField,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';

// Actions
import { sendEmail } from '../../actions/help';

// Components
import { Alert, SimpleAppBar } from '../../components';
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4)
  },
  title: {
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
  },
  formControl: {
    margin: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  select: {
    width: '100%'
  }
}));

const Help = ({ sendEmail, user }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: user ? user.email : '',
    issue: '',
    text: ''
  });

  const { email, issue, text } = formData;

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    await sendEmail(formData);
    await setFormData({ email: user ? user.email : '', issue: '', text: '' });
  };
  const problems = [
    {
      value: 'app-problem',
      text: 'I want to report a problem in the web'
    },
    {
      value: 'report-artist',
      text: 'I want to report an artist'
    },
    {
      value: 'apponitment-problem',
      text: "The artist didn't show up"
    },
    {
      value: 'cancel-problem',
      text: "I can't cancel my booking"
    },
    {
      value: 'payment-problem',
      text: 'I have a problem with my payment method'
    },
    {
      value: 'charge-problem',
      text: 'My charge is incorrect'
    },
    {
      value: 'report-comment',
      text: 'I want to report a comment in my profile'
    },
    {
      value: 'change-phone',
      text: 'I want change my phone number'
    },
    {
      value: 'change-bank-account',
      text: 'I want change my bank account'
    }
  ];

  return (
    <Fragment>
      <CssBaseline />
      {isMobile && <SimpleAppBar />}
      <Alert />
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <Typography variant="h2" className={classes.title}>
            Help Center
          </Typography>
          <Typography variant="subtitle1" className={classes.text}>
            Please tell us what problem do you may have. Our Customer Services
            Team will reach you ASAP.
          </Typography>
          <div>
            <form onSubmit={handleSubmit}>
              <FormControl variant="outlined" className={classes.formControl}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputLabel>Issue</InputLabel>
                    <Select
                      className={classes.select}
                      value={issue}
                      name="issue"
                      onChange={handleChange}
                    >
                      {problems.map(problem => (
                        <MenuItem value={problem.value} key={problem.value}>
                          {problem.text}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.textField}
                      fullWidth
                      label="Tell us what happened"
                      name="text"
                      onChange={handleChange}
                      type="text"
                      variant="outlined"
                      value={text}
                      multiline={true}
                      rows="5"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.textField}
                      fullWidth
                      label="Email"
                      name="email"
                      onChange={handleChange}
                      type="email"
                      variant="outlined"
                      value={email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      type="submit"
                      color="primary"
                      variant="contained"
                      className={classes.button}
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </form>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

Help.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { sendEmail }
)(Help);
