window.validationRules = {
  basicInfo: {
    name: {
      required: true,
      message: 'Name is required.'
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email.'
    },
    phone: {
      required: true,
      message: 'Phone number is required.'
    }
  },
  additionalInfo: {
    resume: {
      required: true,
      message: 'Resume is required.'
    }
  }
};
