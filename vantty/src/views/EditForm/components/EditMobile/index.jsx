import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import { InfoContact } from "../../../Form/components";

const EditMobile = () => {
  return (
    <Fragment>
      <EditForm Children={<InfoContact />} />
    </Fragment>
  );
};

export default EditMobile;
