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
import Fab from "@material-ui/core/Fab";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

// Actions
import {
  removeItem,
  addQuantity,
  subtractQuantity,
  addToCart
} from "../../../../actions/cart";

// Components
import { Date } from "./components";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
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
    width: "10rem",
    marginTop: "3rem"
  },
  icon: {
    fontSize: "30"
  },
  margin: {
    width: "2rem",
    margin: "1rem",
    fontSize: "1rem"
  },
  typo: {
    padding: theme.spacing(),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  "@global": {
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: "none"
    }
  },
  button: {
    backgroundColor: theme.palette.greenVantty.main,
    width: "1rem",
    height: "1rem",
    paddingRight: "0rem",
    paddingLeft: "0rem",
    fontSize: "0.3rem"
  },
  addSubstractButton: {
    minHeight: `24px !important`,
    width: "2rem",
    height: "2rem",
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
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
  date
}) => {
  const classes = useStyles();

  useEffect(() => {
    initialServices(profile.services);
  }, [initialServices, profile.services]);

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
    total: subtotal + subtotal * process.env.REACT_APP_TRANSFER_FEE
  };

  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Date
          </Typography>
          <form className={classes.form} noValidate>
            <Date onChangeDate={onChangeDate} localDate={date} />
            <List>
              {profile && items ? (
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  {items.map(product => (
                    <ListItem className={classes.listItem} key={product._id}>
                      <Divider />
                      <Grid item xs={6}>
                        {" "}
                        <ListItemText
                          primary={product.typeOfService}
                          secondary={product.description}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Typography
                          variant="body1"
                          key={product.id}
                          className={classes.typo}
                        >
                          ${product.amount}
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <span>
                          <Fab
                            disabled={
                              (product.quantity === 0 && true) ||
                              (product.quantity === undefined && true)
                            }
                            onClick={() => handleSubtractQuantity(product._id)}
                            key={product._id}
                            color="primary"
                            aria-label="add"
                            className={classes.addSubstractButton}
                          >
                            <RemoveIcon className={classes.icon} />
                          </Fab>
                          <span className={classes.margin}>
                            {product.quantity === undefined
                              ? "0"
                              : product.quantity}
                          </span>
                          <Fab
                            disabled={product.quantity === 3 && true}
                            onClick={() =>
                              !product.quantity
                                ? handleAddToCart(product._id)
                                : handleAddQuantity(product._id)
                            }
                            key={product.id}
                            color="primary"
                            aria-label="add"
                            className={classes.addSubstractButton}
                          >
                            <AddIcon />
                          </Fab>
                        </span>
                      </Grid>
                      <Divider />
                    </ListItem>
                  ))}
                </Grid>
              ) : (
                <Progress />
              )}
            </List>
            <div className={classes.totals}>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
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
            </div>
          </form>
        </div>
      </Container>
    </Fragment>
  );
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

export default connect(null, mapDispatchToProps)(Review);
