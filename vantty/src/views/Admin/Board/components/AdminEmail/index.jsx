import React, { Fragment, useState } from 'react';
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
  FormControl
} from '@material-ui/core';

// Actions
import { adminEmail } from '../../../../../actions/help';

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

const AdminEmail = ({ adminEmail }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    title: '',
    html: '',
    buttonText: '',
    url: ''
  });

  const { email, subject, title, html, buttonText, url } = formData;

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await adminEmail(formData);
    await setFormData({
      email: '',
      subject: '',
      title: '',
      html: '',
      buttonText: '',
      url: ''
    });
  };

  const fields = [
    { item: 'email', value: email, type: 'email' },
    { item: 'subject', value: subject, type: 'text' },
    { item: 'title', value: title, type: 'text' },
    { item: 'html', value: html, type: 'text' },
    { item: 'buttonText', value: buttonText, type: 'text' },
    { item: 'url', value: url, type: 'text' }
  ];

  return (
    <Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <Typography variant="h2" className={classes.title}>
            Admin Email
          </Typography>
          <div>
            <form onSubmit={handleSubmit}>
              <FormControl variant="outlined" className={classes.formControl}>
                <Grid container spacing={2}>
                  {fields.map(field => (
                    <Grid item xs={12}>
                      <TextField
                        className={classes.textField}
                        fullWidth
                        label={field.item}
                        name={field.item}
                        onChange={handleChange}
                        type={field.type}
                        variant="outlined"
                        value={field.value}
                      />
                    </Grid>
                  ))}
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

export default connect(null, { adminEmail })(AdminEmail);
