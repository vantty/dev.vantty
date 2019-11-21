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
import { TableServices } from "./componets";

const useStyles = makeStyles(theme => ({
  root: {
    // margin: "0" + "!important"
  },
  nested: {
    paddingLeft: 0
  }
}));

export default function NestedList({ services, onChange }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component='nav'
      aria-labelledby='nested-list-subheader'
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary='Services' />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding className={classes.listItem}>
          <TableServices services={services} onChange={onChange} />
        </List>
      </Collapse>
    </List>
  );
}
