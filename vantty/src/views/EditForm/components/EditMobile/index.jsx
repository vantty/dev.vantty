import React, { Fragment } from "react";
import EditForm from "../../../EditForm";
import { InfoContact } from "../../../Form/components";
import DashboardUser from "../../../DashboardUser";

// const EditMobile = () => {
//   return (
//     <Fragment>
//       <EditForm Children={<InfoContact />} />
//     </Fragment>
//   );
// };

const EditMobile = () => {
  return (
    <Fragment>
      <EditForm Children={<DashboardUser />} />
    </Fragment>
  );
};

export default EditMobile;
