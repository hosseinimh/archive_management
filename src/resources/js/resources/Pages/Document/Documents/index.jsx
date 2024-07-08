import React from "react";
import { useSelector } from "react-redux";

import {
    CustomLink,
    DocumentFilesModal,
    InputDatePickerColumn,
    InputRow,
    InputTextColumn,
    InputTextDocumentNoColumn,
    ListPage,
    ScanDocumentFile,
    SearchBox,
    SelectDocumentYearModal,
    TableFooter,
    TableItems,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import { documentsPage as strings } from "../../../../constants/strings/fa";
import { USER_ROLES } from "../../../../constants";
import utils from "../../../../utils/Utils";

const Documents = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const userState = useSelector((state) => state.userReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const columnsCount =
        userState?.user?.role === USER_ROLES.ADMINISTRATOR ? 7 : 6;
    const pageUtils = new PageUtils();

    const renderSearch = () => (
        <SearchBox
            showTitle={false}
            pageUtils={pageUtils}
            onSubmit={pageUtils.onSubmit}
            onReset={pageUtils.onReset}
        >
            <InputRow>
                <InputTextDocumentNoColumn
                    field="documentNo"
                    inputStyle={{ textAlign: "left", direction: "ltr" }}
                    fullRow={false}
                    showLabel
                    icon={"icon-key4"}
                    prefix={`${
                        pageUtils?.pageState?.props?.documentYear ??
                        utils.getCurrentTimezoneYear()
                    }/`}
                    onPrefixClick={(e) =>
                        pageUtils.onSelectDocumentYearModal(e)
                    }
                />
                <InputDatePickerColumn
                    field="documentDate"
                    showLabel
                    fullRow={false}
                />
                <InputTextColumn
                    field="paymentNo"
                    inputStyle={{ textAlign: "left", direction: "ltr" }}
                    fullRow={false}
                    showLabel
                    icon={"icon-note-214"}
                />
                <InputDatePickerColumn
                    field="paymentDate"
                    showLabel
                    fullRow={false}
                />
                <InputTextColumn
                    field="owner"
                    showLabel
                    icon={"icon-personalcard4"}
                    fullRow={false}
                />
            </InputRow>
            <div className="block-border"></div>
        </SearchBox>
    );

    const renderButtons = () => (
        <button
            className="btn btn-primary"
            type="button"
            title={strings.excel}
            onClick={pageUtils?.onExcel}
            disabled={layoutState?.loading}
        >
            {strings.excel}
        </button>
    );

    const renderHeader = () => (
        <tr>
            <th style={{ width: "100px" }}>{strings.documentNo}</th>
            <th style={{ width: "100px" }}>{strings.documentDate}</th>
            <th style={{ width: "100px" }}>{strings.paymentNo}</th>
            <th style={{ width: "100px" }}>{strings.paymentDate}</th>
            <th>{strings.owner}</th>
            <th style={{ width: "100px" }}>{strings.user}</th>
            <th style={{ width: "100px" }}>{strings.createdAt}</th>
        </tr>
    );

    const renderItems = () => {
        const children = pageState?.props?.items?.map((item) => (
            <React.Fragment key={item.id}>
                <tr>
                    <td
                        className="d-flex-wrap flex-center just-between"
                        style={{ direction: "rtl" }}
                    >
                        {userState?.user?.role === USER_ROLES.ADMINISTRATOR && (
                            <>
                                <CustomLink
                                    onClick={() => pageUtils.onEdit(item)}
                                    disabled={layoutState?.loading}
                                    title={strings.documentNo}
                                    className="mx-rdir-10"
                                >
                                    {`${item.documentYear}/${item.documentNo}`}
                                </CustomLink>
                                <CustomLink
                                    onClick={(e) =>
                                        pageUtils.showDocumentFilesModal(
                                            e,
                                            item
                                        )
                                    }
                                    disabled={layoutState?.loading}
                                    title={strings.showDocumentFilesModal}
                                    className="mx-rdir-10"
                                >
                                    <div className="icon">
                                        <i
                                            className={"icon-document-copy4"}
                                        ></i>
                                    </div>
                                </CustomLink>
                            </>
                        )}
                        {userState?.user?.role !== USER_ROLES.ADMINISTRATOR &&
                            `${item.documentYear}/${item.documentNo}`}
                    </td>
                    <td>{item.documentDate ?? "-"}</td>
                    <td>{item.paymentNo ?? "-"}</td>
                    <td>{item.paymentDate ?? "-"}</td>
                    <td>{item.owner ?? "-"}</td>
                    <td>{`${item.userName} ${item.userFamily}`}</td>
                    <td>{item.createdAtFa}</td>
                </tr>
            </React.Fragment>
        ));

        return <TableItems columnsCount={columnsCount}>{children}</TableItems>;
    };

    const renderFooter = () => (
        <TableFooter columnsCount={columnsCount} pageUtils={pageUtils} />
    );

    return (
        <ListPage
            pageUtils={pageUtils}
            renderTopList={renderSearch}
            table={{ renderHeader, renderItems, renderFooter }}
            hasAdd={userState?.user?.role === USER_ROLES.ADMINISTRATOR}
            renderButtons={renderButtons}
        >
            <SelectDocumentYearModal />
            <DocumentFilesModal />
            <ScanDocumentFile />
        </ListPage>
    );
};

export default Documents;
