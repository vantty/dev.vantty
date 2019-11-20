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
import { TextField } from "@material-ui/core";
const log = console.log;

const useStyles = makeStyles(theme => ({
  root: {
    // width: 250
  },
  margin: {
    // margin: "1rem"
  }
}));

export default function MaterialUIPickers({ loadService, onChangeDate }) {
  // The first commit of Material-UI
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState({
    date: new Date()
  });
  const [selectedHour, setSelectedHour] = React.useState({
    hour: new Date()
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
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify='baseline' className={classes.margin}>
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='MM/dd/yyyy'
            margin='normal'
            id='date'
            label='Date '
            name='date'
            value={date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify='baseline' className={classes.margin}>
          <KeyboardTimePicker
            margin='normal'
            variant='inline'
            id='time'
            label='Time'
            name='hour'
            value={hour}
            onChange={handleDateChangeHour}
            KeyboardButtonProps={{
              "aria-label": "change time"
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <br />
    </form>
  );
}
