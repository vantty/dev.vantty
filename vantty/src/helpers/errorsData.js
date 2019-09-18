export const schemaErrors = {
  firstName: {
    presence: { allowEmpty: false, message: "is required" },
    // firstName: false,
    length: {
      maximum: 20
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: "is required" },
    // lastName: false,
    length: {
      maximum: 30
    }
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64
    }
  }
};
