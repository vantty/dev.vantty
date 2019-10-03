import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import { Categories } from "../../../Form/components";

const EditCategories = () => {
  return (
    <Fragment>
      <EditForm Children={<Categories />} />
    </Fragment>
  );
};

export default EditCategories;
