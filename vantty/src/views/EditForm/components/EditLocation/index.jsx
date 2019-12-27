import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import { Location } from "../../../Form/components";

const EditLocation = () => {
  return (
    <Fragment>
      <EditForm Children={<Location />} index={2} />
    </Fragment>
  );
};

export default EditLocation;
