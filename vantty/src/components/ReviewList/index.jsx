import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";

// Actions
import { deleteComment } from "../../actions/review";

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
import { Chip, Grid } from "@material-ui/core";
import List from "@material-ui/core/List";

// Styles
import styles from "./styles";

const ReviewItem = ({
  auth,
  review: { user, _id, comments, date, name },
  deleteComment,
  classes,
  ...rest
}) => {
  return (
    <Grid>
      <h1>Reviews</h1>
      <List>
        {comments.map(comment => (
          <Fragment key={comment._id}>
            <ListItem key={comment._id} alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar alt='' src={""}>
                  {comment.name
                    .split(" ")
                    .map((n, i, a) =>
                      i === 0 || i + 1 === a.length ? n[0] : null
                    )
                    .join("")
                    .toUpperCase()}
                </Avatar>
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
                    {auth.user != null
                      ? !auth.loading &&
                        comment.user === auth.user._id && (
                          <Button
                            color='secondary'
                            onClick={() => deleteComment(_id, comment._id)}
                          >
                            Borrar
                          </Button>
                        )
                      : null}
                  </Fragment>
                }
              />
              <Fragment>
                <div style={{ display: "inline-block" }}>
                  <Chip
                    variant='outlined'
                    color='yellow'
                    size='small'
                    icon={<Star style={{ color: "#fdd835" }} />}
                    label={"4.5"}
                  />
                </div>
              </Fragment>
            </ListItem>

            <Divider variant='inset' component='li' />
          </Fragment>
        ))}

        <Fragment>
          <Link to={`/profile/artist/${user}/${_id}`}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Give a comment
            </Button>
          </Link>
        </Fragment>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant='h6' align='center' gutterBottom>
            Footer
          </Typography>
          <Typography
            variant='subtitle1'
            align='center'
            color='textSecondary'
            component='p'
          >
            Something here to give the footer a purpose!
          </Typography>
        </footer>
        {/* End footer */}
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
