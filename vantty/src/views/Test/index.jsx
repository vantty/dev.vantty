import React, { Fragment } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

// Actions
import { testSendEmail } from "../../actions/book";

// Components
import { Alert } from "../../components";

// Material-UI
import {
  CssBaseline,
  Typography,
  Container,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// const log = console.log;

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

const Test = ({ testSendEmail }) => {
  const classes = useStyles();

  const handleClick = () => {
    testSendEmail("hola");
  };

  return (
    <Fragment>
      <Alert />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography variant="h2" className={classes.title}>
            Email test
          </Typography>
          <Button
            onClick={handleClick}
            className={classes.signInButton}
            color="primary"
            fullWidth
            size="large"
            variant="contained"
          >
            Send
          </Button>
        </div>
      </Container>
    </Fragment>
  );
};

// Test.propTypes = {
//   user: PropTypes.object
// };

// const mapStateToProps = state => ({
//   user: state.auth.user
// });

export default connect(null, { testSendEmail })(Test);
