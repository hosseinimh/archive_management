import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { User as Entity } from "../../../../../http/entities";
import {
  setPageAction,
  setPageTitleAction,
} from "../../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../../utils/BasePageUtils";
import { BASE_PATH, USER_ROLES } from "../../../../../constants";
import { setLoadingAction } from "../../../../../state/layout/layoutActions";
import { editUserSchema as schema } from "../../../../validations";
import {
  editUserPage,
  editProfilePage,
} from "../../../../../constants/strings/fa";
import { setPagePropsAction } from "../../../../../state/page/pageActions";

export class PageUtils extends BasePageUtils {
  constructor(userId) {
    const form = useForm({
      resolver: yupResolver(schema),
    });
    const userState = useSelector((state) => state.userReducer);
    const strings =
      userState?.user?.id === userId ? editProfilePage : editUserPage;
    super("Users", strings, form);
    this.entity = new Entity();
    this.initialPageProps = {
      userId,
    };
    this.callbackUrl = `${BASE_PATH}/users`;
  }

  onLoad() {
    this.navigateIfNotValidateParams();
    super.onLoad();
    const name =
      this.initialPageProps.userId === this.userState?.user?.id
        ? "EditProfile"
        : "Users";
    this.dispatch(setPageAction(name));
    this.dispatch(setPagePropsAction(this.initialPageProps));
    this.fillForm(this.initialPageProps);
  }

  navigateIfNotValidateParams() {
    this.navigateIfNotValidId(this.initialPageProps.userId);
  }

  async fillForm(data) {
    try {
      this.dispatch(setLoadingAction(true));
      const result = await this.fetchItem(data.userId);
      this.navigateIfItemNotFound(result);
      this.handleFetchResult(result);
    } catch {
    } finally {
      this.dispatch(setLoadingAction(false));
    }
  }

  async fetchItem(id) {
    return await this.entity.get(id);
  }

  handleFetchResult(result) {
    this.useForm.setValue("name", result.item.name);
    this.useForm.setValue("family", result.item.family);
    this.useForm.setValue("mobile", result.item.mobile);
    this.useForm.setValue("isActive", result.item.isActive);
    this.useForm.setValue(
      result.item.role === USER_ROLES.ADMINISTRATOR ? "administrator" : "user",
      "on"
    );
    this.dispatch(
      setPageTitleAction(
        `${this.strings._title} [ ${result.item.name} ${result.item.family} - ${result.item.username} ]`,
        this.strings._subTitle
      )
    );
  }

  async onSubmit(data) {
    const promise = this.handleSubmit(data);
    this.onModifySubmit(promise);
  }

  async handleSubmit(data) {
    const role = data.administrator
      ? USER_ROLES.ADMINISTRATOR
      : USER_ROLES.USER;
    return this.entity.update(
      this.pageState?.props?.userId,
      data.name,
      data.family,
      data.mobile,
      role,
      data.isActive ? 1 : 0
    );
  }
}
