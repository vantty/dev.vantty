import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import { InfoContact } from "../../../Form/components";
import Table from "../Table";

const EditMobile = () => {
  return (
    <Fragment>
      <EditForm
        Children={<InfoContact />}
        page={"/mobile"}
        title={"Mobile"}
        index={0}
      />
    </Fragment>
  );
};

export default EditMobile;
