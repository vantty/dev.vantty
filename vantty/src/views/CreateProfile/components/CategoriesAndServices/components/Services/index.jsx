import React, { Fragment } from "react";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { Typography, Button, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  textField: {
    padding: "0.3rem"
  }
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      prefix='$'
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default function FormattedInputs({
  formData,
  onChangeService,
  handleServices,
  services,
  handleAddServices
}) {
  const classes = useStyles();
  // var services = [];

  // const [values, setValues] = React.useState({
  //   amount: "",
  //   typeOfService: ""
  // });

  // const handleChange = name => event => {
  //   setValues({
  //     ...values,
  //     [name]: event.target.value
  //   });
  // };

  // const handleAdd = () => {
  //   var arr = [];
  //   arr = services.push(values);

  //   // onChangeService(values);

  //   // services.push(values);
  //   console.log(arr);
  // };

  // const handleTest = () => {
  //   onChangeService(services);
  //   console.log(services);
  // };

  return (
    <Fragment>
      <br />
      <br />
      <br />
      <Typography>Services</Typography>
      <div className={classes.root}>
        <Grid container direction='row' justify='center' alignItems='center'>
          <FormControl>
            <TextField
              // error={hasError("typeOfService")}
              // helperText={
              //   hasError("typeOfService")
              //     ? formState.errors.typeOfService[0]
              //     : null
              // }
              className={classes.textField}
              fullWidth
              label='Service'
              margin='dense'
              name='typeOfService'
              required
              type='text'
              variant='outlined'
              id='typeOfService'
              autoComplete='fname'
              size='small'
              value={services.typeOfService}
              // value={
              //   formState.values.typeOfService || serviceData.typeOfService
              // }
              onChange={handleServices}
              // onChange={handleChange("typeOfService")}
            />
          </FormControl>

          <TextField
            label='Amount'
            className={classes.textField}
            name='amount'
            variant='outlined'
            margin='dense'
            size='small'
            value={services.amount}
            onChange={handleServices}
            // onChange={handleChange("amount")}
            id='formatted-numberformat-input'
            InputProps={{
              inputComponent: NumberFormatCustom
            }}
          />
          <Button
            size='small'
            aria-label='small outlined'
            color='primary'
            onClick={handleAddServices}
          >
            Add Service
          </Button>
          {/* <Button
            size='small'
            aria-label='small outlined'
            color='primary'
            onClick={handleTest}
          >
            Test
          </Button> */}
        </Grid>
      </div>
    </Fragment>
  );
}
