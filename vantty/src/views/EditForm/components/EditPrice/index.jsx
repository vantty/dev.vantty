import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import { Services } from "../../../Form/components";

const EditServices = () => {
  return (
    <Fragment>
      <EditForm Children={<Services />} />
    </Fragment>
  );
};

export default EditServices;
