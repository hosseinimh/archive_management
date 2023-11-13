import * as yup from "yup";

import {
  mobileValidator,
  nameValidator,
  stringValidator,
} from "../CommonValidators";
import {
  addUserPage as strings,
  validation,
} from "../../../constants/strings/fa";

const addUserSchema = yup.object().shape({
  username: stringValidator(yup.string(), strings.username, 5, 50),
  password: stringValidator(yup.string(), strings.password, 6, 50),
  confirmPassword: stringValidator(yup.string(), strings.confirmPassword).oneOf(
    [yup.ref("password")],
    validation.confirmedMessage.replace(":field", strings.password)
  ),
  name: nameValidator(yup.string(), strings.name),
  family: nameValidator(yup.string(), strings.family),
  mobile: mobileValidator(yup.string(), strings.mobile),
});

export default addUserSchema;
