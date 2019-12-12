import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";

const products = [
  { name: "Product 1", desc: "A nice thing", price: "$9.99" },
  { name: "Product 2", desc: "Another thing", price: "$3.45" },
  { name: "Product 3", desc: "Something else", price: "$6.51" },
  { name: "Product 4", desc: "Best thing of all", price: "$14.11" },
  { name: "Shipping", desc: "", price: "Free" }
];
const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA"
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" }
];

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

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' gutterBottom className={classes.title}>
              Date
            </Typography>
            <Typography gutterBottom>{booking.appointment}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' gutterBottom className={classes.title}>
              Hour
            </Typography>
            <Typography gutterBottom>{booking.appointment}</Typography>
          </Grid>
        </Grid>
        <Typography variant='h6' gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {booking.services.map(product => (
            <ListItem className={classes.listItem} key={product._id}>
              <ListItemText
                primary={product.typeOfService}
                secondary={`Quantity of services ${product.quantity}`}
              />
              <Typography variant='body2'>{`$${product.amount}`}</Typography>
            </ListItem>
          ))}

          <ListItem className={classes.listItem}>
            <ListItemText primary='Total' />
            <Typography variant='subtitle1' className={classes.total}>
              {`$${booking.totalValue}`}
            </Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary='Commision Vantty' />
            <Typography variant='subtitle1' className={classes.total}>
              {`$${booking.totalValue *
                process.env.REACT_APP_VANTTY_COMMISION}`}
            </Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary='Your transfer will be' />
            <Typography variant='subtitle1' className={classes.total}>
              {`$${booking.totalValue -
                booking.totalValue * process.env.REACT_APP_VANTTY_COMMISION}`}
            </Typography>
          </ListItem>
        </List>
      </Container>
    </React.Fragment>
  );
}
