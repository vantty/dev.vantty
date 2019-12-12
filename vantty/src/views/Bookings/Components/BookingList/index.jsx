import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
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
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        key={booking.state}
                        primary="Natalia"
                        // secondary={`Total Service Value $${booking.totalValue}`}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {`Total Service Value $${booking.totalValue}`}
                            </Typography>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {`This service was ${booking.state}`}
                            </Typography>
                            {/* {booking.state !== "  request" &&
                              `This service was ${booking.state}`} */}
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
