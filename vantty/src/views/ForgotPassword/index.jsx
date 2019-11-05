import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Actions
import { forgot } from "../../actions/auth";

// Components
import { Alert } from "../../components";

// Material-UI
import {
  CssBaseline,
  Typography,
  Container,
  TextField,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2)
  },
  text: {
    marginBottom: theme.spacing(2)
  },
  textField: {
    marginBottom: theme.spacing(1)
  },
  signInButton: {
    marginBottom: theme.spacing(10),
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
  }
}));

const ForgotPassword = ({ forgot }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");

  const handleChange = event => {
    event.persist();
    setEmail({ [event.target.name]: event.target.value });
  };

  const handleLogin = event => {
    event.preventDefault();
    forgot(email);
  };

  return (
    <Fragment>
      <Alert />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <form onSubmit={handleLogin}>
            <Typography variant="h2" className={classes.title}>
              Forgot Password
            </Typography>
            <Typography variant="subtitle1" className={classes.text}>
              Please enter your email address to reset your password:
            </Typography>
            <TextField
              className={classes.textField}
              fullWidth
              label="Email address"
              name="email"
              onChange={handleChange}
              type="text"
              //   value={formState.values.email || ""}
              variant="outlined"
            />
            <Button
              className={classes.signInButton}
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Reset Password
            </Button>
          </form>
        </div>
      </Container>
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { forgot }
)(ForgotPassword);
