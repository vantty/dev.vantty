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
      <Button
        variant='contained'
        color='secondary'
        className={classes.button}
        component={Link}
        to='/edit-profile'
      >
        Edit Profile
      </Button>

      {/* <Link to='/add-education'>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
        >
          Add Education
        </Button>
      </Link> */}

      <Button
        variant='contained'
        color='secondary'
        className={classes.button}
        component={Link}
        to='/add-portfolio'
      >
        Add Pictures
      </Button>

      <Button
        variant='contained'
        color='secondary'
        className={classes.button}
        component={Link}
        to='/personal-info'
      >
        Personal Information
      </Button>
      <Button
        variant='contained'
        color='secondary'
        className={classes.button}
        component={Link}
        to='/price'
      >
        Price
      </Button>
      <Button
        variant='contained'
        color='secondary'
        className={classes.button}
        component={Link}
        to='/mobile'
      >
        Mobile
      </Button>
      <Button
        variant='contained'
        color='secondary'
        className={classes.button}
        component={Link}
        to='/categories'
      >
        Categories
      </Button>
      <Button
        variant='contained'
        // color='secondary'
        className={classes.button}
        component={Link}
        to='/create-profile'
      >
        Create Profile
      </Button>
      <Button
        variant='contained'
        // color='secondary'
        className={classes.button}
        component={Link}
        to='/board'
      >
        Admin
      </Button>
      <Button
        variant='contained'
        // color='secondary'
        className={classes.button}
        component={Link}
        to='/dashboard'
      >
        Dashboard User
      </Button>
    </Fragment>
  );
};

export default DashboardActions;
