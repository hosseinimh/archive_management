import * as yup from "yup";

import { fileValidator, stringValidator } from "../CommonValidators";
import { documentFilesModal as strings } from "../../../constants/strings/fa";

const addDocumentFileSchema = yup.object().shape({
    fileDocumentFilesModal: fileValidator(
        yup.mixed(),
        strings.fileDocumentFilesModal,
        10 * 1024 * 1024,
        ["jpg", "jpeg", "png", "tiff", "pdf", "doc", "docx"]
    ),
    descriptionDocumentFilesModal: stringValidator(
        yup.string(),
        strings.descriptionDocumentFilesModal,
        null,
        1000,
        false
    ),
});

export default addDocumentFileSchema;
