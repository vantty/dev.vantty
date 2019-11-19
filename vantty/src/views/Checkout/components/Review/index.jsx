import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Icon } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const products = [
  { name: "Product 1", desc: "A nice thing", price: "$9.99" },
  { name: "Product 2", desc: "Another thing", price: "$3.45" },
  { name: "Product 3", desc: "Something else", price: "$6.51" },
  { name: "Product 4", desc: "Best thing of all", price: "$14.11" }
];

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: "700"
  },
  title: {
    marginTop: theme.spacing(2)
  },
  icon: {
    fontSize: "30"
  }
}));

export default function Review({ profile }) {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  return (
    <Fragment>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {profile.services.map(product => (
          <ListItem className={classes.listItem} key={product.id}>
            <ListItemText
              primary={product.typeOfServices}
              secondary={product.description}
            />

            <Typography variant='body2'>{product.amount}</Typography>
            <button onClick={() => setCount(count - 1)} key={product.id}>
              <RemoveIcon className={classes.icon} />
            </button>
            <Typography gutterBottom variant='h6'>
              {count}
            </Typography>
            <button onClick={() => setCount(count + 1)} key={product.id}>
              <AddIcon className={classes.icon} />
            </button>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' className={classes.total}>
            $34.06
          </Typography>
        </ListItem>
      </List>
    </Fragment>
  );
}
