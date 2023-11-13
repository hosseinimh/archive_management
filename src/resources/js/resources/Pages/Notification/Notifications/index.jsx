import React from "react";
import { useSelector } from "react-redux";

import { ListPage, TableFooter, TableItems } from "../../../components";
import { PageUtils } from "./PageUtils";
import {
    notificationsPage as strings,
    general,
} from "../../../../constants/strings/fa";
import notification from "../../../../utils/Notification";
import { NOTIFICATION_CATEGORIES } from "../../../../constants";
import utils from "../../../../utils/Utils";

const Notifications = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const columnsCount = 3;
    const pageUtils = new PageUtils();

    const onChangeTabContent = (e) => {
        e.stopPropagation();
        [
            ...document.querySelectorAll(
                ".checked-item.tab-item.tab-page-item"
            ),
        ].map((btn) => {
            if (e.target === btn) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
        pageUtils.onChangeCategory(e.target.getAttribute("data-tab-content"));
    };

    const renderSubCategories = () => (
        <div className="checked-list scrollhide d-flex mx-15">
            <button
                className="checked-item tab-item tab-page-item active"
                data-tab-content="0"
                onClick={(e) => onChangeTabContent(e)}
                disabled={layoutState?.loading}
            >
                {strings.allNotificaions}
            </button>
            <button
                className="checked-item tab-item tab-page-item"
                data-tab-content={NOTIFICATION_CATEGORIES.ACCOUNT}
                onClick={(e) => onChangeTabContent(e)}
                disabled={layoutState?.loading}
            >
                {strings.accountNotifications}
            </button>
            <button
                className="checked-item tab-item tab-page-item"
                data-tab-content={NOTIFICATION_CATEGORIES.SYSTEM}
                onClick={(e) => onChangeTabContent(e)}
                disabled={layoutState?.loading}
            >
                {strings.systemNotificaions}
            </button>
        </div>
    );

    const renderHeader = () => (
        <tr>
            <th style={{ width: "150px" }}>{strings.title}</th>
            <th>{strings.body}</th>
            <th style={{ width: "150px" }}>{strings.date}</th>
        </tr>
    );

    const renderItems = () => {
        const children = pageState?.props?.items?.map((item) => {
            const { date, time } = utils.getTimezoneDate(
                item.createdAt,
                general.locale
            );
            return (
                <tr key={item.id}>
                    <td className="d-flex-wrap flex-center">
                        {!item.seenAt && (
                            <div className="dot-icon-inline bg-success"></div>
                        )}
                        <div style={{ fontWeight: !item.seenAt ? "bold" : "" }}>
                            {item.subCategoryTitle}
                        </div>
                    </td>
                    <td style={{ fontWeight: !item.seenAt ? "bold" : "" }}>
                        {notification.getSubCategoryText(item, general.locale)}
                    </td>
                    <td className="d-flex-wrap just-around">
                        <div>{date}</div>
                        <div>{time}</div>
                    </td>
                </tr>
            );
        });

        return <TableItems columnsCount={columnsCount}>{children}</TableItems>;
    };

    const renderFooter = () => (
        <TableFooter columnsCount={columnsCount} pageUtils={pageUtils} />
    );

    return (
        <ListPage
            pageUtils={pageUtils}
            table={{ renderHeader, renderItems, renderFooter }}
            hasAdd={false}
            renderTopList={renderSubCategories}
        ></ListPage>
    );
};

export default Notifications;
