import React, { Fragment } from "react";

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
  Card
} from "@material-ui/core";
import { Services } from "./components";

// Components
import {
  BookCode,
  ConfirmationModal,
  Alert
} from "../../../../../../../../components";
import { PosponeForm, HelpButton } from "./components";

const useStyles = makeStyles(theme => ({
  card: {
    // maxWidth: 345
    marginTop: "2rem"
  },
  media: {
    height: 0,
    paddingTop: "30%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: "red"
  },
  margin: {
    margin: theme.spacing(1)
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
  },
  button: {
    // width: "10px"
    // height: "10rem",
    // fontSize: "10px" + "!important",
    // margin: theme.spacing(1)
    // minWidth: "1rem",
    // minHeight: "1rem",
    // marginTop: "1rem"
  },
  buttonAccept: {
    // width: "10px",
    // margin: theme.spacing(1),
    color: theme.palette.greenVantty.light
  }
}));

export default function RecipeReviewCard({ booking, changeStateBooking }) {
  const classes = useStyles();

  const replace = str => {
    const newString = str.replace(/ /g, "+");
    return newString;
  };

  return (
    <Fragment>
      <Alert />

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
          // subheader={booking.requestDate}
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
        <Fragment>
          <div className={classes.root}>
            <Grid container spacing={0}>
              <Grid item md={12} sm={12} xs={12}>
                <div className={classes.demo}>
                  <List>
                    <Services booking={booking} />
                    <CardActions>
                      {booking.state === "request" && (
                        <Grid
                          container
                          direction="row"
                          justify="flex-end"
                          alignItems="center"
                          spacing={1}
                        >
                          <ConfirmationModal
                            buttonText={"Decline"}
                            modalText={
                              "Are you sure you want to decline this service?"
                            }
                            changeStateBooking={changeStateBooking}
                            bookingId={booking._id}
                            state={"declined"}
                          />
                          <ConfirmationModal
                            buttonText={"Pospone"}
                            modalText={
                              "Are you sure you want to propose the user another date for this service?"
                            }
                            changeStateBooking={changeStateBooking}
                            bookingId={booking._id}
                            state={"posponed"}
                          />
                          <ConfirmationModal
                            buttonText={"Accept"}
                            modalText={
                              "Are you sure you want to accept this service?"
                            }
                            changeStateBooking={changeStateBooking}
                            bookingId={booking._id}
                            state={"accepted"}
                          />
                        </Grid>
                      )}
                    </CardActions>
                    {booking.state === "accepted" && (
                      <CardActions className={classes.stateAccepted}>
                        <Grid container>
                          <Grid item>
                            <Typography>
                              This service was <strong>Accepted</strong>
                            </Typography>
                          </Grid>
                          <Grid item>
                            <BookCode />
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
                    {booking.state === "declined" && (
                      <CardActions className={classes.stateDeclined}>
                        <Typography>
                          This service was <strong>Declined</strong>
                        </Typography>
                      </CardActions>
                    )}
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
        </Fragment>
      </Card>
    </Fragment>
  );
}
