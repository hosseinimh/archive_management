import * as yup from "yup";

import { stringValidator } from "../CommonValidators";
import {
  changePasswordUserPage as strings,
  validation,
} from "../../../constants/strings/fa";

const changePasswordUserSchema = yup.object().shape({
  newPassword: stringValidator(yup.string(), strings.newPassword, 6, 50),
  confirmPassword: stringValidator(yup.string(), strings.confirmPassword).oneOf(
    [yup.ref("newPassword")],
    validation.confirmedMessage.replace(":field", strings.newPassword)
  ),
});

export default changePasswordUserSchema;
