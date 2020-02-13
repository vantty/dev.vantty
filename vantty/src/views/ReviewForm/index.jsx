import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useFormik } from "formik";

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
// import { Rating } from "@material-ui/lab";
import LinkMui from "@material-ui/core/Link";
import { FrameForm, SimpleAppBar } from "../../components";
// import validate from "validate.js";

//helpers
// import { schemaErrorsReview } from "../../helpers/errorsData";
import { isMobile } from "react-device-detect";
import { ReviewSchema } from "./reviewSchema";

const useStyles = makeStyles(theme => ({
  text: {
    width: "100%"
  }
}));

const ReviewForm = ({ addComment, match, className, history }) => {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    isValidating,
    isSubmitting
  } = useFormik({
    initialValues: {},
    validationSchema: ReviewSchema,
    validateOnBlur: true,
    validateOnChange: false,
    // validate: values => {
    //   const errors = {};
    //   if (!values.subject) {
    //     errors.subject = "Required";
    //   }
    //   return errors;
    // },
    onSubmit: values => {
      console.log("VALUES", values);
      // e.preventDefault();
      // addComment(match.params.reviewId, { text, subject, rating });
      // setRating();
      // setFormState({ ...formState, sent: true });
    }
  });

  const classes = useStyles();

  // const [data, setData] = useState({
  //   text: "",
  //   subject: ""
  // });

  // const [formState, setFormState] = useState({
  //   isValid: false,
  //   values: {},
  //   touched: {},
  //   errors: {},
  //   sent: false
  // });

  // const { text, subject } = data;
  // const [rating, setRating] = useState(4);

  // useEffect(() => {
  //   const errors = validate(formState.values, schemaErrorsReview);
  //   setFormState(formState => ({
  //     ...formState,
  //     values: data,
  //     isValid: errors ? false : true,
  //     errors: errors || {}
  //   }));
  // }, [formState.values]);

  // const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

  // const handleChange = event => {
  //   event.persist();

  //   setFormState(formState => ({
  //     ...formState,
  //     values: {
  //       ...formState.values,
  //       [event.target.name]:
  //         event.target.type === "checkbox"
  //           ? event.target.checked
  //           : event.target.value
  //     },
  //     touched: {
  //       ...formState.touched,
  //       [event.target.name]: true
  //     }
  //   }));
  //   onChange(event);
  // };

  //TODO: Esta función se va a mover a un componente.
  const handleBack = () => {
    history.goBack();
  };

  // const onSubmit = e => {
  //   e.preventDefault();

  //   addComment(match.params.reviewId, { text, subject, rating });
  //   setRating();
  //   setFormState({ ...formState, sent: true });
  // };

  // if (formState.sent) {
  //   return <Redirect push to="/" />;
  // }

  //errors
  // const hasError = field =>
  //   formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Fragment>
      {console.log(
        "ERRORS",
        errors,
        "IS VALIDATING",
        isValidating,
        "IS SUB",
        isSubmitting
      )}
      {isMobile && <SimpleAppBar />}
      <FrameForm>
        <Fragment>
          <Fragment>
            <Card className={clsx(classes.root, className)}>
              <CardHeader
                // subheader='You commet is like you give us 1000 aplausos'
                title="Commet"
              />
              {/* <Divider /> */}
              {/* <Grid container direction='row'> */}
              <CardContent className={classes.content}>
                <form className="form" onSubmit={handleSubmit}>
                  <Fragment>
                    <Grid
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="stretch"
                    >
                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          // error={hasError("subject")}
                          // helperText={
                          //   hasError("subject")
                          //     ? formState.errors.subject[0]
                          //     : null
                          // }
                          // error={errors.subject}
                          id="subject"
                          label="Subject"
                          margin="dense"
                          variant="outlined"
                          name="subject"
                          // value={subject || ""}
                          value={values.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="fname"
                          // onChange={handleChange}
                          // onChange={e => onChange(e)}
                        />
                        <br />
                        <br />

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
                          // error={hasError("text")}
                          // helperText={
                          //   hasError("text") ? formState.errors.text[0] : null
                          // }
                          className={classes.text}
                          required
                          id="text"
                          label="Write the best comment"
                          fullWidth
                          // value={text}

                          name="text"
                          value={values.text}
                          onChange={handleChange}
                          variant="outlined"
                          placeholder="The best..."
                          // helperText="Full width!"
                          multiline
                          rows="4"
                          rowsMax="8"
                          margin="normal"
                          autoComplete="fname"
                          type="text"
                          // onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    {/* <ErrorMessage touched={touched} name="subject" /> */}
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
                            style={{ backgroundColor: "#f5f5" }}
                            disabled={!isValidating}
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

export default connect(null, { addComment })(ReviewForm);
