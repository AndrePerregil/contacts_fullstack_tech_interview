import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest } from "../../interfaces/users";

const createUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
  username: yup
    .string()
    .matches(/^[A-Za-z\s]*$/, "username field can only have letters")
    .required()
    .max(15, "Username field must have no more than 15 charaters")
    .min(5, "Username must have at least 5 characters"),

  password: yup
    .string()
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
      "password field must have at least 1 capital letter, 1 lower case letter, 1 number and 1 special character"
    )
    .required()
    .min(4, "password field should have at least 4 characters")
    .max(50, "password field should have up to 50 characters"),
});

export default createUserSchema;
