import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import { Location } from "../../../Form/components";

const EditLocation = () => {
  return (
    <Fragment>
      <EditForm index={2}>
        <Location />
      </EditForm>
    </Fragment>
  );
};

export default EditLocation;
