import React from "react";
import { useSelector } from "react-redux";

import BaseEditUser from "../BaseEditUser";

const EditCurrentUser = () => {
    const userState = useSelector((state) => state.userReducer);

    return <BaseEditUser userId={userState?.user?.id} />;
};

export default EditCurrentUser;
