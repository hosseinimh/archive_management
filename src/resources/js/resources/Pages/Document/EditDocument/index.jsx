import React from "react";

import {
    InputTextColumn,
    FormPage,
    InputTextAreaColumn,
    InputRow,
    InputDatePickerColumn,
    InputTextDocumentNoColumn,
    SelectDocumentYearModal,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import utils from "../../../../utils/Utils";

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
                    icon={"icon-key4"}
                    prefix={`${
                        pageUtils?.pageState?.props?.documentYear ??
                        utils.getCurrentTimezoneYear()
                    }/`}
                    onPrefixClick={(e) =>
                        pageUtils.onSelectDocumentYearModal(e)
                    }
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
                    icon={"icon-note-214"}
                />
                <InputDatePickerColumn
                    field="paymentDate"
                    showLabel
                    fullRow={false}
                />
                <InputTextColumn
                    field="owner"
                    showLabel
                    icon={"icon-personalcard4"}
                    fullRow={false}
                />
            </InputRow>
            <InputTextAreaColumn field="description" showLabel />
            <SelectDocumentYearModal />
        </FormPage>
    );
};

export default EditDocument;
