import { useForm } from "react-hook-form";

import { Notification as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { notificationsPage as strings } from "../../../../constants/strings/fa";

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

    async fillForm() {
        const promise = this.entity.getPaginate(
            this.pageState.props?.pageNumber ?? 1
        );
        super.fillForm(promise);
    }
}
