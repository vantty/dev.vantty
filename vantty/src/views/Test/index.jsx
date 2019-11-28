import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import randomCode from "crypto-random-string";

// Material-UI
import {
  CssBaseline,
  Typography,
  Container,
  Button,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Actions
import { completeService } from "../../actions/book";

const log = console.log;

const useStyles = makeStyles(theme => ({
  paper: {
    // marginTop: theme.spacing(8),
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
  button: {
    // marginBottom: theme.spacing(10),
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
  }
}));

const Test = ({ completeService }) => {
  const classes = useStyles();

  const [code, setCode] = useState("");

  const handleChange = event => {
    event.persist();
    setCode(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    completeService(code);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <form onSubmit={handleSubmit}>
          {/* <Typography variant="h2" className={classes.title}>
            Lorem
          </Typography> */}
          <Typography variant="subtitle1" className={classes.text}>
            Please enter the booking code given by the user to complete the
            service
          </Typography>
          <TextField
            onChange={handleChange}
            className={classes.textField}
            fullWidth
            label="Code"
            name="code"
            type="text"
            variant="outlined"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.button}
          >
            End Service
          </Button>
        </form>
      </div>
    </Container>
  );
};

// Test.propTypes = {
//   user: PropTypes.object
// };

// const mapStateToProps = state => ({
//   user: state.auth.user
// });

export default connect(null, { completeService })(Test);
