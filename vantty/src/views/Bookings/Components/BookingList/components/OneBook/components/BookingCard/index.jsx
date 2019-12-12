import React, { Fragment } from "react";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  Button,
  Typography,
  IconButton,
  Avatar,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Card
} from "@material-ui/core";
import { Services, SettingsCard } from "./components";

// Components
import { BookCode } from "../../../../../../../../components";

const log = console.log;

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
    backgroundColor: theme.palette.greenVantty.dark
  },
  stateCompleted: {
    backgroundColor: theme.palette.greenVantty.light
  },
  stateDeclined: {
    backgroundColor: "orange"
  },
  statePospone: {
    backgroundColor: "yellow"
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
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            {booking.user}
          </Avatar>
        }
        action={
          // <IconButton aria-label='settings' onClick={() => alert("hello")}>
          //   <MoreVertIcon />
          // </IconButton>
          <SettingsCard />
        }
        title={`Your client is ${booking.name}`}
        // subheader={booking.requestDate}
      />
      <a
        target='_blank'
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
        <Typography variant='body2' color='textSecondary' component='p'>
          {booking.address.street}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
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
                  {/* {booking.services &&
                    booking.services.map(service => (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>ji</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={service.typeOfService}
                          secondary={`Amount ${service.quantity}`}
                        />
                        <ListItemSecondaryAction>
                          {service.amount}
                        </ListItemSecondaryAction>
                        <Divider />
                      </ListItem>
                    ))} */}

                  <CardActions>
                    {booking.state === "request" && (
                      <Grid
                        container
                        direction='row'
                        justify='flex-end'
                        alignItems='center'
                        spacing={1}
                      >
                        <Grid item xs={3}>
                          <Button
                            // variant='outlined'
                            classes={classes.button}
                            size='small'
                            color='primary'
                            onClick={e =>
                              changeStateBooking(booking._id, "decline")
                            }
                          >
                            Decline
                          </Button>
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            classes={classes.button}
                            // variant='outlined'
                            size='small'
                            color='primary'
                            onClick={e =>
                              changeStateBooking(booking._id, "propose")
                            }
                          >
                            Propose
                          </Button>
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            variant='outlined'
                            classes={classes.buttonAccept}
                            size='small'
                            onClick={() =>
                              changeStateBooking(booking._id, "accepted")
                            }
                          >
                            Accept
                          </Button>
                        </Grid>
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

                  {booking.state === "decline" && (
                    <CardActions className={classes.stateDeclined}>
                      <Typography>
                        This service was <strong>Declined</strong>
                      </Typography>
                    </CardActions>
                  )}

                  {booking.state === "pospone" && (
                    <CardActions className={classes.statePospone}>
                      <Typography>
                        This service was <strong>Popppppp</strong>
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
  );
}
