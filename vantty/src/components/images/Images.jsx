import React from "react";
import CancelIcon from "@material-ui/icons/CancelRounded";

export default ({ images, removeImage, onError }) =>
  images.map((image, i) => (
    <div key={i}>
      <div onClick={() => removeImage(image.public_id)}>
        <CancelIcon />
      </div>
      <img
        src={image.secure_url}
        alt=''
        style={{ width: "800px" }}
        onError={() => onError(image.public_id)}
      />
    </div>
  ));
