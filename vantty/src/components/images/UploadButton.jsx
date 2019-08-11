import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";

const UploadButton = ({ onChange }) => {
  return (
    <Fragment>
      <Button variant='contained' component='label' color='primary'>
        Upload File
        <input
          style={{ display: "none" }}
          type='file'
          name='file'
          multiple
          onChange={onChange}
        />
      </Button>
    </Fragment>
  );
};

export default UploadButton;
