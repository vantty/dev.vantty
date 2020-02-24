import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Components
import { ReviewList } from "./componets";

// Actions
import { getReview } from "../../../../actions/review";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Progress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(4)
  }
}));

const Review = ({
  getReview,
  review: { review, loading },
  profile: { reviewId }
}) => {
  useEffect(() => {
    getReview(reviewId);
  }, [getReview]);
  const classes = useStyles();
  //TODO: review=null cuando no hay nadie autenticado
  console.log("LOAD", loading, review);
  return loading || review === null ? (
    <Progress />
  ) : (
    <Fragment>
      <div className={classes.container}>
        <ReviewList review={review} />
        {review.comments.length === 0 ? <p>No reviews yet.</p> : null}
      </div>
    </Fragment>
  );
};

Review.propTypes = {
  getReview: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  review: state.review
});

export default connect(mapStateToProps, { getReview })(Review);
