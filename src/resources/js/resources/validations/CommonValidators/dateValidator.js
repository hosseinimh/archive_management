import stringValidator from "./stringValidator";
import { validation as strings } from "../../../constants/strings/fa";

const dateValidator = (schema, field, required = true) => {
    const regex = required
        ? /^([1][3-4][0-9]{2}\/((0[1-6]\/(0[1-9]|[1-2][0-9]|3[0-1]))|(0[7-9]\/(0[1-9]|[1-2][0-9]|30))|(1[0-1]\/(0[1-9]|[1-2][0-9]|30))|(12\/(0[1-9]|[1-2][0-9]))))+$/
        : /^([1][3-4][0-9]{2}\/((0[1-6]\/(0[1-9]|[1-2][0-9]|3[0-1]))|(0[7-9]\/(0[1-9]|[1-2][0-9]|30))|(1[0-1]\/(0[1-9]|[1-2][0-9]|30))|(12\/(0[1-9]|[1-2][0-9]))))*$/;
    schema = stringValidator(
        schema,
        field,
        required ? 10 : null,
        10,
        required
    ).matches(regex, strings.notValidMessage.replace(":field", field));
    return required
        ? schema.nonNullable(strings.requiredMessage.replace(":field", field))
        : schema.nullable();
};

export default dateValidator;
