import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Icon, Divider, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import {
  removeItem,
  addQuantity,
  subtractQuantity,
  addToCart
} from "../../../../actions/cart";

import { Date } from "./components";

const log = console.log;

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  values: {
    padding: theme.spacing(0)
  },
  subtitle: {
    fontSize: "0.7rem"
  },
  total: {
    fontWeight: "700",
    fontSize: "0.9rem"
  },
  totals: {
    width: "10rem"
    // marginLeft: "rem"
  },
  title: {
    marginTop: theme.spacing(2)
  },
  icon: {
    fontSize: "30"
  },
  grid: { width: "12rem" },
  margin: {
    width: "2rem"
    // justifyContent: "center",
    // width: "2rem",
    // height: "2rem",
    // border: "1px solid grey",
    // padding: "1px",
    // margin: "1px"
  }
}));

const Review = ({
  profile,
  cart: { items, addedItems, total },
  initialServices,
  addQuantity,
  subtractQuantity,
  addToCart,
  removeItem,
  onChange
}) => {
  const classes = useStyles();

  useEffect(() => {
    initialServices(profile.services);
  }, []);

  //to add to cart
  const handleAddToCart = id => {
    addToCart(id);
  };
  //to remove the item completely
  const handleRemove = id => {
    removeItem(id);
  };
  //to add the quantity
  const handleAddQuantity = id => {
    addQuantity(id);
  };
  //to substruct from the quantity
  const handleSubtractQuantity = id => {
    subtractQuantity(id);
  };

  return (
    <Fragment>
      <Typography variant='h6' gutterBottom>
        Service summary
      </Typography>
      <List disablePadding>
        {items.map(product => (
          <ListItem className={classes.listItem} key={product._id}>
            <ListItemText
              primary={product.typeOfServices}
              secondary={product.description}
            />
            <Typography variant='body2' key={product.id}>
              ${product.amount}
            </Typography>

            <Grid
              container
              direction='row'
              justify='flex-end'
              alignItems='center'
              className={classes.grid}
            >
              <Link to={`/checkout/${profile.user._id}`}>
                <i
                  onClick={() => handleSubtractQuantity(product._id)}
                  disabled={product.quantity == undefined}
                  key={product._id}
                >
                  <RemoveIcon className={classes.icon} />
                </i>
              </Link>
              <div className={classes.margin}>
                <Typography gutterBottom variant='h6'>
                  {product.quantity}
                </Typography>
              </div>
              <span
                onClick={() =>
                  !product.quantity
                    ? handleAddToCart(product._id)
                    : handleAddQuantity(product._id)
                }
                key={product.id}
              >
                <AddIcon className={classes.icon} />
              </span>
            </Grid>
          </ListItem>
        ))}

        <br />
        <br />
        <Grid
          container
          direction='row'
          justify='flex-end'
          alignItems='center'
          className={classes.totals}
        >
          <ListItem className={classes.values}>
            <ListItemText primary='Service' />
            <Typography variant='subtitle1' className={classes.subtitle}>
              ${total}
            </Typography>
          </ListItem>
          <ListItem className={classes.values}>
            <ListItemText primary='Fee' />
            <Typography variant='subtitle1' className={classes.subtitle}>
              ${total * 0.05}
            </Typography>
          </ListItem>
          <ListItem className={classes.values}>
            <ListItemText primary='Total' />
            <Typography variant='subtitle1' className={classes.total}>
              ${total + total * 0.05}
            </Typography>
          </ListItem>
        </Grid>
      </List>
      {/* <Divider /> */}
      {/* <Date /> */}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.cart
    // items: state.items,
    // addedItems: state.addedItems
  };
};
const mapDispatchToProps = dispatch => {
  return {
    removeItem: id => {
      dispatch(removeItem(id));
    },
    addQuantity: id => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: id => {
      dispatch(subtractQuantity(id));
    },
    addToCart: id => {
      dispatch(addToCart(id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Review);
