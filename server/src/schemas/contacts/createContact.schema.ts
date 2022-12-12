import * as yup from "yup";
import { SchemaOf } from "yup";
import { IContactSchema } from "../../interfaces/contacts";

const createContactSchema: SchemaOf<IContactSchema> = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]*$/, "Name field can only have letters")
    .required()
    .max(20, "name field must have no more than 20 charaters"),

  phones: yup
    .array()
    .of(
      yup
        .string()
        .min(10, "Phone field must have at least 10 digits")
        .matches(/^[0-9]*$/, "can only have integers")
    )
    .notRequired(),
  emails: yup.array().of(yup.string()).notRequired(),
});

export default createContactSchema;
