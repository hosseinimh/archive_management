import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InputRow from "./InputRow";

const InputSwitchCheckboxColumn = ({
    field,
    useForm,
    strings,
    fullRow = true,
    checked = false,
    onChange = null,
}) => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const [label, setLabel] = useState(
        strings && field in strings ? strings[field] : ""
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
        }
        if (!useForm) {
            setForm(pageState?.pageUtils?.useForm);
        }
    }, [pageState]);

    const renderItem = () => (
        <div className="d-flex d-flex-column mb-30">
            <div className="form-check form-switch">
                <input
                    {...form?.register(field)}
                    className="form-check-input"
                    id={field}
                    type="checkbox"
                    disabled={layoutState?.loading}
                    defaultChecked={checked}
                    onChange={(e) => {
                        if (onChange) {
                            onChange(e);
                        }
                    }}
                />
                <label className="form-check-label" htmlFor={field}>
                    {label}
                </label>
            </div>
        </div>
    );

    if (fullRow) {
        return <InputRow>{renderItem()}</InputRow>;
    }
    return renderItem();
};

export default InputSwitchCheckboxColumn;
