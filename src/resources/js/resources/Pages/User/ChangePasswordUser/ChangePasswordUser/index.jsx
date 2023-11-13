import React from "react";
import { useParams } from "react-router-dom";

import BaseChangePasswordUser from "../BaseChangePasswordUser";

const ChangePasswordUser = () => {
    const params = useParams();

    return <BaseChangePasswordUser userId={params?.userId} />;
};

export default ChangePasswordUser;
