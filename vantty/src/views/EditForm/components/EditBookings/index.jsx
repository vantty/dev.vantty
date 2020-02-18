import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import Bookings from "../../../Bookings";

const EditBookings = () => {
  return (
    <Fragment>
      <EditForm Children={<Bookings />} />
    </Fragment>
  );
};

export default EditBookings;
