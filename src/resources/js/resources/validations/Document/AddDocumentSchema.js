import * as yup from "yup";

import { dateValidator, stringValidator } from "../CommonValidators";
import { addDocumentPage as strings } from "../../../constants/strings/fa";

const addDocumentSchema = yup.object().shape({
    documentNo: stringValidator(yup.string(), strings.documentNo, 1, 99999),
    documentDate: dateValidator(yup.string(), strings.documentDate, false),
    paymentNo: stringValidator(
        yup.string(),
        strings.paymentNo,
        null,
        50,
        false
    ),
    paymentDate: dateValidator(yup.string(), strings.paymentDate, false),
    owner: stringValidator(yup.string(), strings.owner, null, 50, false),
    description: stringValidator(
        yup.string(),
        strings.description,
        null,
        1000,
        false
    ),
});

export default addDocumentSchema;
