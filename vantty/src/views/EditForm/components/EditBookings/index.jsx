import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import { Bookings } from "../../../Form/components";

const EditBookings = () => {
  return (
    <Fragment>
      <EditForm Children={<Bookings />} />
      {/* <Bookings /> */}
    </Fragment>
  );
};

export default EditBookings;
