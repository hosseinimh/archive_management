import * as yup from "yup";

import { mobileValidator, nameValidator } from "../CommonValidators";
import { editUserPage as strings } from "../../../constants/strings/fa";

const editUserSchema = yup.object().shape({
  name: nameValidator(yup.string(), strings.name, 2, 50),
  family: nameValidator(yup.string(), strings.family, 2, 50),
  mobile: mobileValidator(yup.string(), strings.mobile),
});

export default editUserSchema;
