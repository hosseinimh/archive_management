import * as yup from "yup";

import { dateValidator, stringValidator } from "../CommonValidators";
import { documentsPage as strings } from "../../../constants/strings/fa";

const searchDocumentSchema = yup.object().shape({
    documentNo: stringValidator(
        yup.string(),
        strings.documentNo,
        null,
        99999,
        false
    ),
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
});

export default searchDocumentSchema;
