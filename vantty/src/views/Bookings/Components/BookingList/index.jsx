import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import CheckIcon from "@material-ui/icons/Check";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import EventSeatIcon from "@material-ui/icons/EventSeat";
import DeleteIcon from "@material-ui/icons/Delete";
import { Divider, Button } from "@material-ui/core";
import { OneBook } from "./components";
const log = console.log;
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
                    <ListItem>
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
                        primary={booking.name}
                        // secondary={`Total Service Value $${booking.totalValue}`}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component='span'
                              variant='body2'
                              className={classes.inline}
                              color='textPrimary'
                            >
                              {`Value $${booking.totalValue}`}
                            </Typography>

                            {booking.state !== "request" &&
                              `State ${booking.state}`}
                          </React.Fragment>
                        }
                      />

                      <ListItemSecondaryAction>
                        <OneBook
                          booking={booking}
                          changeStateBooking={changeStateBooking}
                        />
                      </ListItemSecondaryAction>
                      <Divider />
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
