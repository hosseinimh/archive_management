import stringValidator from "./stringValidator";
import { validation as strings } from "../../../constants/strings/fa";

const nameValidator = (schema, field, min = 2, max = 50, required = true) => {
  const regex = required ? /^[آ-ی ]+$/ : /^[آ-ی ]*$/;
  return stringValidator(schema, field, min, max, required).matches(
    regex,
    strings.stringMessage.replace(":field", field)
  );
};

export default nameValidator;
