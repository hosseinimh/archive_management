import React from "react";

import {
    InputTextColumn,
    FormPage,
    InputTextAreaColumn,
    InputRow,
    InputDatePickerColumn,
    InputTextDocumentNoColumn,
    SelectYearModal,
} from "../../../components";
import { PageUtils } from "./PageUtils";

const EditDocument = () => {
    const pageUtils = new PageUtils();

    return (
        <FormPage pageUtils={pageUtils}>
            <InputRow>
                <InputTextDocumentNoColumn
                    field="documentNo"
                    inputStyle={{ textAlign: "left", direction: "ltr" }}
                    fullRow={false}
                    showLabel
                    prefix={`${pageUtils?.pageState?.props?.year ?? ""}/`}
                    onPrefixClick={(e) => pageUtils.onSelectYearModal(e)}
                />
                <InputDatePickerColumn
                    field="documentDate"
                    showLabel
                    fullRow={false}
                />
                <InputTextColumn
                    field="paymentNo"
                    inputStyle={{ textAlign: "left", direction: "ltr" }}
                    fullRow={false}
                    showLabel
                />
                <InputDatePickerColumn
                    field="paymentDate"
                    showLabel
                    fullRow={false}
                />
                <InputTextColumn field="owner" showLabel fullRow={false} />
            </InputRow>
            <InputTextAreaColumn field="description" showLabel />
            <SelectYearModal />
        </FormPage>
    );
};

export default EditDocument;
