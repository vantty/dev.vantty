import "date-fns";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    // width: 250
  },
  margin: {
    // margin: "1rem"
  },
  select: {
    width: "100%"
  }
}));

export default function MaterialUIPickers({ onChangeDate, localDate }) {
  const classes = useStyles();

  const [selectedDate, handleDateChange] = useState(new Date());

  const handleDate = date => {
    handleDateChange({ date });
    onChangeDate({
      appointmentDate: date.toString().substr(0, 24),
      appointmentTimeStamp: date.getTime()
    });
  };

  return (
    <form className={classes.root} noValidate>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              fullWidth
              name="date"
              margin="normal"
              value={localDate || selectedDate}
              disablePast
              inputVariant="outlined"
              onChange={handleDate}
              showTodayButton
              minutesStep={5}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </form>
  );
}
