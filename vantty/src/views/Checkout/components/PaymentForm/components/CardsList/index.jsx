import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(1),
    width: "100%"
  },
  table: {
    width: "100%"
  }
}));

export default function RadioButtonsGroup({ cards, onChangeTarget }) {
  const classes = useStyles();
  const [value, setValue] = useState("");

  const handleChange = event => {
    setValue(event.target.value);
    onChangeTarget(event);
  };

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Saved Cards</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="stripeCardId"
          value={value}
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
                    <FormControlLabel
                      key={card.stripeCardId}
                      value={card.stripeCardId}
                      control={<Radio />}
                    />
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
}
