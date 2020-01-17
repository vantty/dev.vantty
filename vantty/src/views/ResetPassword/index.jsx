import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import validate from "validate.js";

// Actions
import { reset, login } from "../../actions/auth";

// Components
import { Alert } from "../../components";

// Material-UI
import {
  CssBaseline,
  Typography,
  Container,
  TextField,
  Button,
  IconButton,
  InputAdornment
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";

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

const schema = {
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      // minimum: 6,
      maximum: 128
    }
  }
};

const ResetPassword = ({ match, reset, login }) => {
  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    showPassword: false,
    changePassword: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const {
    showPassword,
    changePassword,
    values: { password }
  } = formState;

  const handleClickShowPassword = () => {
    setFormState({ ...formState, showPassword: !showPassword });
  };

  const handleLogin = async event => {
    event.preventDefault();
    await reset(match.params.token, password);
    await setFormState({ ...formState, changePassword: true });
  };

  if (changePassword) {
    return <Redirect push to="/login-email" />;
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Fragment>
      <Alert />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <form onSubmit={handleLogin}>
            <Typography variant="h2" className={classes.title}>
              Reset Password
            </Typography>
            <Typography variant="subtitle1" className={classes.text}>
              Please enter a new password:
            </Typography>
            <TextField
              className={classes.textField}
              error={hasError("password")}
              fullWidth
              helperText={
                hasError("password") ? formState.errors.password[0] : null
              }
              label="Password"
              name="password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              value={formState.values.password || ""}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="Toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
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

export default connect(null, { reset, login })(ResetPassword);
