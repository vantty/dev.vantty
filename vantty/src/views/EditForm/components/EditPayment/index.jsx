import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import { Payment } from "../../../Form/components";

const EditPayment = () => {
  return (
    <Fragment>
      <EditForm Children={<Payment />} />
    </Fragment>
  );
};

export default EditPayment;
