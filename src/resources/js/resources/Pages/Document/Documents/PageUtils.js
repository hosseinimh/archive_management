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
            year: null,
            item: null,
            items: null,
            action: null,
            searchFields: null,
        };
        this.handleSelectYearSubmit = this.handleSelectYearSubmit.bind(this);
        this.onExcel = this.onExcel.bind(this);
        this.handleDocumentFilesSubmit =
            this.handleDocumentFilesSubmit.bind(this);
    }

    onLoad() {
        super.onLoad();
        this.dispatch(
            setPagePropsAction({ year: this.layoutState?.documentYear })
        );
        this.fillForm(this.getSearchFields());
    }

    onSelectYearModal(e) {
        e.stopPropagation();
        this.dispatch(
            setShownModalAction("selectYearModal", {
                onSubmit: this.handleSelectYearSubmit,
            })
        );
    }

    onExcel() {
        let searchFields = this.pageState?.props?.searchFields;
        let url = `${BASE_PATH}/documents/excel?document_no=${encodeURIComponent(
            searchFields?.documentNo
        )}`;
        if (searchFields?.documentDate) {
            url = `${url}&document_date=${searchFields.documentDate}`;
        }
        if (searchFields?.paymentNo) {
            url = `${url}&payment_no=${searchFields.paymentNo}`;
        }
        if (searchFields?.paymentDate) {
            url = `${url}&payment_date=${searchFields.paymentDate}`;
        }
        if (searchFields?.owner) {
            url = `${url}&owner=${searchFields.owner}`;
        }
        window.open(url, "_blank").focus();
    }

    onAction(props) {
        switch (props.action) {
            case "SET_PAGE":
                props.action = null;
                this.onSubmit(this.getSearchFields());
                break;
        }

        super.onAction(props);
    }

    addAction() {
        this.navigate(`${BASE_PATH}/documents/add`);
    }

    editAction({ id }) {
        if (utils.isId(id)) {
            this.navigate(`${BASE_PATH}/documents/edit/${id}`);
        }
    }

    getSearchFields = () => {
        let searchFields = {
            documentNo:
                this.useForm.getValues("documentNo").length > 0
                    ? this.useForm.getValues("documentNo")
                    : this.layoutState?.documentYear + "/",
            documentDate: this.useForm.getValues("documentDate") ?? "",
            paymentNo: this.useForm.getValues("paymentNo") ?? undefined,
            paymentDate: this.useForm.getValues("paymentDate") ?? "",
            owner: this.useForm.getValues("owner") ?? undefined,
        };
        searchFields.documentDate = searchFields.documentDate.replaceAll(
            "/",
            ""
        );
        searchFields.documentDate =
            searchFields.documentDate.length > 0
                ? searchFields.documentDate
                : undefined;
        searchFields.paymentNo =
            searchFields.paymentNo.length > 0
                ? searchFields.paymentNo
                : undefined;
        searchFields.paymentDate = searchFields.paymentDate.replaceAll("/", "");
        searchFields.paymentDate =
            searchFields.paymentDate.length > 0
                ? searchFields.paymentDate
                : undefined;
        searchFields.owner =
            searchFields.owner.length > 0 ? searchFields.owner : undefined;
        return searchFields;
    };

    async fillForm(data = null) {
        const promise = this.entity.getPaginate(
            data.documentNo,
            data.documentDate,
            data.paymentNo,
            data.paymentDate,
            data.owner,
            this.pageState.props?.pageNumber ?? 1
        );
        this.dispatch(setPagePropsAction({ searchFields: { ...data } }));
        super.fillForm(promise);
    }

    onSubmit() {
        this.onSendRequest();
        this.fillForm(this.getSearchFields());
    }

    propsIfNull() {
        return this.getSearchFields();
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
            this.fillForm({ pageNumber: 1 });
        }
    }

    handleSelectYearSubmit(result, data) {
        if (result === true) {
            this.dispatch(setPagePropsAction({ year: data.year }));
        }
    }
}
