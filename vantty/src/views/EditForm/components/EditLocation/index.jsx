import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import { Location } from "../../../Form/components";

const EditLocation = () => {
  return (
    <Fragment>
      <EditForm Children={<Location />} />
    </Fragment>
  );
};

export default EditLocation;
