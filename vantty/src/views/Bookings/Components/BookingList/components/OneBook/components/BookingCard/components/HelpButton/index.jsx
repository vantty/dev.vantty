import React, { useState } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Components
import { ConfirmationModal } from "../../../../../../../../../../components";

// Material-UI
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const HelpButton = ({ changeStateBooking, booking: { state, _id } }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  // const handleDecline = () => {
  //   setAnchorEl(null);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={RouterLink} to="/help">
          Report a problem
        </MenuItem>
        {state === "accepted" ? (
          <ConfirmationModal
            buttonText={"Decline this service"}
            modalText={
              "Are you sure you want to decline this service? If you cancel within 4 hours prior the service we will charge you with 50% of the total service value."
            }
            changeStateBooking={changeStateBooking}
            bookingId={_id}
            state={"declined"}
            byUser={false}
          />
        ) : null}
      </Menu>
    </div>
  );
};

export default connect(null, {})(withRouter(HelpButton));
