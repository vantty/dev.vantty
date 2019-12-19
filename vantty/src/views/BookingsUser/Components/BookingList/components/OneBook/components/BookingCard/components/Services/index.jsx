import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  listItem: {
    // padding: theme.spacing()
  },
  total: {
    fontWeight: "700"
  },
  title: {
    // marginTop: theme.spacing(2)
  }
}));

export default function Summary({ booking }) {
  const classes = useStyles();

  const subtotal = booking.totalValue;
  const money = {
    transFee: subtotal * process.env.REACT_APP_TRANSFER_FEE,
    total: subtotal + subtotal * process.env.REACT_APP_TRANSFER_FEE
  };

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Date
            </Typography>
            <Typography gutterBottom>{booking.appointment}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Hour
            </Typography>
            <Typography gutterBottom>{booking.appointment}</Typography>
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {booking.services.map(product => (
            <ListItem className={classes.listItem} key={product._id}>
              <ListItemText
                primary={product.typeOfService}
                secondary={`Quantity of services ${product.quantity}`}
              />
              <Typography variant="body2">{`$${product.amount}`}</Typography>
            </ListItem>
          ))}

          <ListItem className={classes.listItem}>
            <ListItemText primary="Subtotal" />
            <Typography variant="subtitle1" className={classes.listItem}>
              {`$${booking.totalValue}`}
            </Typography>
          </ListItem>
          {/* <ListItem className={classes.listItem}>
            <ListItemText primary="Vantty Fee" />
            <Typography variant="subtitle1" className={classes.listItem}>
              {`$${money.vanttyFee}`}
            </Typography>
          </ListItem> */}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Transaction Fee" />
            <Typography variant="subtitle1" className={classes.listItem}>
              {`$${money.transFee}`}
            </Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" className={classes.total}>
              {`$${money.total}`}
            </Typography>
          </ListItem>
        </List>
      </Container>
    </React.Fragment>
  );
}
