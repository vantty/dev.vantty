import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import validate from 'validate.js';

//Material-UI
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, TextField, Typography } from '@material-ui/core';

// Helpers
import { serviceSchemaErrors } from '../../../../../../../../helpers/errorsData';

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(1)
  },
  form: {
    marginTop: theme.spacing(1)
  },
  button: {
    backgroundColor: theme.palette.greenVantty.main,
    '&:hover': {
      backgroundColor: theme.palette.greenVantty.light
    },
    marginBottom: theme.spacing(2)
  }
}));

const Services = ({ serviceData, onChange, onSubmitPrice }) => {
  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, serviceSchemaErrors);
    setFormState(formState => ({
      ...formState,
      values: serviceData,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  //Errors
  const handleChange = async event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.name === 'checkbox'
            ? event.target.checked
            : event.target.value
      },

      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
    onChange(event);
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Fragment>
      <div>
        <Typography variant="h5" className={classes.title}>
          Add a Service
        </Typography>
        <Typography color="textSecondary" variant="body1">
          Please tell us the sevices you provide, how much they cost, and a
          brief description of each one.
        </Typography>
        <Grid container direction="row" spacing={2} className={classes.form}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              error={hasError('typeOfService')}
              helperText={
                hasError('typeOfService')
                  ? formState.errors.typeOfService[0]
                  : null
              }
              label="Name of service"
              margin="dense"
              name="typeOfService"
              required
              type="text"
              variant="outlined"
              id="typeOfService"
              autoComplete="fname"
              value={
                formState.values.typeOfService || serviceData.typeOfService
              }
              onChange={handleChange}
              placeholder="Social makeup"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cost $"
              margin="dense"
              name="amount"
              required
              variant="outlined"
              type="number"
              id="amount"
              error={hasError('amount')}
              helperText={
                hasError('amount') ? formState.errors.amount[0] : null
              }
              value={formState.values.amount || serviceData.amount}
              onChange={handleChange}
              placeholder="100"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              margin="dense"
              name="description"
              required
              type="text"
              multiline
              rows="3"
              variant="outlined"
              autoComplete="description"
              error={hasError('description')}
              helperText={
                hasError('description') ? formState.errors.description[0] : null
              }
              value={formState.values.description || serviceData.description}
              onChange={handleChange}
              placeholder="Suitable for parties and social events."
            />
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-start"
          >
            <Button
              className={classes.button}
              onClick={e => onSubmitPrice(e)}
              variant="contained"
              size="small"
              aria-label="small outlined"
              color="primary"
              disabled={!formState.isValid || !formState.values.description}
            >
              Add Service
            </Button>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default connect(null, {})(withRouter(Services));
