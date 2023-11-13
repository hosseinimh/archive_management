import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";

import { InputRow, CustomLink } from "../";

const InputTextDocumentNoColumn = ({
    field,
    type = "text",
    value = null,
    useForm,
    strings = null,
    icon = null,
    iconClick = null,
    inputStyle = {},
    defaultValue = "",
    showLabel = false,
    textAlign = "",
    direction = undefined,
    readOnly = false,
    fullRow = true,
    inputContainerClassName = "",
    inputClassName = "",
    prefix = "",
    onPrefixClick = null,
}) => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const messageState = useSelector((state) => state.messageReducer);
    const [label, setLabel] = useState(
        strings && field in strings ? strings[field] : ""
    );
    const [placeholder, setPlaceholder] = useState(
        strings && `${field}Placeholder` in strings
            ? strings[`${field}Placeholder`]
            : ""
    );
    const [form, setForm] = useState(useForm);

    useEffect(() => {
        if (!strings) {
            setLabel(
                pageState?.pageUtils?.strings &&
                    field in pageState.pageUtils.strings
                    ? pageState?.pageUtils?.strings[field]
                    : ""
            );
            setPlaceholder(
                pageState?.pageUtils?.strings &&
                    `${field}Placeholder` in pageState.pageUtils.strings
                    ? pageState.pageUtils.strings[`${field}Placeholder`]
                    : ""
            );
        }

        if (!useForm) {
            setForm(pageState?.pageUtils?.useForm);
        }
    }, [pageState]);

    useEffect(() => {
        if (form && value) {
            form?.setValue(field, value);
        }
        if (!form && value) {
            document.querySelector(`#${field}`).value = value;
        }
    }, [form]);

    const renderControlledInput = (field) => {
        let style;
        if (textAlign === "left") {
            style = { ...inputStyle, textAlign, direction: direction ?? "ltr" };
        } else if (textAlign === "right") {
            style = { ...inputStyle, textAlign, direction: direction ?? "rtl" };
        } else {
            style = { ...inputStyle };
        }
        if (prefix !== "") {
            style = { ...style, paddingLeft: "4rem" };
        }
        return (
            <>
                <input
                    id={field.name}
                    {...field}
                    placeholder={placeholder}
                    disabled={layoutState?.loading}
                    type={type}
                    className={inputClassName}
                    style={{ ...style }}
                    autoComplete="false"
                    readOnly={readOnly}
                />
                {prefix !== "" && (
                    <span className="input-prefix">{prefix}</span>
                )}
                {prefix !== "" && onPrefixClick && (
                    <CustomLink onClick={onPrefixClick}>
                        <span className="input-prefix">{prefix}</span>
                    </CustomLink>
                )}
                {messageState?.messageField === field.name && (
                    <span className="error">{messageState?.message}</span>
                )}
            </>
        );
    };

    const renderUncontrolledInput = (field) => {
        let style;
        if (textAlign === "left") {
            style = { ...inputStyle, textAlign, direction: direction ?? "ltr" };
        } else if (textAlign === "right") {
            style = { ...inputStyle, textAlign, direction: direction ?? "rtl" };
        } else {
            style = { ...inputStyle };
        }
        return (
            <>
                <input
                    id={field}
                    placeholder={placeholder}
                    disabled={layoutState?.loading || readOnly}
                    type={type}
                    className={inputClassName}
                    style={{ ...style }}
                    autoComplete="false"
                />
            </>
        );
    };

    const renderItem = () => (
        <div className="d-flex d-flex-column">
            {showLabel && <div className="input-info">{label}</div>}
            <div
                className={`input-text input-bg input-border ${inputContainerClassName} ${
                    messageState?.messageField === field
                        ? "error mb-40"
                        : "mb-30"
                }`}
            >
                {form && (
                    <>
                        <Controller
                            render={({ field }) => renderControlledInput(field)}
                            name={field}
                            control={form?.control}
                            defaultValue={defaultValue}
                        />
                        {icon && (
                            <div className="icon">
                                <i className={icon} onClick={iconClick}></i>
                            </div>
                        )}
                    </>
                )}
                {!form && renderUncontrolledInput(field)}
            </div>
        </div>
    );

    if (fullRow) {
        return <InputRow>{renderItem()}</InputRow>;
    }
    return renderItem();
};

export default InputTextDocumentNoColumn;
