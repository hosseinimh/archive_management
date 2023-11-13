import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Dynamsoft from "dwt";

import { DocumentFile as Entity } from "../../../../http/entities";
import { scanDocumentFileModal as strings } from "../../../../constants/strings/fa";
import { Modal, AlertMessage } from "../..";
import { addDocumentFileSchema } from "../../../validations";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { clearMessageAction } from "../../../../state/message/messageActions";
import {
    BASE_URL,
    DWT_KEY,
    JS_PATH,
    MODAL_RESULT,
} from "../../../../constants";

function ScanDocumentFile() {
    const layoutState = useSelector((state) => state.layoutReducer);
    const dispatch = useDispatch();
    const [modalShown, setModalShown] = useState(false);
    const [modalResult, setModalResult] = useState(undefined);
    const [message, setMessage] = useState(null);
    const [dwt, setDwt] = useState(null);
    const [hasScan, setHasScan] = useState(false);
    const form = useForm({
        resolver: yupResolver(addDocumentFileSchema),
    });
    const entity = new Entity();

    useEffect(() => {
        if (
            typeof form?.formState?.errors === "object" &&
            form?.formState?.errors
        ) {
            const hasKeys = !!Object.keys(form?.formState?.errors).length;
            if (hasKeys) {
                setMessage(
                    form?.formState?.errors[
                        Object.keys(form?.formState?.errors)[0]
                    ].message
                );
                document
                    .querySelector("#documentFilesModal")
                    .querySelector(".modal-main")
                    .firstChild.scrollTo(0, 0);
            }
        }
    }, [form?.formState?.errors]);

    useEffect(() => {
        if (modalResult === MODAL_RESULT.OK) {
            if (
                typeof layoutState?.shownModal?.props?.onSubmit === "function"
            ) {
                layoutState?.shownModal?.props?.onSubmit(true);
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
        if (layoutState?.shownModal?.modal === "scanDocumentFileModal") {
            setModalShown(true);
        } else {
            setModalShown(false);
        }
    }, [layoutState?.shownModal]);

    useEffect(() => {
        if (modalShown) {
            const scannerContainer =
                document.querySelector("#scannerContainer");
            const height =
                document.querySelector("#scanDocumentFileModal").clientHeight -
                300;
            scannerContainer.style.height = `${height}px`;
            Dynamsoft.DWT.RegisterEvent("OnWebTwainReady", () => {
                onDwtReady();
            });
            Dynamsoft.DWT.ProductKey = DWT_KEY;
            Dynamsoft.DWT.ResourcesPath = `${JS_PATH}/dwt`;
            Dynamsoft.DWT.Containers = [
                {
                    WebTwainId: "dwt",
                    ContainerId: "scannerContainer",
                    Width: "100%",
                    Height: `${height}px`,
                },
            ];
            Dynamsoft.DWT.Load();
        }
    }, [modalShown]);

    const onDwtReady = () => {
        setDwt(Dynamsoft.DWT.GetWebTwain("scannerContainer"));
    };

    const acquireImage = () => {
        if (dwt) {
            dwt.SelectSourceAsync()
                .then(() => {
                    return dwt.AcquireImageAsync({
                        IfShowUI: true,
                        IfCloseSourceAfterAcquire: true,
                    });
                })
                .then((result) => {
                    if (result) {
                        setHasScan(true);
                    }
                })
                .catch(() => {})
                .finally(() => {
                    dwt.CloseSourceAsync().catch(() => {});
                });
        }
    };

    const onClose = () => {
        resetForm();
        document
            .querySelector("#documentFilesModal")
            .querySelector(".modal-main")
            .firstChild.scrollTo(0, 0);
    };

    const resetForm = () => {
        dispatch(clearMessageAction());
        setHasScan(false);
        setMessage(null);
        form.reset();
    };

    const upload = () => {
        if (dwt) {
            if (dwt.HowManyImagesInBuffer === 0) {
                setMessage(strings.notScannedFile);
            }
            dispatch(setLoadingAction(true));
            dispatch(clearMessageAction());
            dwt.ClearAllHTTPFormField();
            dwt.HTTPUploadThroughPostAsMultiPagePDF(
                BASE_URL,
                entity.getUploadScanEndpoint(
                    layoutState?.shownModal?.props?.document?.id
                ),
                "upload.pdf",
                onHttpUploadFailure,
                onServerReturnedSomething
            );
        }
    };

    const onHttpUploadFailure = () => {
        onResponse();
    };

    const onServerReturnedSomething = () => {
        onResponse();
    };

    const onResponse = () => {
        dispatch(setLoadingAction(false));
        setModalResult(MODAL_RESULT.OK);
    };

    return (
        <Modal
            id="scanDocumentFileModal"
            title={`${strings._title} - [ ${
                layoutState?.shownModal?.props?.document?.documentNo
            } ${
                layoutState?.shownModal?.props?.document?.owner
                    ? `${layoutState?.shownModal?.props?.document?.owner} - `
                    : ""
            } ]`}
            onClose={onClose}
            modalResult={modalResult}
            fullWidth={true}
        >
            <AlertMessage message={message} containerClassName="mb-30" />
            <div className="grow-1 d-flex d-flex-column">
                <div>
                    <h4 className="text mb-20">{strings.document}</h4>
                    <div id="scannerContainer"></div>
                    <div className="btns d-flex mt-20">
                        <button
                            className="btn btn-primary mx-rdir-10"
                            type="button"
                            disabled={layoutState?.loading}
                            title={strings.scan}
                            onClick={acquireImage}
                        >
                            {strings.scan}
                        </button>
                        <button
                            className="btn btn-success mx-rdir-10"
                            type="button"
                            disabled={layoutState?.loading || !hasScan}
                            title={strings.save}
                            onClick={upload}
                        >
                            {strings.save}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ScanDocumentFile;
