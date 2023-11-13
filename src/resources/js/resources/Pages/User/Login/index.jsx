import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { InputTextColumn, NotAuthPageLayout } from "../../../components";
import { PageUtils } from "./PageUtils";
import { loginUserPage as strings } from "../../../../constants/strings/fa";

const Login = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const [showPass, setShowPass] = useState(false);
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

  return (
    <NotAuthPageLayout pageUtils={pageUtils}>
      <InputTextColumn
        field="username"
        showLabel={false}
        textAlign="left"
        icon={"icon-frame-14"}
        inputContainerClassName="pd-dir-10"
      />
      <InputTextColumn
        field="password"
        type="password"
        showLabel={false}
        textAlign="left"
        icon={`icon-eye3 icon-clickable${showPass ? " show" : ""}`}
        iconClick={() => setShowPass(!showPass)}
        inputContainerClassName="pd-dir-10"
      />
      <div className="d-flex-column align-center">
        <button
          className="btn btn-primary mb-10"
          onClick={pageUtils.useForm.handleSubmit(pageUtils.onSubmit)}
          type="button"
          title={strings.submit}
          disabled={layoutState?.loading}
        >
          {strings.submit}
        </button>
      </div>
      <div className="line-gr m-td-30"></div>
    </NotAuthPageLayout>
  );
};

export default Login;
