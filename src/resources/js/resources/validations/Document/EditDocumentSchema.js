import * as yup from "yup";

import { dateValidator, stringValidator } from "../CommonValidators";
import { editDocumentPage as strings } from "../../../constants/strings/fa";

const editDocumentSchema = yup.object().shape({
    documentNo: stringValidator(yup.string(), strings.documentNo, 1, null),
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

export default editDocumentSchema;
