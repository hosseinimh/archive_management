import { useForm } from "react-hook-form";

import { Document as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { documentsPage as strings } from "../../../../constants/strings/fa";
import { clearMessageAction } from "../../../../state/message/messageActions";
import { setShownModalAction } from "../../../../state/layout/layoutActions";
import { setPagePropsAction } from "../../../../state/page/pageActions";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm();
        super("Documents", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            pageNumber: 1,
            item: null,
            items: null,
            action: null,
        };
        this.handleDocumentFilesSubmit =
            this.handleDocumentFilesSubmit.bind(this);
    }

    onLoad() {
        super.onLoad();
        this.fillForm();
    }

    addAction() {
        this.navigate(`${BASE_PATH}/documents/add`);
    }

    editAction({ id }) {
        if (utils.isId(id)) {
            this.navigate(`${BASE_PATH}/documents/edit/${id}`);
        }
    }

    async fillForm() {
        const promise = this.entity.getPaginate(
            this.pageState.props?.pageNumber ?? 1
        );
        super.fillForm(promise);
    }

    showDocumentFilesModal(e, item) {
        this.dispatch(clearMessageAction());
        e.stopPropagation();
        this.dispatch(
            setShownModalAction("documentFilesModal", {
                document: item,
                onSubmit: this.handleDocumentFilesSubmit,
            })
        );
    }

    handleDocumentFilesSubmit(result) {
        if (result === true) {
            this.dispatch(setPagePropsAction(this.initialPageProps));
            this.fillForm({ pageNumber: 1 });
        }
    }
}
