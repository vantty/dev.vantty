import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
  button: {
    textTransform: "none",
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
  }
}));

const BookCode = ({ completeService, loading }) => {
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
            disabled={loading}
          >
            {"Complete Service"}
          </Button>
        </form>
      </div>
    </Container>
  );
};

BookCode.propTypes = {
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.book.loading
});

export default connect(mapStateToProps, { completeService })(BookCode);
