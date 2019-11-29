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

// Components
import { BookCode } from "../../../../../../../../components";

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
  }
}));

export default function RecipeReviewCard({ booking, changeStateBooking }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {booking.user}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader={booking.requestDate}
      />
      <CardMedia
        className={classes.media}
        // image='/static/images/cards/paella.jpg'
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>

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
                    {booking.state === "request" && (
                      <Grid
                        container
                        direction="row-reverse"
                        justify="flex-start"
                        alignItems="center"
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          onClick={e =>
                            changeStateBooking(booking._id, "decline")
                          }
                          className={classes.margin}
                        >
                          Decline
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          onClick={e =>
                            changeStateBooking(booking._id, "propose")
                          }
                          className={classes.margin}
                        >
                          Propose new time
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
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
                  {console.log(booking.state)}
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
