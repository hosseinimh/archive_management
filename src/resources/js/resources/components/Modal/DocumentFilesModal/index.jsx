import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { slideDown, slideUp } from "es6-slide-up-down";
import { easeOutQuint } from "es6-easings";

import {
    general,
    documentFilesModal as strings,
} from "../../../../constants/strings/fa";
import {
    Modal,
    Table,
    TableItems,
    CustomLink,
    InputTextColumn,
    InputFileColumn,
    AlertMessage,
    PromptModal,
} from "../..";
import {
    addDocumentFileSchema,
    editDocumentFileSchema,
} from "../../../validations";
import {
    setDropDownElementAction,
    setLoadingAction,
    setShownModalAction,
} from "../../../../state/layout/layoutActions";
import { clearMessageAction } from "../../../../state/message/messageActions";
import { DocumentFile as Entity } from "../../../../http/entities";
import { MODAL_RESULT, USER_ROLES } from "../../../../constants";

function DocumentFilesModal() {
    const userState = useSelector((state) => state.userReducer);
    const layoutState = useSelector((state) => state.layoutReducer);
    const dispatch = useDispatch();
    const [modalShown, setModalShown] = useState(false);
    const [modalResult, setModalResult] = useState(undefined);
    const [message, setMessage] = useState(null);
    const [documentFile, setDocumentFile] = useState(null);
    const [items, setItems] = useState(null);
    const [isAdd, setIsAdd] = useState(true);
    const [file, setFile] = useState(null);
    const [form, setForm] = useState(null);
    const addForm = useForm({
        resolver: yupResolver(addDocumentFileSchema),
    });
    const editForm = useForm({
        resolver: yupResolver(editDocumentFileSchema),
    });
    const entity = new Entity();
    const columnsCount =
        userState?.user?.role === USER_ROLES.ADMINISTRATOR ? 5 : 4;

    useEffect(() => {
        if (isAdd) {
            setForm(addForm);
        } else {
            setForm(editForm);
        }
    }, [isAdd]);

    useEffect(() => {
        if (form === editForm) {
            document.querySelector("#descriptionDocumentFilesModal").focus();
        }
    }, [form]);

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
        if (layoutState?.shownModal?.modal === "documentFilesModal") {
            setModalShown(true);
        } else {
            setModalShown(false);
        }
    }, [layoutState?.shownModal]);

    useEffect(() => {
        if (modalShown) {
            fillForm();
        }
    }, [modalShown]);

    const toggleActions = (e, id) => {
        e.stopPropagation();
        const element = document.querySelector(`#${id}`).lastChild;
        if (layoutState?.dropDownElement) {
            slideUp(layoutState.dropDownElement);
            if (layoutState?.dropDownElement === element) {
                dispatch(setDropDownElementAction(null));
                return;
            }
        }
        dispatch(setDropDownElementAction(element));
        slideDown(element, {
            duration: 400,
            easing: easeOutQuint,
        });
    };

    const onDownload = (item) => {
        entity.download(item.id);
    };

    const onEdit = (item) => {
        setMessage(null);
        addForm.reset();
        editForm.reset();
        setFile(null);
        setIsAdd(false);
        setDocumentFile(item);
        editForm.setValue(
            "descriptionDocumentFilesModal",
            item.description ?? ""
        );
    };

    const onEditCanclled = () => {
        editForm.reset();
        setIsAdd(true);
        setDocumentFile(null);
    };

    const onRemove = async (e, item) => {
        e.stopPropagation();
        dispatch(
            setShownModalAction("promptModal", {
                title: strings.removeMessageTitle,
                description: `${item.name}`,
                submitTitle: general.yes,
                cancelTitle: general.no,
                onSubmit: remove(item),
            })
        );
    };

    const onChangeFile = (e) => {
        const f = e?.target?.files[0];
        if (f) {
            setFile(f);
        }
    };

    const onScan = (e) => {
        dispatch(clearMessageAction());
        e.stopPropagation();
        dispatch(
            setShownModalAction("scanDocumentFileModal", {
                document: layoutState?.shownModal?.props?.document,
            })
        );
    };

    const onClose = () => {
        resetForm();
        document
            .querySelector("#documentFilesModal")
            .querySelector(".modal-main")
            .firstChild.scrollTo(0, 0);
    };

    const close = () => {
        onClose();
        dispatch(setShownModalAction(null));
    };

    const fillForm = async () => {
        dispatch(setLoadingAction(true));
        dispatch(clearMessageAction());
        const result = await entity.getAll(
            layoutState?.shownModal?.props?.document?.id
        );
        resetForm();
        dispatch(setLoadingAction(false));
        if (result === null) {
            setItems(null);
        } else {
            setItems(result.items);
        }
    };

    const resetForm = () => {
        dispatch(clearMessageAction());
        setItems(null);
        setMessage(null);
        addForm.reset();
        editForm.reset();
        setIsAdd(true);
        setFile(null);
        setDocumentFile(null);
    };

    const onSubmit = async (data) => {
        dispatch(setLoadingAction(true));
        dispatch(clearMessageAction());
        const result = isAdd
            ? await entity.store(
                  layoutState?.shownModal?.props?.document?.id,
                  file,
                  data.descriptionDocumentFilesModal
              )
            : await entity.update(
                  documentFile?.id,
                  data.descriptionDocumentFilesModal
              );
        resetForm();
        dispatch(setLoadingAction(false));
        if (result === null) {
            setItems(null);
        } else {
            setItems(result.items);
        }
    };

    const remove = (item) => async () => {
        dispatch(setLoadingAction(true));
        dispatch(clearMessageAction());
        const result = await entity.delete(item?.id);
        dispatch(setLoadingAction(false));
        if (result === null) {
            setItems(null);
        } else {
            setItems(result.items);
        }
    };

    const renderHeader = () => (
        <tr>
            <th style={{ width: "100px" }}>{strings.nameDocumentFilesModal}</th>
            <th>{strings.descriptionDocumentFilesModal}</th>
            <th style={{ width: "100px" }}>{strings.userDocumentFilesModal}</th>
            <th style={{ width: "100px" }}>
                {strings.createdAtFaDocumentFilesModal}
            </th>
            {userState?.user?.role === USER_ROLES.ADMINISTRATOR && (
                <th style={{ width: "100px" }}>{general.actions}</th>
            )}
        </tr>
    );

    const renderItems = () => {
        const children = items?.map((item) => (
            <React.Fragment key={item.id}>
                <tr>
                    <td style={{ direction: "ltr", textAlign: "right" }}>
                        <CustomLink
                            onClick={() => onDownload(item)}
                            title={item.name}
                        >
                            {item.name.length > 30
                                ? `${item.name.substring(0, 30)} ...`
                                : item.name}
                        </CustomLink>
                    </td>
                    <td>
                        <p style={{ wordWrap: "break-word" }}>
                            {item.description ?? "-"}
                        </p>
                    </td>
                    <td>{`${item.userName} ${item.userFamily}`}</td>
                    <td>{item.createdAtFa}</td>
                    {userState?.user?.role === USER_ROLES.ADMINISTRATOR && (
                        <td>
                            <button
                                id={`actions-${item.id}`}
                                type="button"
                                className="btn btn-primary btn-dropdown mx-rdir-10"
                                onClick={(e) =>
                                    toggleActions(e, `actions-${item.id}`)
                                }
                                disabled={layoutState?.loading}
                            >
                                <div className="d-flex">
                                    <span className="grow-1 mx-rdir-10">
                                        {general.actions}
                                    </span>
                                    <div className="icon">
                                        <i className="icon-arrow-down5"></i>
                                    </div>
                                </div>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <ul>
                                        <li>
                                            <CustomLink
                                                onClick={() => onEdit(item)}
                                                disabled={layoutState?.loading}
                                            >
                                                {general.edit}
                                            </CustomLink>
                                        </li>
                                        <li>
                                            <CustomLink
                                                onClick={(e) =>
                                                    onRemove(e, item)
                                                }
                                                disabled={layoutState?.loading}
                                            >
                                                {general.remove}
                                            </CustomLink>
                                        </li>
                                    </ul>
                                </div>
                            </button>
                        </td>
                    )}
                </tr>
            </React.Fragment>
        ));

        return <TableItems columnsCount={columnsCount}>{children}</TableItems>;
    };

    return (
        <Modal
            id="documentFilesModal"
            title={`${strings._title} - [ ${
                layoutState?.shownModal?.props?.document?.documentYear
            }/${layoutState?.shownModal?.props?.document?.documentNo}${
                layoutState?.shownModal?.props?.document?.owner
                    ? ` - ${layoutState?.shownModal?.props?.document?.owner}`
                    : ""
            } ]`}
            onClose={onClose}
            modalResult={modalResult}
            fullWidth={true}
        >
            <AlertMessage message={message} containerClassName="mb-30" />
            <div className="grow-1 d-flex d-flex-column">
                <h4 className="text">{strings._subTitle}</h4>
                <div className="block grow-1">
                    <Table
                        renderHeader={renderHeader}
                        renderItems={renderItems}
                        style={{ marginBottom: "5rem" }}
                    />
                </div>
                <div>
                    {isAdd && (
                        <div className="mt-30">
                            <h4 className="text">{strings.addDocumentFile}</h4>
                            <InputFileColumn
                                field="fileDocumentFilesModal"
                                strings={strings}
                                accept=".jpg, .jpeg, .png, .tiff, .pdf, .doc, .docx"
                                file={file}
                                onChangeFile={(e) => onChangeFile(e)}
                                containerStyle={{
                                    maxWidth: "inherit",
                                    marginBottom: "0",
                                }}
                                useForm={addForm}
                            />
                            <InputTextColumn
                                field="descriptionDocumentFilesModal"
                                strings={strings}
                                useForm={addForm}
                                icon={"icon-note-14"}
                            />
                            <div className="btns d-flex mt-10">
                                <button
                                    className="btn btn-success mx-rdir-10"
                                    type="button"
                                    disabled={layoutState?.loading || !file}
                                    title={strings.addDocumentFile}
                                    onClick={form?.handleSubmit(onSubmit)}
                                >
                                    {strings.addDocumentFile}
                                </button>
                                <button
                                    className="btn btn-primary mx-rdir-10"
                                    type="button"
                                    disabled={layoutState?.loading}
                                    title={strings.scan}
                                    onClick={(e) => onScan(e)}
                                >
                                    {strings.scan}
                                </button>
                                <button
                                    className="btn btn-border mx-rdir-10"
                                    type="button"
                                    disabled={layoutState?.loading}
                                    title={general.back}
                                    onClick={close}
                                >
                                    {general.back}
                                </button>
                            </div>
                        </div>
                    )}
                    {!isAdd && (
                        <div className="mt-30">
                            <h4 className="text">{strings.editDocumentFile}</h4>
                            <InputTextColumn
                                field="descriptionDocumentFilesModal"
                                strings={strings}
                                useForm={editForm}
                                icon={"icon-note-14"}
                            />
                            <div className="btns d-flex mt-10">
                                <button
                                    className="btn btn-success mx-rdir-10"
                                    type="button"
                                    disabled={layoutState?.loading}
                                    title={strings.editDocumentFile}
                                    onClick={form?.handleSubmit(onSubmit)}
                                >
                                    {strings.editDocumentFile}
                                </button>
                                <button
                                    className="btn btn-border mx-rdir-10"
                                    type="button"
                                    title={general.cancel}
                                    onClick={onEditCanclled}
                                >
                                    {general.cancel}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <PromptModal />
        </Modal>
    );
}

export default DocumentFilesModal;
