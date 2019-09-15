import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import { PersonalInfo } from "../../../Form/components";

const EditPortfolio = () => {
  return (
    <Fragment>
      <EditForm Children={<PersonalInfo />} />
    </Fragment>
  );
};

export default EditPortfolio;
