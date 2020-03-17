import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// Actions
import { addComment } from "../../actions/review";
import { getProfileById } from "../../actions/profile";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import VerifiedIcon from "@material-ui/icons/VerifiedUserRounded";
import Avatar from "@material-ui/core/Avatar";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  Typography,
  Container
} from "@material-ui/core";
import clsx from "clsx";
// import { Rating } from "@material-ui/lab";
import LinkMui from "@material-ui/core/Link";
import { FrameForm, SimpleAppBar } from "../../components";
import validate from "validate.js";

//helpers
import { getInitials } from "../../helpers";
import { schemaErrorsReview } from "../../helpers/errorsData";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles(theme => ({
  text: {
    width: "100%"
  },
  bigAvatar: {
    margin: 10,
    width: 90,
    height: 90,
    fontWeight: "bold",
    fontSize: "35px",
    backgroundColor: theme.palette.greenVantty.main
  },
  verifiedIcon: {
    color: "rgb(0, 223, 212)",
    marginLeft: "0.3rem",
    marginBottom: "-0.3rem",
    width: "1rem"
  }
}));

const ReviewForm = ({
  addComment,
  match,
  className,
  history,
  profile: { profile },
  getProfileById
}) => {
  useEffect(() => {
    getProfileById(match.params.userId);
  }, [getProfileById, match.params.userId]);

  const classes = useStyles();

  const [data, setData] = useState({
    text: "",
    subject: ""
  });

  //errors
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    sent: false
  });

  const { text, subject } = data;
  const [rating, setRating] = useState(4);

  useEffect(() => {
    const errors = validate(formState.values, schemaErrorsReview);
    setFormState(formState => ({
      ...formState,
      values: data,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values, data]);

  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

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
    onChange(event);
  };

  const handleBack = () => {
    history.goBack();
  };

  const onSubmit = e => {
    e.preventDefault();
    addComment(match.params.reviewId, { text, subject, rating });
    setRating();
    setFormState({ ...formState, sent: true });
  };

  if (formState.sent) {
    return <Redirect push to="/" />;
  }

  //errors
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Fragment>
      {isMobile && <SimpleAppBar />}
      <FrameForm>
        <Fragment>
          <Fragment>
            <Card className={clsx(classes.root, className)}>
              <CardHeader title="Leave a commet to" />
              <Container maxWidth="false">
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  alignContent="center"
                >
                  {!profile ? (
                    <CircularProgress />
                  ) : (
                    <Fragment>
                      <div>
                        <Grid item xs={12} className={classes.gridItem}>
                          {profile.profileImage ? (
                            <Avatar
                              src={profile.profileImage}
                              className={classes.bigAvatar}
                            />
                          ) : (
                            <Avatar className={classes.bigAvatar} src={""}>
                              {getInitials(profile.name.firstName)}
                            </Avatar>
                          )}
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                          <Typography variant="h3">
                            {profile.name.firstName}
                            <span>
                              {
                                <VerifiedIcon
                                  className={classes.verifiedIcon}
                                />
                              }
                            </span>
                          </Typography>
                        </Grid>
                      </div>
                    </Fragment>
                  )}
                </Grid>
              </Container>
              <CardContent className={classes.content}>
                <form className="form" onSubmit={e => onSubmit(e)}>
                  <Fragment>
                    <Grid
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="stretch"
                    >
                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          error={hasError("subject")}
                          helperText={
                            hasError("subject")
                              ? formState.errors.subject[0]
                              : null
                          }
                          required
                          id="subject"
                          label="Subject"
                          margin="dense"
                          variant="outlined"
                          name="subject"
                          value={subject || ""}
                          autoComplete="fname"
                          onChange={handleChange}
                        />
                        <Grid item xs={12} sm={12} md={12}>
                          {/* <Rating
                            size="large"
                            precision={0.5}
                            name="half-rating"
                            value={rating}
                            onChange={(event, newValue) => {
                              setRating(newValue);
                            }}
                          /> */}
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          error={hasError("text")}
                          helperText={
                            hasError("text") ? formState.errors.text[0] : null
                          }
                          className={classes.text}
                          required
                          id="text"
                          name="text"
                          label="Write the best comment"
                          fullWidth
                          value={text}
                          variant="outlined"
                          placeholder="The best..."
                          multiline
                          rows="4"
                          rowsMax="8"
                          margin="normal"
                          autoComplete="fname"
                          type="text"
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Divider />
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
                            style={{ backgroundColor: "#f5f5" }}
                            disabled={!formState.isValid}
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
  className: PropTypes.string,
  getProfileById: PropTypes.func,
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { addComment, getProfileById })(
  ReviewForm
);
