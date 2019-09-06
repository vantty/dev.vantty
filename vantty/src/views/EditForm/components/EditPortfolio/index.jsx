import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import { AddPortfolio } from "../../../Form/components";

const EditPortfolio = () => {
  return (
    <Fragment>
      <EditForm Children={<AddPortfolio />} />
    </Fragment>
  );
};

export default EditPortfolio;
