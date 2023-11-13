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
        this.handleSelectYearSubmit = this.handleSelectYearSubmit.bind(this);
    }

    onLoad() {
        super.onLoad();
        this.getAddProps(this.layoutState?.documentYear);
    }

    onSelectYearModal(e) {
        e.stopPropagation();
        this.dispatch(
            setShownModalAction("selectYearModal", {
                onSubmit: this.handleSelectYearSubmit,
            })
        );
    }

    async getAddProps(year) {
        try {
            this.dispatch(setLoadingAction(true));
            const result = await this.entity.getAddProps(year);
            if (result) {
                this.dispatch(setPagePropsAction({ year: year }));
                if (result.item) {
                    if (!isNaN(result.item.documentNo.substring(5))) {
                        let lastDocumentNo = parseInt(
                            result.item.documentNo.substring(5)
                        );
                        this.useForm.setValue("documentNo", lastDocumentNo + 1);
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
            `${this.pageState.props.year}/${data.documentNo}`,
            data.documentDate?.replaceAll("/", ""),
            data.paymentNo,
            data.paymentDate?.replaceAll("/", ""),
            data.owner,
            data.description
        );
        super.onModifySubmit(promise);
    }

    handleSelectYearSubmit(result, data) {
        if (result === true) {
            this.getAddProps(data.year);
        }
    }
}
