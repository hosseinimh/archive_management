import React from "react";
import { useSelector } from "react-redux";

import { ListPage, TableFooter, TableItems } from "../../../components";
import { PageUtils } from "./PageUtils";
import {
    general,
    errorsPage as strings,
} from "../../../../constants/strings/fa";
import utils from "../../../../utils/Utils";

const Errors = () => {
    const pageState = useSelector((state) => state.pageReducer);
    const columnsCount = 2;
    const pageUtils = new PageUtils();

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
                        <td>{`${item.message.substring(0, 100)} ...`}</td>
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
        ></ListPage>
    );
};

export default Errors;
