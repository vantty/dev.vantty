import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Services } from "./components";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function NestedList({
  serviceData,
  onChange,
  onSubmitPrice,
  services,
  deleteService,
  availability,
  onChangeAvailability,
  onSubmitAvailability
}) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(services[0] ? false : true);

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  return (
    <List component="div" disablePadding>
      <ListItem className={classes.nested}>
        <Services
          serviceData={serviceData}
          onChange={onChange}
          onSubmitPrice={onSubmitPrice}
          availability={availability}
          onChangeAvailability={onChangeAvailability}
          onSubmitAvailability={onSubmitAvailability}
        />
      </ListItem>
    </List>
  );
}
