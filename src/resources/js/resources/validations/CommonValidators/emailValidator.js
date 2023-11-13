import { validation as strings } from "../../../constants/strings/fa";

const emailValidator = (schema, field, required = true) => {
  schema = schema
    .email(strings.notValidMessage.replace(":field", field))
    .matches(/@[^.]*\./, strings.notValidMessage.replace(":field", field))
    .min(5, strings.minMessage.replace(":field", field).replace(":min", "5"))
    .max(50, strings.maxMessage.replace(":field", field).replace(":max", "50"));
  if (required) {
    schema = schema.required(strings.requiredMessage.replace(":field", field));
  }
  return schema;
};

export default emailValidator;
