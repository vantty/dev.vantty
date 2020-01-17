import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from "@material-ui/core";

// Actions
import { deleteCard } from "../../../../../../actions/book";
import CheckoutContext from "../../../../CheckoutContext";

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(1),
    width: "100%"
  },
  table: {
    width: "100%"
  }
}));

const CardsList = ({ cards, isEdit, deleteCard, cardSelected }) => {
  const classes = useStyles();
  // const [value, setValue] ="");
  const { onChangeTarget } = useContext(CheckoutContext);

  const handleChange = event => {
    // setValue(event.target.value);
    onChangeTarget(event);
  };

  const handleDelete = stripeCardId => {
    deleteCard(stripeCardId);
  };

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Saved Cards</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="stripeCardId"
          value={cardSelected}
          onChange={handleChange}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell align="left">Brand</TableCell>
                <TableCell align="left">Number</TableCell>
                <TableCell align="left">EXP</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.map(card => (
                <TableRow key={card.stripeCardId}>
                  <TableCell align="left" key={card.stripeCardId}>
                    {!isEdit ? (
                      <FormControlLabel
                        key={card.stripeCardId}
                        value={card.stripeCardId}
                        control={<Radio />}
                      />
                    ) : (
                      <IconButton
                        onClick={() => handleDelete(card.stripeCardId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell align="left">{card.brand}</TableCell>
                  <TableCell align="left">{card.last4}</TableCell>
                  <TableCell align="left">
                    {card.expMonth}/{card.expYear}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* {cards.map(card => (
            <FormControlLabel
              key={card.stripeCardId}
              value={card.stripeCardId}
              control={<Radio />}
            />
          ))} */}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

CardsList.propTypes = {
  deleteCard: PropTypes.func
};

// const mapStateToProps = state => ({
//   user: state.auth.user
// });

export default connect(null, { deleteCard })(CardsList);
