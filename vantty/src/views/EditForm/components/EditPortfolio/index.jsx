import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import { AddPortfolio } from "../../../Form/components";

const EditPortfolio = () => {
  return (
    <Fragment>
      <EditForm Children={<AddPortfolio />} index={2} />
    </Fragment>
  );
};

export default EditPortfolio;
