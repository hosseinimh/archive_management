import { useForm } from "react-hook-form";

import { Notification as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { notificationsPage as strings } from "../../../../constants/strings/fa";
import { setPagePropsAction } from "../../../../state/page/pageActions";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm();
    super("Notifications", strings, form);
    this.entity = new Entity();
    this.initialPageProps = {
      pageNumber: 1,
      category: 0,
      item: null,
      items: null,
      action: null,
    };
  }

  onLoad() {
    super.onLoad();
    this.fillForm();
  }

  onChangeCategory(category) {
    this.dispatch(
      setPagePropsAction({
        action: "SET_CATEGORY",
        category,
      })
    );
  }

  onAction(props) {
    switch (props.action) {
      case "SET_CATEGORY":
        this.fillForm();
        break;
    }

    super.onAction(props);
  }

  async fillForm() {
    const promise = this.entity.getPaginate(
      this.pageState?.props?.category,
      this.pageState.props?.pageNumber ?? 1
    );
    super.fillForm(promise);
  }
}
