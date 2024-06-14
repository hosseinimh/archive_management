import React from "react";
import { useSelector } from "react-redux";

import {
    CustomLink,
    ErrorModal,
    ListPage,
    TableFooter,
    TableItems,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import {
    general,
    errorsPage as strings,
} from "../../../../constants/strings/fa";
import utils from "../../../../utils/Utils";

const Errors = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const columnsCount = 2;
    const pageUtils = new PageUtils();

    const renderButtons = () => (
        <>
            <button
                className="btn btn-primary"
                type="button"
                title={strings.excel}
                onClick={pageUtils?.onExcel}
                disabled={layoutState?.loading}
            >
                {strings.excel}
            </button>
            <button
                className="btn btn-primary mx-15"
                type="button"
                title={strings.remove}
                onClick={pageUtils?.onRemove}
                disabled={layoutState?.loading}
            >
                {strings.remove}
            </button>
        </>
    );

    const renderHeader = () => (
        <tr>
            <th>{strings.message}</th>
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
                <React.Fragment key={item.id}>
                    <tr>
                        <td style={{ textAlign: "left", direction: "ltr" }}>
                            <CustomLink
                                onClick={(e) =>
                                    pageUtils.showErrorModal(e, item)
                                }
                            >
                                {`${item.message?.substring(0, 100)} ...`}
                            </CustomLink>
                        </td>
                        <td className="d-flex-wrap just-around">
                            <div>{date}</div>
                            <div>{time}</div>
                        </td>
                    </tr>
                </React.Fragment>
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
            renderButtons={renderButtons}
        >
            <ErrorModal />
        </ListPage>
    );
};

export default Errors;
