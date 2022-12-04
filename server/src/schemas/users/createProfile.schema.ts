import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserProfileRequest } from "../../interfaces/users";

const createProfileSchema: SchemaOf<IUserProfileRequest> = yup.object().shape({
  phones: yup
    .array()
    .of(
      yup
        .string()
        .min(10, "Phone must have at least 10 digits")
        .matches(/^[0-9]*$/, "can only have integers")
    )
    .notRequired(),
  emails: yup.array().of(yup.string()).notRequired(),
});

export default createProfileSchema;
