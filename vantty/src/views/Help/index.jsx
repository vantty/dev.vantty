import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Material-UI
import { CssBaseline, Typography, Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Actions
// import { resendEmail } from "../../actions/auth";

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
  button: {
    marginBottom: theme.spacing(10),
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
  }
}));

const Help = ( ) => {
  const classes = useStyles();

//   const handleClick = () => {
//     resendEmail(user);
//   };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h2" className={classes.title}>
          Help Center
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          Please confirm your email address. If our email is not inside Inbox
          folder, please verify the Spam folder. If you did not receive any
          email, please click the link below.
        </Typography>
        {/* <Button
          onClick={handleClick}
          color="primary"
          variant="contained"
          className={classes.button}
        >
          Resend Confirmation Email
        </Button> */}
      </div>
    </Container>
  );
};

// Help.propTypes = {
//   user: PropTypes.object
// };

// const mapStateToProps = state => ({
//   user: state.auth.user
// });

export default connect(null, { })(Help);
