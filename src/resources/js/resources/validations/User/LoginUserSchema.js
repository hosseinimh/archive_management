import * as yup from "yup";

import { stringValidator } from "../CommonValidators";
import { loginUserPage as strings } from "../../../constants/strings/fa";

const loginUserSchema = yup.object().shape({
    username: stringValidator(yup.string(), strings.username, 5, 50),
    password: stringValidator(yup.string(), strings.password, 6, 50),
});

export default loginUserSchema;
