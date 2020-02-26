import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  List,
  Typography,
  Avatar,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Card,
  LinearProgress
} from "@material-ui/core";
import { Services } from "./components";

// Components
import { PosponeForm, HelpButton } from "./components";
import { Alert, ContactButtons } from "../../../../../../../../components";

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: "2rem"
  },
  media: {
    height: 0,
    paddingTop: "30%" // 16:9
  },
  avatar: {
    backgroundColor: "red"
  },
  stateAccepted: {
    backgroundColor: theme.palette.greenVantty.main
  },
  stateCompleted: {
    backgroundColor: theme.palette.greenVantty.light
  },
  stateDeclined: {
    backgroundColor: "red"
  },
  statePosponed: {
    backgroundColor: "orange"
  }
}));

const RecipeReviewCard = ({ booking, changeStateBooking, loading }) => {
  const classes = useStyles();

  const replace = str => {
    const newString = str.replace(/ /g, "+");
    return newString;
  };

  return (
    <Fragment>
      <Alert />
      {loading && <LinearProgress />}
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {booking.user}
            </Avatar>
          }
          action={
            <HelpButton
              booking={booking}
              changeStateBooking={changeStateBooking}
            />
          }
          title={`Your client is ${booking.name}`}
        />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.google.com/maps/place/${replace(
            booking.address.street
          )}/`}
        >
          <CardMedia
            className={classes.media}
            image={`https://maps.googleapis.com/maps/api/staticmap?center=${replace(
              booking.address.street
            )}&zoom=13&scale=false&size=500x500&maptype=terrain&key=${
              process.env.REACT_APP_GOOGLE_MAPS_ID
            }&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C2360+dundas+street+west`}
            title={booking.address.street}
          />
        </a>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {booking.address.street}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {booking.descriptionAddress}
          </Typography>
        </CardContent>
        <div className={classes.root}>
          <Grid container spacing={0}>
            <Grid item md={12} sm={12} xs={12}>
              <div className={classes.demo}>
                <List>
                  <Services booking={booking} />
                  {booking.state === "accepted" && (
                    <CardActions className={classes.stateAccepted}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography>
                            This service was <strong>Accepted</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>
                            Your booking code is{" "}
                            <strong>{booking.bookCode}</strong>
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardActions>
                  )}
                  {booking.state === "completed" && (
                    <CardActions className={classes.stateCompleted}>
                      <Typography>
                        This service was <strong>Completed</strong>
                      </Typography>
                    </CardActions>
                  )}
                  {booking.state === "declined" ||
                    (booking.state === "declined-user" && (
                      <CardActions className={classes.stateDeclined}>
                        <Typography>
                          This service was <strong>Declined</strong>
                        </Typography>
                      </CardActions>
                    ))}
                  {booking.state === "posponed" && (
                    <CardActions className={classes.statePosponed}>
                      <Grid container>
                        <Grid item>
                          <Typography>
                            This service was <strong>Posponed</strong>
                          </Typography>
                        </Grid>
                        <Grid item>
                          <PosponeForm
                            changeStateBooking={changeStateBooking}
                            bookingId={booking._id}
                          />
                        </Grid>
                      </Grid>
                    </CardActions>
                  )}
                  {booking.state === "declined-posponed" && (
                    <CardActions className={classes.statePosponed}>
                      <Typography>
                        This service was <strong>Posponed</strong>
                      </Typography>
                    </CardActions>
                  )}
                </List>
              </div>
            </Grid>
          </Grid>
        </div>
        {booking.state === "accepted" && <ContactButtons type="artist" />}
      </Card>
    </Fragment>
  );
};

RecipeReviewCard.propTypes = {
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.book.loading
});

export default connect(mapStateToProps, {})(withRouter(RecipeReviewCard));
