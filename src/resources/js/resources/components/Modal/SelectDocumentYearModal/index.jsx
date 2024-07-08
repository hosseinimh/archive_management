import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { InputRow, InputSelectColumn, Modal } from "../..";
import { MODAL_RESULT } from "../../../../constants";
import {
    general,
    selectYearModal as strings,
} from "../../../../constants/strings/fa";
import { years } from "../../../../constants/lists";
import { setDocumentYearAction } from "../../../../state/layout/layoutActions";

function SelectDocumentYearModal() {
    const layoutState = useSelector((state) => state.layoutReducer);
    const [modalResult, setModalResult] = useState(undefined);
    const dispatch = useDispatch();
    const form = useForm();

    useEffect(() => {
        if (modalResult === MODAL_RESULT.OK) {
            if (
                typeof layoutState?.shownModal?.props?.onSubmit === "function"
            ) {
                layoutState?.shownModal?.props?.onSubmit(true, {
                    documentYear: form.getValues(
                        "selectSelectDocumentYearModal"
                    ),
                });
            }
        } else if (modalResult === MODAL_RESULT.CANCEL) {
            if (
                typeof layoutState?.shownModal?.props?.onCancel === "function"
            ) {
                layoutState?.shownModal?.props?.onCancel();
            }
        }
        setModalResult(undefined);
    }, [modalResult]);

    useEffect(() => {
        if (layoutState?.shownModal?.modal === "selectDocumentYearModal") {
            form.setValue(
                "selectSelectDocumentYearModal",
                layoutState?.documentYear
            );
        }
    }, [layoutState?.shownModal]);

    const onSubmit = () => {
        dispatch(
            setDocumentYearAction(
                form.getValues("selectSelectDocumentYearModal")
            )
        );
        dispatch(
            setDocumentYearAction(
                form.getValues("selectSelectDocumentYearModal")
            )
        );
        setModalResult(MODAL_RESULT.OK);
    };

    const renderFooter = () => {
        return (
            <div className="btns d-flex mtd-10">
                <button
                    className="btn btn-success"
                    type="button"
                    title={strings.save}
                    onClick={onSubmit}
                >
                    {strings.save}
                </button>
                <button
                    className="btn btn-border"
                    type="button"
                    title={general.cancel}
                    onClick={() => setModalResult(MODAL_RESULT.CANCEL)}
                >
                    {general.cancel}
                </button>
            </div>
        );
    };

    return (
        <Modal
            id="selectDocumentYearModal"
            title={strings.selectYearModalTitle}
            modalResult={modalResult}
            footer={renderFooter()}
        >
            <InputRow>
                <InputSelectColumn
                    field="selectSelectDocumentYearModal"
                    showLabel
                    useForm={form}
                    strings={strings}
                    items={years}
                    fullRow={false}
                />
                <div className="d-flex d-flex-column xs-grow-1">
                    <div className="input-text input-bg mb-0"></div>
                </div>
                <div className="d-flex d-flex-column xs-grow-1">
                    <div className="input-text input-bg mb-0"></div>
                </div>
            </InputRow>
        </Modal>
    );
}

export default SelectDocumentYearModal;
