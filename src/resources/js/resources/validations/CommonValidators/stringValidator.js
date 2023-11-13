import { validation as strings } from "../../../constants/strings/fa";

const stringValidator = (
    schema,
    field,
    min = null,
    max = null,
    required = true
) => {
    if (min) {
        schema = schema.min(
            min,
            strings.minMessage.replace(":field", field).replace(":min", min)
        );
    }
    if (max) {
        schema = schema.max(
            max,
            strings.maxMessage.replace(":field", field).replace(":max", max)
        );
    }
    if (required) {
        schema = schema.required(
            strings.requiredMessage.replace(":field", field)
        );
    }
    return schema;
};

export default stringValidator;
