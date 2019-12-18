import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
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
  const [open, setOpen] = React.useState(services[0] ? false : true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List component='div' disablePadding>
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

    // <List
    //   component='nav'
    //   aria-labelledby='nested-list-subheader'
    //   className={classes.root}
    // >
    //   <ListItem button onClick={handleClick}>
    //     {/* <ListItemIcon>
    //       <InboxIcon />
    //     </ListItemIcon> */}
    //     <ListItemText primary='Add new services' />
    //     {open ? <ExpandLess /> : <ExpandMore />}
    //   </ListItem>
    //   {/* <Collapse in={open} timeout='auto' unmountOnExit> */}
    //     <List component='div' disablePadding>
    //       <ListItem className={classes.nested}>
    //         <Services
    //           serviceData={serviceData}
    //           onChange={onChange}
    //           onSubmitPrice={onSubmitPrice}
    //         />
    //       </ListItem>
    //     </List>
    //   {/* </Collapse> */}
    // </List>
  );
}