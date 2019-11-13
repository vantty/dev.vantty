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
const log = console.log;

const useStyles = makeStyles(theme => ({
  root: {
    // width: 250
  },
  margin: {
    // margin: "1rem"
  }
}));

export default function MaterialUIPickers({ loadService, onChange }) {
  // The first commit of Material-UI
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (e, date) => {
    setSelectedDate(date);
    onChange(e, { date: date });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify='space-around' className={classes.margin}>
        <KeyboardDatePicker
          disableToolbar
          variant='inline'
          format='MM/dd/yyyy'
          margin='normal'
          id='date'
          label='Date picker inline'
          name='date'
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        {/* <KeyboardDatePicker
          margin='normal'
          id='date-picker-dialog'
          label='Date picker dialog'
          format='MM/dd/yyyy'
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <KeyboardTimePicker
          margin='normal'
          id='time-picker'
          label='Time picker'
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change time"
          }}
        /> */}
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
