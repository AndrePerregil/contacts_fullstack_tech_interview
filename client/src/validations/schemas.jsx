import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[A-Za-z\s]*$/, "Only use letters!")
    .required()
    .max(15, "No more than 15 charaters!")
    .min(5, "At least 5 characters!"),

  password: yup
    .string()
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
      "Must be a strong password (Upper+lower+integer+symbol)!"
    )
    .required()
    .min(4, "At least 4 characters!")
    .max(50, "No more than 10 characters!"),
});

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[A-Za-z\s]*$/, "Only use letters!")
    .required()
    .max(15, "No more than 15 charaters!")
    .min(5, "At least 5 characters!"),

  password: yup
    .string()
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
      "Must be a strong password (Upper+lower+integer+symbol)!"
    )
    .required()
    .min(4, "At least 4 characters!")
    .max(50, "No more than 10 characters!"),

  confPassword: yup
    .string()
    .required("Must confirm Password")
    .oneOf([yup.ref("password")], "Password doesn't match"),
});
