import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequestPatch } from "../../interfaces/users";

const updateUserSchema: SchemaOf<IUserRequestPatch> = yup.object().shape({
  username: yup
    .string()
    .matches(
      /^[A-Za-z\s]*$/,
      "username field can have only letters, spaces and numbers"
    )
    .notRequired()
    .max(15, "Username field must have no more than 20 charaters")
    .min(5, "Username must have at least 5 characters"),

  password: yup
    .string()
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
      "password field must have at least 1 capital letter, 1 lower case letter, 1 number and 1 special character"
    )
    .notRequired()
    .max(50, "password field should have up to 50 characters")
    .min(5, "password field should have at least 4 characters"),
});

export default updateUserSchema;
