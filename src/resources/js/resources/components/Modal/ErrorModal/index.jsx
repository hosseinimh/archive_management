import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../Modal";
import {
    general,
    errorModal as strings,
} from "../../../../constants/strings/fa";
import InputTextAreaColumn from "../../Input/InputTextAreaColumn";
import { setShownModalAction } from "../../../../state/layout/layoutActions";

function ErrorModal() {
    const layoutState = useSelector((state) => state.layoutReducer);
    const dispatch = useDispatch();
    const [title, setTitle] = useState(strings._title);

    useEffect(() => {
        if (layoutState?.shownModal?.props?.error) {
            setTitle(
                `${strings._title} - [ ${layoutState?.shownModal?.props?.error.createdAtFa} ]`
            );
            document.querySelector("#messageErrorModal").value =
                layoutState?.shownModal?.props?.error?.message;
        }
    }, [layoutState?.shownModal?.props?.error]);

    const renderFooter = () => {
        return (
            <div className="btns d-flex mtd-10">
                <button
                    className="btn btn-border"
                    type="button"
                    title={general.close}
                    onClick={() => dispatch(setShownModalAction(null))}
                >
                    {general.close}
                </button>
            </div>
        );
    };

    return (
        <Modal
            id="errorModal"
            title={title}
            fullWidth={true}
            footer={renderFooter()}
        >
            <InputTextAreaColumn
                field="messageErrorModal"
                readOnly={true}
                strings={strings}
                showLabel
                value={layoutState?.shownModal?.props?.error?.message}
                containerStyle={{ minHeight: "60vh" }}
                inputStyle={{
                    textAlign: "left",
                    direction: "ltr",
                    minHeight: "60vh",
                }}
            />
        </Modal>
    );
}

export default ErrorModal;
