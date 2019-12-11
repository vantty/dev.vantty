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
// import { completeService } from "../../actions/book";

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

const PosponeForm = ({ changeStateBooking, bookingId }) => {
  const classes = useStyles();

  const [text, setText] = useState("");

  const handleChange = event => {
    event.persist();
    setText(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    log(text);
    changeStateBooking(bookingId, "declined-posponed", text);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <Typography variant="subtitle1" className={classes.text}>
            Pleaset tell the user your date and time availability. Once you send
            it, the service will appear as <i>Declined</i>, but the user could
            make another book.
          </Typography>
          <TextField
            onChange={handleChange}
            className={classes.textField}
            fullWidth
            label="text"
            name="text"
            type="text"
            variant="outlined"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.button}
          >
            Send
          </Button>
        </form>
      </div>
    </Container>
  );
};

// PosponeForm.propTypes = {
//   user: PropTypes.object
// };

// const mapStateToProps = state => ({
//   user: state.auth.user
// });

export default connect(null, {})(PosponeForm);
