import { validation } from "../../../constants/strings/fa";

const numberValidator = (
    schema,
    field,
    min = null,
    max = null,
    required = true,
    customMinMessage = null,
    customMaxMessage = null
) => {
    schema = schema
        .number()
        .typeError(validation.numberMessage.replace(":field", field))
        .transform((_, val) => (val !== "" ? Number(val) : null));
    if (!required) {
        schema = schema.nullable();
    } else {
        schema = schema.nonNullable(
            validation.requiredMessage.replace(":field", field)
        );
    }
    if (min) {
        schema = schema.min(
            min,
            customMinMessage ??
                validation.minNumberMessage
                    .replace(":field", field)
                    .replace(":min", min)
        );
    }
    if (max) {
        schema = schema.max(
            max,
            customMaxMessage ??
                validation.maxNumberMessage
                    .replace(":field", field)
                    .replace(":max", max)
        );
    }

    return schema;
};

export default numberValidator;
