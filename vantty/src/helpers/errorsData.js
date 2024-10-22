export const schemaErrors = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    // firstName: false,
    length: {
      maximum: 20
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    // lastName: false,
    length: {
      maximum: 30
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  }
};

export const schemaErrorsCreateProfile = {
  bio: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300
    }
  },
  profession: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  city: {
    presence: { allowEmpty: false, message: 'is required' }
  }
};

export const schemaErrorsReview = {
  subject: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20
    }
  },
  text: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 200
    }
  }
};

export const serviceSchemaErrors = {
  amount: {
    numericality: {
      greaterThan: 0
    },
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 6
    }
  },
  typeOfService: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20
    }
  }
};
