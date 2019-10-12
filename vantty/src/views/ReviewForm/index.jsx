import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Actions
import { addComment } from "../../actions/review";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button
} from "@material-ui/core";
import clsx from "clsx";
import { Rating } from "@material-ui/lab";
import LinkMui from "@material-ui/core/Link";
import { FrameForm } from "../../components";

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

const ReviewForm = ({ addComment, match, className, history }) => {
  const classes = useStyles();

  const [text, setText] = useState("");
  const [rating, setRating] = useState(4);

  const handleBack = () => {
    history.goBack();
  };

  const onSubmit = e => {
    e.preventDefault();
    addComment(match.params.reviewId, { text, rating });
    setText("");
    setRating();
    handleBack();
  };

  return (
    <Fragment>
      <FrameForm>
        <Fragment>
          <Fragment>
            <Card className={clsx(classes.root, className)}>
              <CardHeader
                subheader="You commet is like you give us 1000 aplausos"
                title="Commet"
              />
              <Divider />
              {/* <Grid container direction='row'> */}
              <CardContent className={classes.content}>
                <form
                  className="form"
                  // onSubmit={e => {
                  //   e.preventDefault();
                  //   addComment(match.params.reviewId, { text, rating });
                  //   setText("");
                  //   setRating();
                  // }}
                  onSubmit={e => onSubmit(e)}
                >
                  <Fragment>
                    <Grid
                      container
                      direction="column"
                      justify="flex-end"
                      alignItems="stretch"
                    >
                      <Grid item xs={12} sm={12} md={12}>
                        <Rating
                          size="large"
                          precision={0.5}
                          name="half-rating"
                          value={rating}
                          onChange={(event, newValue) => {
                            setRating(newValue);
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          id="text"
                          name="text"
                          label="Write the best comment"
                          fullWidth
                          value={text}
                          variant="outlined"
                          multiline
                          rows="4"
                          margin="normal"
                          autoComplete="fname"
                          onChange={e => setText(e.target.value)}
                        />
                      </Grid>
                    </Grid>

                    <Divider />

                    {/* </Grid> */}

                    <CardActions>
                      <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                        spacing={3}
                      >
                        <Grid item>
                          <LinkMui
                            variant="body2"
                            component={Link}
                            to={`/profile/artist/${match.params.userId}`}
                          >
                            Go back
                          </LinkMui>
                        </Grid>
                        <Grid item>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onChange={() => handleBack()}
                          >
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Fragment>
                </form>
              </CardContent>
            </Card>
          </Fragment>
        </Fragment>
      </FrameForm>
    </Fragment>
  );
};

ReviewForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  className: PropTypes.string
};

// const mapStateToProps = state => ({
//   review: state.profile
// });

export default connect(
  null,
  { addComment }
)(ReviewForm);
