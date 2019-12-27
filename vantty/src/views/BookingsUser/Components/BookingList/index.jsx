import React, { Fragment } from "react";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import CheckIcon from "@material-ui/icons/Check";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  Grid,
  Typography
} from "@material-ui/core";

// Components
import { OneBook } from "./components";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  avatar: {
    backgroundColor: "green"
  },
  title: {
    // margin: theme.spacing(4, 0, 2)
  },
  inline: {
    display: "block"
  }
}));

const BookingList = ({ book, changeStateBooking }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item md={12} sm={12} xs={12}>
            <div className={classes.demo}>
              <List>
                {book &&
                  book.map(booking => (
                    <ListItem key={booking._id}>
                      <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                          {booking.state !== "accepted" ? (
                            <EventSeatIcon />
                          ) : (
                            <CheckIcon />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        key={booking.state}
                        primary={booking.name}
                        // secondary={`Total Service Value $${booking.totalValue}`}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {`Value $${booking.totalValue}`}
                            </Typography>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {`State ${booking.state}`}
                            </Typography>
                          </React.Fragment>
                        }
                      />

                      <ListItemSecondaryAction>
                        <OneBook
                          booking={booking}
                          changeStateBooking={changeStateBooking}
                        />
                      </ListItemSecondaryAction>
                      {/* <Divider /> */}
                    </ListItem>
                  ))}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default BookingList;