import { validation as strings } from "../../../constants/strings/fa";

const mobileValidator = (schema, field, required = true) => {
  schema = schema.matches(
    /^([0][9][1-4][0-9]{8})+$/,
    strings.notValidMessage.replace(":field", field)
  );
  if (required) {
    schema = schema.required(strings.requiredMessage.replace(":field", field));
  }
  return schema;
};

export default mobileValidator;
