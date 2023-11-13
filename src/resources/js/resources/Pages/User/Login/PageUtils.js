import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { clearMessageAction } from "../../../../state/message/messageActions";
import { fetchLoginAction } from "../../../../state/user/userActions";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { loginUserSchema as schema } from "../../../validations";
import { loginUserPage as strings } from "../../../../constants/strings/fa";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm({
      resolver: yupResolver(schema),
    });
    super("Users", strings, form);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(data) {
    this.dispatch(setLoadingAction(true));
    this.dispatch(clearMessageAction());
    this.dispatch(fetchLoginAction(data.username, data.password));
  }
}
