import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Rating from "material-ui-rating";

// Actions
import { addComment } from "../../actions/review";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LinkMui from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  buttonSelect: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 150
  }
}));

const ReviewForm = ({ addComment, match }) => {
  const classes = useStyles();

  const [text, setText] = useState("");
  const [rating, setRating] = useState("");

  return (
    <Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Comments
          </Typography>
          <form
            className="form"
            onSubmit={e => {
              e.preventDefault();
              addComment(match.params.reviewId, { text, rating });
              setText("");
              setRating(5);
            }}
          >
            <Fragment>
              <Fragment>
                <Rating
                  // iconFilled={}
                  readOnly={false}
                  value={5}
                  max={5}
                  onChange={value => setRating(value)}
                />
              </Fragment>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="text"
                    name="text"
                    label="text"
                    fullWidth
                    value={text}
                    autoComplete="fname"
                    onChange={e => setText(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <LinkMui
                    variant="body2"
                    component={Link}
                    to={`/profile/artist/${match.params.userId}`}
                  >
                    Go back
                  </LinkMui>
                </Grid>
              </Grid>
            </Fragment>
          </form>
        </Paper>
      </main>
    </Fragment>
  );
};

ReviewForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({
//   review: state.profile
// });

export default connect(
  null,
  { addComment }
)(ReviewForm);
