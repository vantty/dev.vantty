import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import { Bank } from "../../../Form/components";

const EditBank = () => {
  return (
    <Fragment>
      <EditForm Children={<Bank />} />
    </Fragment>
  );
};

export default EditBank;
