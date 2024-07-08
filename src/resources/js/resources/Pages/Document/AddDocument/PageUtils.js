import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Document as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import { addDocumentSchema as schema } from "../../../validations";
import { addDocumentPage as strings } from "../../../../constants/strings/fa";
import {
    setLoadingAction,
    setShownModalAction,
} from "../../../../state/layout/layoutActions";
import { setPagePropsAction } from "../../../../state/page/pageActions";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("Documents", strings, form);
        this.entity = new Entity();
        this.callbackUrl = `${BASE_PATH}/documents`;
        this.initialPageProps = { year: null };
        this.handleSelectDocumentYearSubmit =
            this.handleSelectDocumentYearSubmit.bind(this);
    }

    onLoad() {
        super.onLoad();
        this.getAddProps(this.layoutState?.documentYear);
    }

    onSelectDocumentYearModal(e) {
        e.stopPropagation();
        this.dispatch(
            setShownModalAction("selectDocumentYearModal", {
                onSubmit: this.handleSelectDocumentYearSubmit,
            })
        );
    }

    async getAddProps(documentYear) {
        try {
            this.dispatch(setLoadingAction(true));
            const result = await this.entity.getAddProps(documentYear);
            if (result) {
                this.dispatch(
                    setPagePropsAction({ documentYear: documentYear })
                );
                if (result.item) {
                    if (!isNaN(result.item.documentNo)) {
                        this.useForm.setValue(
                            "documentNo",
                            result.item.documentNo + 1
                        );
                    } else {
                        this.useForm.setValue("documentNo", 1);
                    }
                } else {
                    this.useForm.setValue("documentNo", 1);
                }
            }
        } catch {
        } finally {
            this.dispatch(setLoadingAction(false));
        }
    }

    async onSubmit(data) {
        const promise = this.entity.store(
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
            this.getAddProps(data.documentYear);
        }
    }
}
