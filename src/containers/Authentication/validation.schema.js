import * as Yup from "yup";

const emailNotLongEnough = "email must be at least 3 characters";
const emailRequired = "Please enter an email address";
const invalidEmail = "email must be a valid email";
const fieldRequired = "This field is required";
const nameNotLongEnough = "user's name must be at least 4 characters";
const passwordNotLongEnough = "password must be at least 8 characters";
const passwordDoNotMatch = "passwords must match";

export const loginValidationSchema = (showPhone) => {
  return Yup.object({
    login: showPhone
      ? Yup.string().min(12, "Must have 12 numbers").required(fieldRequired)
      : Yup.string()
          .min(3, emailNotLongEnough)
          .max(100)
          .email(invalidEmail)
          .required(emailRequired),
    password: Yup.string()
      .min(8, passwordNotLongEnough)
      .max(100)
      .required(fieldRequired),
  });
};

export const otpValidationSchema = () => {
  return Yup.object().shape({
    code: Yup.number().min(6, "code is too short").required(fieldRequired),
  });
};
export const signupValidationSchema = (is_teacher) => {
  return Yup.object().shape({
    // is_student: Yup.bool()
    //   .required("Select User Type.")
    //   .oneOf([true, false], "Select an Option"),
    email: Yup.string()
      .min(3, emailNotLongEnough)
      .max(100)
      .email(invalidEmail)
      .required(emailRequired),
    other_names: Yup.string()
      .min(1, nameNotLongEnough)
      .max(100)
      .required(fieldRequired),
    phone_number: Yup.string()
      .min(12, "Must have 12 numbers")
      .required(fieldRequired),
    password: Yup.string()
      .min(8, passwordNotLongEnough)
      .matches(/^.*[a-zA-Z].*$/, "Must Contain One Letter")
      .matches(/^.*\d.*$/, "Must Contain One Number")
      .max(100)
      .required(fieldRequired),
    password_confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], passwordDoNotMatch)
      .required(fieldRequired),
    extended_user: is_teacher
      ? Yup.object({
          honorofic_title: Yup.string().required("Required"),
          document_id: Yup.string()
            .min(6, "Document Number is short")
            .required("Required"),
          tsc_id: Yup.string().required("Required"),
        })
      : Yup.object({
          class_level: Yup.string().required("Required"),
          student_id: Yup.string().required("Required"),
        }),
  });
};
