import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import { PersonalInfo } from "../../../Form/components";

const EditPersonalInfo = () => {
  return (
    <Fragment>
      <EditForm Children={<PersonalInfo />} />
    </Fragment>
  );
};

export default EditPersonalInfo;
