import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import { Price } from "../../../Form/components";

const EditPrice = () => {
  return (
    <Fragment>
      <EditForm Children={<Price />} />
    </Fragment>
  );
};

export default EditPrice;
