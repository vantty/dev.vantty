import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import LinkMui from "@material-ui/core/Link";
//Helpers
import { getInitials, isOwner } from "../../../../../../helpers";
import { Link } from "react-router-dom";
// Actions
import { deleteComment } from "../../../../../../actions/review";

// Material-UI
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Star from "@material-ui/icons/StarRateOutlined";
import { Chip, Grid } from "@material-ui/core";
import List from "@material-ui/core/List";

// Styles
import styles from "./styles";

const ReviewItem = ({
  auth,
  review: { user, _id, comments, date },
  deleteComment,
  classes,
  ...rest
}) => {
  return (
    <Grid>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item>
          <Typography variant="h3">Reviews</Typography>
        </Grid>
      </Grid>
      <br />
      <Divider />
      <List>
        {comments.map(comment => (
          <Fragment key={comment._id}>
            <ListItem key={comment._id} alignItems="flex-start">
              <ListItemAvatar>
                {comment.profileImage ? (
                  <Avatar
                    alt=""
                    src={comment.profileImage}
                    className={classes.avatarReviewList}
                  />
                ) : (
                  <Avatar alt="" src={""} className={classes.avatarReviewList}>
                    {getInitials(comment.name)}
                  </Avatar>
                )}
              </ListItemAvatar>

              <ListItemText
                primary={comment.subject}
                secondary={
                  <Fragment>
                    <Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {comment.name}
                      </Typography>
                      {`  — ${comment.text}`}

                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.messageReview}
                        color="textPrimary"
                      >
                        <Moment format="YYYY/MM/DD" className={classes.date}>
                          {date}
                        </Moment>
                      </Typography>
                    </Fragment>
                    <Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.messageReview}
                        color="textPrimary"
                      >
                        {isOwner(auth, comment.user) ? (
                          <LinkMui
                            component="button"
                            variant="body2"
                            className={classes.deleteReview}
                            onClick={() => deleteComment(_id, comment._id)}
                          >
                            Delete
                          </LinkMui>
                        ) : (
                          <LinkMui
                            component={Link}
                            variant="body2"
                            to={"/help"}
                            className={classes.reportButton}
                          >
                            Report
                          </LinkMui>
                        )}
                      </Typography>
                    </Fragment>
                  </Fragment>
                }
              />
              <Fragment>
                <div style={{ display: "inline-block" }}>
                  <Chip
                    variant="outlined"
                    size="small"
                    icon={<Star style={{ color: "#fdd835" }} />}
                    label={comment.rating}
                  />
                </div>
              </Fragment>
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        ))}
      </List>
    </Grid>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  classes: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(
  withStyles(styles)(ReviewItem)
);
