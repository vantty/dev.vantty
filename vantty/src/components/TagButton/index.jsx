import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import ToggleButton from "@material-ui/lab/ToggleButton";

const styles = () => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  buttonBlue: {
    background: "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .30)"
  }
});

export default function StandaloneToggleButton() {
  const [selected, setSelected] = React.useState(false);

  const classes = styles();
  return (
    <ToggleButton
      value='check'
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
      className={classes.root}
      size='small'
    >
      <span className={classes.button}>social</span>
    </ToggleButton>
  );
}
