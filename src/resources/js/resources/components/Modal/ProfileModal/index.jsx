import React from "react";
import { useSelector } from "react-redux";

import Modal from "../Modal";
import InputTextColumn from "../../Input/InputTextColumn";
import { profileModal as strings } from "../../../../constants/strings/fa";

function ProfileModal() {
    const userState = useSelector((state) => state.userReducer);

    return (
        <Modal
            id="profileModal"
            title={`${userState?.user?.name} ${userState?.user?.family} - [ ${userState?.user?.username} ]`}
        >
            <InputTextColumn
                field="nameModal"
                readOnly={true}
                strings={strings}
                showLabel
                icon="icon-user"
                value={userState?.user?.name}
                inputStyle={{ opacity: "1" }}
            />
            <InputTextColumn
                field="familyModal"
                readOnly={true}
                strings={strings}
                showLabel
                icon="icon-user"
                value={userState?.user?.family}
                inputStyle={{ opacity: "1" }}
            />
            <InputTextColumn
                field="mobileModal"
                readOnly={true}
                strings={strings}
                showLabel
                textAlign="left"
                icon="icon-mobile"
                value={userState?.user?.mobile}
                inputStyle={{ opacity: "1" }}
            />
        </Modal>
    );
}

export default ProfileModal;
