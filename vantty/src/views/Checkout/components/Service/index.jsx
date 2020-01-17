import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Progress from "@material-ui/core/LinearProgress";

// Actions
import {
  removeItem,
  addQuantity,
  subtractQuantity,
  addToCart
} from "../../../../actions/cart";

// Components
import { Date } from "./components";

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
  // button: { width: "1rem", height: "1rem", alignItems: "center" },
  margin: {
    width: "2rem",
    margin: "1rem",
    fontSize: "1rem"
    // justifyContent: "center",
    // width: "2rem",
    // height: "2rem",
    // border: "1px solid grey",
    // padding: "1px",
    // margin: "1px"
  },
  paper: {
    padding: theme.spacing(),
    textAlign: "center",
    color: theme.palette.text.secondary
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
  onChange,
  onChangeDate,
  date,
  hour
}) => {
  const classes = useStyles();

  // const { profile, items, total } = useSelector(state => ({
  //   profile: state.profile,
  //   items: state.cart.items,
  //   total: state.cart.total
  // }));

  useEffect(() => {
    initialServices(profile.services);
  }, []);

  //to add to cart
  const handleAddToCart = id => {
    addToCart(id);
  };
  //to remove the item completely
  // const handleRemove = id => {
  //   removeItem(id);
  // };
  //to add the quantity
  const handleAddQuantity = id => {
    addQuantity(id);
  };
  //to substruct from the quantity
  const handleSubtractQuantity = id => {
    subtractQuantity(id);
    removeItem(id);
  };

  const subtotal = total;
  const money = {
    transFee: subtotal * process.env.REACT_APP_TRANSFER_FEE,
    total:
      subtotal *
      (1 -
        process.env.REACT_APP_VANTTY_FEE -
        process.env.REACT_APP_TRANSFER_FEE)
  };

  return (
    <Fragment>
      <Date onChangeDate={onChangeDate} localDate={date} localTime={hour} />

      <Typography variant="h6" gutterBottom>
        Service summary
      </Typography>

      <List disablePadding>
        {profile && items ? (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            {items.map(product => (
              <ListItem className={classes.listItem} key={product._id}>
                <Grid item xs={4}>
                  <ListItemText
                    className={classes.paper}
                    primary={product.typeOfServices}
                    secondary={product.description}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="body2"
                    key={product.id}
                    className={classes.paper}
                  >
                    ${product.amount}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <span>
                    <button
                      className={classes.button}
                      disabled={
                        (product.quantity === 0 && true) ||
                        (product.quantity === undefined && true)
                      }
                      onClick={() => handleSubtractQuantity(product._id)}
                      key={product._id}
                    >
                      <RemoveIcon className={classes.icon} />
                    </button>
                    {/* <div className={classes.margin}> */}
                    {/* <Typography gutterBottom variant='h6'> */}
                    <span className={classes.margin}>{product.quantity}</span>
                    {/* </Typography> */}
                    {/* </div> */}
                    <button
                      disabled={product.quantity === 3 && true}
                      onClick={() =>
                        !product.quantity
                          ? handleAddToCart(product._id)
                          : handleAddQuantity(product._id)
                      }
                      key={product.id}
                    >
                      <AddIcon className={classes.icon} />
                    </button>
                  </span>
                </Grid>
              </ListItem>
            ))}

            <br />
            <br />
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              className={classes.totals}
            >
              <ListItem className={classes.values}>
                <ListItemText primary="Service" />
                <Typography variant="subtitle1" className={classes.subtitle}>
                  ${subtotal.toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem className={classes.values}>
                <ListItemText primary="Fee" />
                <Typography variant="subtitle1" className={classes.subtitle}>
                  ${money.transFee.toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem className={classes.values}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" className={classes.total}>
                  ${money.total.toFixed(2)}
                </Typography>
              </ListItem>
            </Grid>
          </Grid>
        ) : (
          <Progress />
        )}
      </List>
      {/* <Divider /> */}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    // cart: state.cart
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
