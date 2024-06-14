import { useForm } from "react-hook-form";

import { Error as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { errorsPage as strings } from "../../../../constants/strings/fa";
import { BASE_PATH } from "../../../../constants";
import {
    setLoadingAction,
    setShownModalAction,
} from "../../../../state/layout/layoutActions";
import { clearMessageAction } from "../../../../state/message/messageActions";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm();
        super("Errors", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            pageNumber: 1,
            item: null,
            items: null,
            action: null,
        };
        this.onExcel = this.onExcel.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onLoad() {
        super.onLoad();
        this.fillForm();
    }

    onExcel() {
        let url = `${BASE_PATH}/errors/excel`;
        window.open(url, "_blank").focus();
    }

    async onRemove() {
        this.dispatch(setLoadingAction(true));
        await this.entity.delete();
        await this.fillForm();
    }

    async fillForm() {
        const promise = this.entity.getPaginate(
            this.pageState.props?.pageNumber ?? 1
        );
        super.fillForm(promise);
    }

    showErrorModal(e, item) {
        this.dispatch(clearMessageAction());
        e.stopPropagation();
        this.dispatch(
            setShownModalAction("errorModal", {
                error: item,
            })
        );
    }
}
