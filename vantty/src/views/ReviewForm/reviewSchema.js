import * as Yup from "yup";

export const ReviewSchema = Yup.object().shape({
  subject: Yup.string()
    //   .min(2, 'Too Short!')
    //   .max(50, 'Too Long!')
    .required("Required")
  // lastName: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  // email: Yup.string()
  //   .email('Invalid email')
  //   .required('Required'),
});
