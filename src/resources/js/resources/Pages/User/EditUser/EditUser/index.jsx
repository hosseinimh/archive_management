import React from "react";
import { useParams } from "react-router-dom";

import BaseEditUser from "../BaseEditUser";

const EditUser = () => {
    const params = useParams();

    return <BaseEditUser userId={params?.userId} />;
};

export default EditUser;
