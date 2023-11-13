import React, { useEffect, useState } from "react";

import {
    InputRadioColumn,
    InputTextColumn,
    FormPage,
    InputCheckboxColumn,
    InputCheckboxContainer,
    InputRadioContainer,
    InputRow,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import { addUserPage as strings } from "../../../../constants/strings/fa";

const AddUser = () => {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const pageUtils = new PageUtils();

    useEffect(() => {
        const element = document.querySelector("#password");
        if (!element) {
            return;
        }
        if (showPass) {
            element.setAttribute("type", "text");
        } else {
            element.setAttribute("type", "password");
        }
    }, [showPass]);

    useEffect(() => {
        const element = document.querySelector("#confirmPassword");
        if (!element) {
            return;
        }
        if (showConfirmPass) {
            element.setAttribute("type", "text");
        } else {
            element.setAttribute("type", "password");
        }
    }, [showConfirmPass]);

    return (
        <FormPage pageUtils={pageUtils}>
            <InputRow>
                <InputTextColumn
                    field="username"
                    textAlign="left"
                    inputClassName="autofill"
                    fullRow={false}
                    icon={"icon-frame-14"}
                />
                <InputTextColumn
                    field="password"
                    type="password"
                    textAlign="left"
                    inputClassName="autofill"
                    fullRow={false}
                    icon={`icon-eye3 icon-clickable${showPass ? " show" : ""}`}
                    iconClick={() => setShowPass(!showPass)}
                />
                <InputTextColumn
                    field="confirmPassword"
                    type="password"
                    textAlign="left"
                    inputClassName="autofill"
                    fullRow={false}
                    icon={`icon-eye3 icon-clickable${
                        showConfirmPass ? " show" : ""
                    }`}
                    iconClick={() => setShowConfirmPass(!showConfirmPass)}
                />
            </InputRow>
            <InputRow>
                <InputTextColumn
                    field="name"
                    inputClassName="autofill"
                    fullRow={false}
                    icon={"icon-personalcard4"}
                />
                <InputTextColumn
                    field="family"
                    inputClassName="autofill"
                    fullRow={false}
                    icon={"icon-personalcard4"}
                />
                <InputTextColumn
                    field="mobile"
                    textAlign="left"
                    inputClassName="autofill"
                    fullRow={false}
                    icon={"icon-mobile"}
                />
            </InputRow>
            <InputCheckboxContainer>
                <InputCheckboxColumn
                    name="isActiveContainer"
                    field="isActive"
                    checked={true}
                />
            </InputCheckboxContainer>
            <InputRadioContainer
                label={strings.type}
                containerClassName="d-flex-column"
            >
                <InputRadioColumn
                    name="type"
                    field="administrator"
                    checked={true}
                />
                <InputRadioColumn field="user" name="type" />
            </InputRadioContainer>
        </FormPage>
    );
};

export default AddUser;
