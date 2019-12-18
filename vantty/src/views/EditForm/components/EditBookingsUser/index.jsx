import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import BookingsUser from "../../../BookingsUser";

const EditBookings = () => {
  return (
    <Fragment>
      <EditForm Children={<BookingsUser />} />
    </Fragment>
  );
};

export default EditBookings;
