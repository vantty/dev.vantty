import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Container, Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "center",
    marginTop: "40vh"
  },
  paper: {
    padding: theme.spacing(3)
  },
  button: {
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    },
    textTransform: "none",
    fontWeight: "bold"
  }
}));

const UserRole = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xs" className={classes.container}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              size="large"
              className={classes.button}
              component={Link}
              to="/create-profile"
            >
              I'm a Beauty Artist
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              size="large"
              className={classes.button}
              component={Link}
              to="/"
            >
              I'm looking for a Beauty Artist
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserRole;
