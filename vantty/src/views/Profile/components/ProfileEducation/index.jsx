import React from "react";
import PropTypes from "prop-types";

const ProfileEducation = ({ education: { school, degree, description } }) => {
  return (
    <div>
      <p>
        <strong>School: </strong>
        {school}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>description: </strong>
        {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducation;
