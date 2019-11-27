import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  Button
} from "@material-ui/core";
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
    backgroundColor: red[500]
  },
  margin: {
    margin: theme.spacing(1)
  },
  stateAccepted: {
    backgroundColor: theme.palette.greenVantty.dark
  },
  stateDeclined: {
    backgroundColor: "orange"
  },
  statePospone: {
    backgroundColor: "yellow"
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
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={`Your client is ${booking.name}`}
        subheader={booking.requestDate}
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
          {booking.descriptionAddress}
        </Typography>
      </CardContent>
      {log(booking)}
      <Fragment>
        <div className={classes.root}>
          <Grid container spacing={0}>
            <Grid item md={12} sm={12} xs={12}>
              <div className={classes.demo}>
                <List>
                  {booking.services &&
                    booking.services.map(service => (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            {/* <FolderIcon /> */}
                            ji
                          </Avatar>
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
                    ))}

                  <CardActions>
                    {console.log(booking.state)}
                    {booking.state === "request" && (
                      <Grid
                        container
                        direction='row-reverse'
                        justify='flex-start'
                        alignItems='center'
                      >
                        <Button
                          variant='outlined'
                          size='small'
                          color='primary'
                          onClick={e =>
                            changeStateBooking(booking._id, "decline")
                          }
                          className={classes.margin}
                        >
                          Decline
                        </Button>
                        <Button
                          variant='outlined'
                          size='small'
                          color='primary'
                          onClick={e =>
                            changeStateBooking(booking._id, "propose")
                          }
                          className={classes.margin}
                        >
                          Propose new time
                        </Button>
                        <Button
                          variant='outlined'
                          size='small'
                          color='primary'
                          onClick={() =>
                            changeStateBooking(booking._id, "accepted")
                          }
                          className={classes.margin}
                        >
                          Accept
                        </Button>
                      </Grid>
                    )}
                  </CardActions>
                  {booking.state === "accepted" && (
                    <CardActions className={classes.stateAccepted}>
                      <Typography>
                        This service was <strong>Accepted</strong>
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
