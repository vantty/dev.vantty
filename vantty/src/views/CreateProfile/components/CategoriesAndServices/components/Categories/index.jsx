import React, { Fragment } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(),
    width: "100%"
    // minWidth: 120,
    // maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const hair = [
  "corte",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander"
];

const makeup = [
  "Artistic",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander"
];

function getStyles(name, stateHair, theme) {
  return {
    fontWeight:
      stateHair.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function MultipleSelect({
  stateHair,
  stateMakeup,
  handleChangeMakeup,
  handleChangeHair,
  formData,
  onChange
}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Fragment>
        <Typography>Categoties</Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-mutiple-chip-label'>Hair</InputLabel>
          <Select
            labelId='demo-mutiple-chip-label'
            id='demo-mutiple-chip'
            multiple
            value={stateHair}
            onChange={handleChangeHair}
            input={<Input id='select-multiple-chip' />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {hair.map(name => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, stateHair, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* MAKEUP */}
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-mutiple-chip-label'>Makeup</InputLabel>
          <Select
            labelId='demo-mutiple-chip-label'
            id='demo-mutiple-chip'
            multiple
            value={stateMakeup}
            onChange={handleChangeMakeup}
            input={<Input id='select-multiple-chip' />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {makeup.map(name => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, stateMakeup, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <Services formData={formData} onChange={onChange} /> */}
      </Fragment>
    </div>
  );
}
