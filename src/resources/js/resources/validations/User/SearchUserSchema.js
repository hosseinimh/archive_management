import * as yup from "yup";

import { nameValidator, stringValidator } from "../CommonValidators";
import { usersPage as strings } from "../../../constants/strings/fa";

const searchUserSchema = yup.object().shape({
  username: stringValidator(yup.string(), strings.username, null, 50, false),
  nameFamily: nameValidator(yup.string(), strings.nameFamily, null, 50, false),
});

export default searchUserSchema;
