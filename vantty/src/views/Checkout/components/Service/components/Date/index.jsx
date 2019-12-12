import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
const log = console.log;

const useStyles = makeStyles(theme => ({
  root: {
    // width: 250
  },
  margin: {
    // margin: "1rem"
  }
}));

export default function MaterialUIPickers({
  loadService,
  onChangeDate,
  localDate,
  localTime
}) {
  // The first commit of Material-UI
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState({
    date: new Date()
  });
  const [selectedHour, setSelectedHour] = React.useState({
    hour: new Date().toLocaleDateString()
  });
  const { date } = selectedDate;
  const { hour } = selectedHour;

  const handleDateChange = (e, date) => {
    setSelectedDate({ date });
    onChangeDate({ date });
  };

  const handleDateChangeHour = hour => {
    setSelectedHour({ hour });
    onChangeDate({ hour });
  };

  return (
    <form className={classes.root} noValidate>
      <Typography variant='h6' gutterBottom>
        Date
      </Typography>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              id='date'
              label='Date '
              name='date'
              value={localDate || date}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin='normal'
              variant='inline'
              id='time'
              label='Time'
              name='hour'
              value={localTime || hour}
              onChange={handleDateChangeHour}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>

      <br />
    </form>
  );
}
