import React from "react";

import { AlertState } from "../../components";
import BasePageLayout from "./BasePageLayout";
import { IMAGES_PATH } from "../../../constants";
import { notAuthPages as strings, footer } from "../../../constants/strings/fa";

const NotAuthPageLayout = ({ children, pageUtils }) => {
    const screen = `${IMAGES_PATH}/screen.jpg`;

    return (
        <BasePageLayout authPage={false} pageUtils={pageUtils}>
            <div className="login-page d-flex-wrap">
                <div className="login-info d-flex-column">
                    <div className="logo">
                        <h2 className="text">{strings._subTitle}</h2>
                    </div>

                    <div className="img">
                        <img
                            src={screen}
                            alt=""
                            style={{ borderRadius: "1rem" }}
                        />
                    </div>
                    <div className="info">
                        <div>
                            <p style={{ marginRight: "2.5rem" }}>
                                {footer.version}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="login-box d-flex-column">
                    <div className="login-form">
                        <div className="title pd-t-30 pd-d-20">
                            <h2 className="text">{pageUtils.strings._title}</h2>
                            <span>{pageUtils.strings._subTitle}</span>
                        </div>
                        <div className="line-gr mb-20"></div>
                        <AlertState />
                        {children}
                    </div>
                </div>
            </div>
        </BasePageLayout>
    );
};

export default NotAuthPageLayout;
