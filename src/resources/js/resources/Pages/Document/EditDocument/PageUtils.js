import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Document as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import {
    setLoadingAction,
    setShownModalAction,
} from "../../../../state/layout/layoutActions";
import { editDocumentSchema as schema } from "../../../validations";
import { editDocumentPage as strings } from "../../../../constants/strings/fa";
import {
    setPagePropsAction,
    setPageTitleAction,
} from "../../../../state/page/pageActions";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("Documents", strings, form);
        this.entity = new Entity();
        this.callbackUrl = `${BASE_PATH}/documents`;
        this.initialPageProps = {
            item: null,
            year: null,
        };
        this.handleSelectDocumentYearSubmit =
            this.handleSelectDocumentYearSubmit.bind(this);
    }

    onLoad() {
        this.navigateIfNotValidateParams();
        super.onLoad();
        this.fillForm(this.pageState.params);
    }

    navigateIfNotValidateParams() {
        this.navigateIfNotValidId(this.pageState.params.documentId);
    }

    async fillForm(data) {
        try {
            this.dispatch(setLoadingAction(true));
            const result = await this.fetchItem(data.documentId);
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

    onSelectDocumentYearModal(e) {
        e.stopPropagation();
        this.dispatch(
            setShownModalAction("selectDocumentYearModal", {
                onSubmit: this.handleSelectDocumentYearSubmit,
            })
        );
    }

    handleFetchResult(result) {
        this.dispatch(
            setPagePropsAction({
                item: result.item,
                documentYear: result.item.documentYear,
            })
        );
        this.dispatch(
            setPageTitleAction(
                `${strings._title} [ ${result.item.documentNo} ${
                    result.item.owner ? ` - ${result.item.owner}` : ""
                } ]`
            )
        );
        this.useForm.setValue(
            "documentNo",
            result.item.documentNo ? result.item.documentNo : ""
        );
        if (result.item.documentDate) {
            this.useForm.setValue("documentDate", result.item.documentDate);
        }
        this.useForm.setValue("paymentNo", result.item.paymentNo ?? "");
        if (result.item.paymentDate) {
            this.useForm.setValue("paymentDate", result.item.paymentDate);
        }
        this.useForm.setValue("owner", result.item.owner ?? "");
        this.useForm.setValue("description", result.item.description ?? "");
    }

    async onSubmit(data) {
        const promise = this.entity.update(
            this.pageState.params.documentId,
            this.pageState.props.documentYear,
            data.documentNo,
            data.documentDate?.replaceAll("/", ""),
            data.paymentNo,
            data.paymentDate?.replaceAll("/", ""),
            data.owner,
            data.description
        );
        super.onModifySubmit(promise);
    }

    handleSelectDocumentYearSubmit(result, data) {
        if (result === true) {
            this.dispatch(
                setPagePropsAction({ documentYear: data.documentYear })
            );
        }
    }
}
