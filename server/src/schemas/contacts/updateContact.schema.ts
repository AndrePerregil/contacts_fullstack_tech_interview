import * as yup from "yup";
import { SchemaOf } from "yup";
import { IContactRequestPatch } from "../../interfaces/contacts";

const updateContactSchema: SchemaOf<IContactRequestPatch> = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]*$/, "username field can only have letters")
    .notRequired()
    .max(15, "Username field must have no more than 15 charaters")
    .min(5, "Username must have at least 5 characters"),

  phones: yup
    .array()
    .of(
      yup
        .string()
        .min(10, "Phone must have at least 10 digits")
        .matches(/^[0-9]*$/, "can only have integers")
    )
    .notRequired(),
  emails: yup.array().notRequired(),
});

export default updateContactSchema;
