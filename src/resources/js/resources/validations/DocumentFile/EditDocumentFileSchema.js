import * as yup from "yup";

import { stringValidator } from "../CommonValidators";
import { documentFilesModal as strings } from "../../../constants/strings/fa";

const editDocumentFileSchema = yup.object().shape({
    descriptionDocumentFilesModal: stringValidator(
        yup.string(),
        strings.descriptionDocumentFilesModal,
        null,
        1000,
        false
    ),
});

export default editDocumentFileSchema;
