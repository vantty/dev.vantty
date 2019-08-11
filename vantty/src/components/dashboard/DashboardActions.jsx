import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const DashboardActions = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Link to='/edit-profile'>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
        >
          Edit Profile
        </Button>
      </Link>

      <Link to='/add-education'>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
        >
          Add Education
        </Button>
      </Link>

      <Link to='/add-portfolio'>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
        >
          Add Pictures
        </Button>
      </Link>
    </Fragment>
  );
};

export default DashboardActions;
