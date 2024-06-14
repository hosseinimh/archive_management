import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../Modal";
import InputTextColumn from "../../Input/InputTextColumn";
import {
    general,
    profileModal as strings,
} from "../../../../constants/strings/fa";
import { setShownModalAction } from "../../../../state/layout/layoutActions";

function ProfileModal() {
    const userState = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const renderFooter = () => {
        return (
            <div className="btns d-flex mtd-10">
                <button
                    className="btn btn-border"
                    type="button"
                    title={general.close}
                    onClick={() => dispatch(setShownModalAction(null))}
                >
                    {general.close}
                </button>
            </div>
        );
    };

    return (
        <Modal
            id="profileModal"
            title={`${userState?.user?.name} ${userState?.user?.family} - [ ${userState?.user?.username} ]`}
            footer={renderFooter()}
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
