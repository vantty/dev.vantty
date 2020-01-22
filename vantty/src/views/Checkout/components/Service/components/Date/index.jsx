import "date-fns";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, InputLabel, MenuItem, Select } from "@material-ui/core";
import { hours } from "./seedHours";

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
  // const [selectedHour, setSelectedHour] = React.useState({});
  const { date } = selectedDate;
  // const { hour } = selectedHour;

  const handleDateChange = (e, date) => {
    setSelectedDate({ date });
    onChangeDate({ date });
  };

  // const handleDateChangeHour = hour => {
  //   setSelectedHour({ hour });
  //   onChangeDate({ hour });
  // };

  const [formData, setFormData] = useState({
    hour: "00:00"
  });
  const { hour } = formData;
  const handleChange = event => {
    onChangeDate({ hour: event.target.value });
    setFormData({ [event.target.name]: event.target.value });
  };

  return (
    <form className={classes.root} noValidate>
      <Typography variant='h6' gutterBottom>
        Date
      </Typography>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item sm={6} xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              id='date'
              label='Date'
              name='date'
              value={localDate || date}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item sm={6} xs={12}>
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              variant="inline"
              id="time"
              label="Time"
              name="hour"
              value={selectedHour}
              onChange={handleDateChangeHour}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </MuiPickersUtilsProvider> */}
          <InputLabel>Hour</InputLabel>
          <Select
            className={classes.select}
            value={hour}
            name='hour'
            onChange={handleChange}
          >
            {hours.map(hour => (
              <MenuItem value={hour.value} key={hour.value}>
                {hour.value}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </form>
  );
}
