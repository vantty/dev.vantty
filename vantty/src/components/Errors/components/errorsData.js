export const schemaErrors = {
  firstName: {
    presence: { allowEmpty: false, message: "is required" },
    // firstName: false,
    length: {
      maximum: 6
    }
  }
};
