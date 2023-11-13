import React from "react";
import { useSelector } from "react-redux";

import BaseChangePasswordUser from "../BaseChangePasswordUser";

const ChangePasswordCurrentUser = () => {
    const userState = useSelector((state) => state.userReducer);

    return <BaseChangePasswordUser userId={userState?.user?.id} />;
};

export default ChangePasswordCurrentUser;
