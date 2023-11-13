import React, { useEffect, useState } from "react";

import { InputTextColumn, FormPage } from "../../../../components";
import { PageUtils } from "./PageUtils";

const BaseChangePasswordUser = ({ userId }) => {
    const pageUtils = new PageUtils(userId);
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    useEffect(() => {
        const element = document.querySelector("#newPassword");
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
            <InputTextColumn
                field="newPassword"
                type="password"
                textAlign="left"
                showLabel
                icon={`icon-eye3 icon-clickable${showPass ? " show" : ""}`}
                iconClick={() => setShowPass(!showPass)}
            />
            <InputTextColumn
                field="confirmPassword"
                type="password"
                textAlign="left"
                showLabel
                icon={`icon-eye3 icon-clickable${
                    showConfirmPass ? " show" : ""
                }`}
                iconClick={() => setShowConfirmPass(!showConfirmPass)}
            />
        </FormPage>
    );
};

export default BaseChangePasswordUser;
