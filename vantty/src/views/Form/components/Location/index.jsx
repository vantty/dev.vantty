import React, { Fragment, useState } from "react";
import { CustomPaper } from "../ComponentsForm";
import { makeStyles, Typography, TextField } from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import Progress from "@material-ui/core/LinearProgress";

const log = console.log;
const useStyles = makeStyles(theme => ({
  root: {
    padding: "0"
  },
  button: {
    float: "right",
    color: "white",
    boxShadow: "none",
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.greenVantty.light
    }
  },
  content: {
    padding: "1rem"
  }
}));

const Location = () => {
  const classes = useStyles();
  //Selector
  const { profile } = useSelector(state => ({
    profile: state.profile.profile
  }));
  // States

  const [availability, setAvailability] = useState("");
  const onChangeAvailability = e =>
    setAvailability({ ...availability, [e.target.name]: e.target.value });
  log(profile);
  return (
    <CustomPaper
      Children={
        <Fragment>
          {profile === null ? (
            <Progress />
          ) : (
            <Fragment>
              <div className={classes.root}>
                <Typography>
                  Tell you to your clients to availability
                </Typography>
                <form name='availability'>
                  <TextField
                    id='availability'
                    fullWidth
                    label='Availability'
                    multiline
                    rows='2'
                    placeholder='Hi! You can take an appointment with me all days on the weekend'
                    // defaultValue='Default Value'
                    name='availability'
                    value={
                      "" || availability.availability || profile.availability
                    }
                    className={classes.textField}
                    margin='normal'
                    variant='outlined'
                    onChange={onChangeAvailability}
                  />
                </form>
              </div>
            </Fragment>
          )}
        </Fragment>
      }
    />
  );
};
export default connect()(Location);
