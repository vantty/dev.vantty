import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import LinkMui from "@material-ui/core/Link";
//Helpers
import { getInitials, isOwner } from "../../../../../../helpers";

// Actions
import { deleteComment } from "../../../../../../actions/review";

// Material-UI
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Star from "@material-ui/icons/StarRateOutlined";
import { Chip, Grid, Container } from "@material-ui/core";
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
        direction='column'
        justify='space-between'
        alignItems='stretch'
      >
        <Grid item>
          <h1>Reviews</h1>
        </Grid>

        <Grid item>
          {/* <Button
            size='small'
            color='primary'
            component={Link}
            to={`/profile/artist/${user}/${_id}`}
          >
            Give a comment
          </Button> */}
          <LinkMui
            component={Link}
            variant='body1'
            to={`/profile/artist/${user}/${_id}`}
          >
            Give a comment
          </LinkMui>
        </Grid>
      </Grid>

      <br />
      <Divider variant='middle' />
      <br />

      <List>
        {comments.map(comment => (
          <Fragment key={comment._id}>
            <ListItem key={comment._id} alignItems='flex-start'>
              <ListItemAvatar>
                {comment.profilePicture ? (
                  <Avatar
                    alt=''
                    src={comment.profilePicture}
                    className={classes.avatarReviewList}
                  />
                ) : (
                  <Avatar alt='' src={""} className={classes.avatarReviewList}>
                    {getInitials(comment.name)}
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText
                primary={comment.name}
                secondary={
                  <Fragment>
                    <Typography
                      component='span'
                      variant='body2'
                      className={classes.date}
                      color='textPrimary'
                    >
                      <Moment format='YYYY/MM/DD'>{date}</Moment>{" "}
                    </Typography>
                    <Typography
                      component='span'
                      variant='body2'
                      className={classes.messageReview}
                      color='textPrimary'
                    >
                      {comment.text}
                    </Typography>
                    {/* {auth.user != null
                      ? !auth.loading &&
                        comment.user === auth.user._id && (
                          <Button
                            color='secondary'
                            onClick={() => deleteComment(_id, comment._id)}
                          >
                            Borrar
                          </Button>
                        )
                      : null} */}
                    {isOwner(auth, comment.user) ? (
                      <Button
                        variant='body1'
                        onClick={() => deleteComment(_id, comment._id)}
                      >
                        Delete
                      </Button>
                    ) : null}
                  </Fragment>
                }
              />
              <Fragment>
                <div style={{ display: "inline-block" }}>
                  <Chip
                    variant='outlined'
                    size='small'
                    icon={<Star style={{ color: "#fdd835" }} />}
                    label={comment.rating}
                  />
                </div>
              </Fragment>
            </ListItem>
            <Divider variant='inset' component='li' />
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

export default connect(
  mapStateToProps,
  { deleteComment }
)(withStyles(styles)(ReviewItem));
