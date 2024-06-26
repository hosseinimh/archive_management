import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setShownModalAction } from "../../../state/layout/layoutActions";
import { MODAL_RESULT } from "../../../constants";

const Modal = ({
    id,
    title,
    children,
    footer = null,
    onClose = null,
    modalResult = undefined,
    fullWidth = false,
}) => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (layoutState?.shownModal?.modal === id) {
            showModal();
        } else if (!layoutState?.shownModal?.modal) {
            hideModal();
        }
    }, [layoutState?.shownModal?.modal]);

    useEffect(() => {
        if (
            layoutState?.shownModal?.modal === id &&
            [MODAL_RESULT.OK, MODAL_RESULT.CANCEL, MODAL_RESULT.CLOSE].includes(
                modalResult
            )
        ) {
            hideModal();
        }
    }, [modalResult]);

    const showModal = () => {
        const element = document.querySelector(`#${id}`);
        element.style.display = "flex";
        dispatch(setShownModalAction(id, layoutState?.shownModal?.props));
        setTimeout(() => {
            element.lastChild.style.opacity = 1;
            element.lastChild.style.transform = "scale(1)";
        }, 1);
    };

    const hideModal = () => {
        const element = document.querySelector(`#${id}`);
        element.lastChild.style.opacity = 0;
        element.lastChild.style.transform = "scale(0.8)";
        setTimeout(() => {
            element.style.display = "none";
            dispatch(setShownModalAction(null));
            if (typeof onClose === "function") {
                onClose();
            }
        }, 200);
    };

    return (
        <div className="modal-box" id={id}>
            <div
                className="modal"
                style={{
                    maxWidth: fullWidth ? "90%" : "35rem",
                    height: fullWidth ? "90vh" : "60vh",
                }}
            >
                <div className="modal-hd">
                    <span>
                        <i
                            className="modal-close icon-close-circle4 mx-rdir-10"
                            onClick={hideModal}
                        />
                        <span className="text">{title}</span>
                    </span>
                </div>
                <div className="modal-main grow-1">
                    <div className="grow-1 d-flex d-flex-column">
                        {children}
                    </div>
                    {footer && (
                        <div className="modal-footer pd-td-10">
                            <>{footer}</>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
