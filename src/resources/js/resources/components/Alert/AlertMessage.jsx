import React, { useEffect } from "react";

import { MESSAGE_TYPES } from "../../../constants";

const AlertMessage = ({
    message,
    messageType,
    code = "",
    containerClassName = "",
}) => {
    useEffect(() => {
        if (message) {
            window.scrollTo(0, 0);
        }
    }, [message]);

    if (message) {
        return (
            <div
                className={`alert ${
                    messageType === MESSAGE_TYPES.SUCCESS
                        ? "alert-success"
                        : "alert-danger"
                } ${containerClassName}`}
            >
                {message}
                {code ? `(${code})` : ""}
            </div>
        );
    }

    return <></>;
};

export default AlertMessage;
