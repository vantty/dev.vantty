import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Typography,
  Container,
  Button,
  TextField,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";

// Actions
import { sendEmail } from "../../actions/help";

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
  },
  formControl: {
    margin: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  select: {
    width: "100%"
  }
}));

const Help = ({ sendEmail }) => {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    email: "",
    issue: "",
    text: ""
  });
  const { email, issue, text } = formData;

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    sendEmail(formData);
  };
  const problems = [
    {
      value: "cancel",
      text: "I want to cancel an appointment"
    },
    {
      value: "app",
      text: "I want to report a problem"
    },
    {
      value: "artist",
      text: "I want to report an artist"
    }
  ];

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
        <div>
          <form onSubmit={handleSubmit}>
            <FormControl variant="outlined" className={classes.formControl}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel>Issue</InputLabel>
                  <Select
                    className={classes.select}
                    value={issue}
                    name="issue"
                    onChange={handleChange}
                  >
                    {problems.map(problem => (
                      <MenuItem value={problem.value} key={problem.value}>
                        {problem.text}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    fullWidth
                    label="Tell us what happened"
                    name="text"
                    onChange={handleChange}
                    type="text"
                    variant="outlined"
                    value={text}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    type="email"
                    variant="outlined"
                    value={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    className={classes.button}
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </div>
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

export default connect(null, { sendEmail })(Help);
