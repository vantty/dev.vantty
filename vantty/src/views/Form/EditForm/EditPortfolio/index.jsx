import React, { Fragment } from "react";
import FrameForm from "..";
import AddPortfolio from "../../UserForm/AddPortfolio";

const EditPortfolio = () => {
  return (
    <Fragment>
      <FrameForm Children={<AddPortfolio />} />
      {/* <FrameForm>
        <AddPortfolio />
      </FrameForm> */}
    </Fragment>
  );
};

export default EditPortfolio;
