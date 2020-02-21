import React, { Fragment } from "react";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: "700"
  },
  fee: {
    fontWeight: "500"
  },
  title: {
    marginTop: theme.spacing(2)
  }
}));

export default function Summary({ checkout, cards, address }) {
  const classes = useStyles();

  const card = cards.find(card => card.stripeCardId === checkout.stripeCardId);
  const payments = [
    { name: "Card brand", detail: card.brand },
    { name: "Card number", detail: `•••• ${card.last4}` },
    { name: "Expiry date", detail: `${card.expMonth}/${card.expYear}` }
  ];
  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {checkout.services.map(product => (
          <ListItem className={classes.listItem} key={product._id}>
            <ListItemText
              primary={product.typeOfService}
              secondary={`Quantity of services ${product.quantity}`}
            />
            <Typography variant="body2">{`$${product.amount}`}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Fee" />
          <Typography variant="subtitle1" className={classes.fee}>
            {`$${checkout.totalValue * 0.05}`}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {`$${checkout.totalValue * 0.05 + checkout.totalValue}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Address
          </Typography>
          <Typography gutterBottom>Toronto</Typography>
          <Typography gutterBottom>{address.street}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}
