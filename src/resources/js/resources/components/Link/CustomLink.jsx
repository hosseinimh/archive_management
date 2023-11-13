import React from "react";
import utils from "../../../utils/Utils";

const CustomLink = ({
    onClick,
    children,
    className = "",
    containerStyle = "",
    link = "",
    title = "",
}) => {
    return (
        <a
            href={link === "" ? "#" : link}
            onClick={(e) => {
                e.preventDefault();
                onClick && onClick(e);
            }}
            className={className}
            style={{ ...containerStyle }}
            title={utils.hasValue(title) ? title : children}
        >
            {children}
        </a>
    );
};

export default CustomLink;
