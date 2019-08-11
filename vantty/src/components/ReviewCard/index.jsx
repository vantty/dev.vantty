import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Components
import ReviewList from "../ReviewList";

// Actions
import { getReview } from "../../actions/review";

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import Progress from "@material-ui/core/LinearProgress";

// Styles
import styles from "./styles";

const ReviewCard = ({
  getReview,
  review: { review, loading },
  match,
  profile: { reviewId },
  classes
}) => {
  useEffect(() => {
    getReview(reviewId);
  }, [getReview]);

  return loading || review === null ? (
    <Progress />
  ) : (
    <Fragment>
      <div>
        <ReviewList review={review} />
      </div>
    </Fragment>
  );
};

ReviewCard.propTypes = {
  getReview: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  review: state.review
});

export default connect(
  mapStateToProps,
  { getReview }
)(withStyles(styles)(ReviewCard));
