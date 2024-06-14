import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { slideDown, slideUp } from "es6-slide-up-down";
import { easeOutQuint } from "es6-easings";

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
    SelectYearModal,
    TableFooter,
    TableItems,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import {
    documentsPage as strings,
    general,
} from "../../../../constants/strings/fa";
import { USER_ROLES } from "../../../../constants";
import { setDropDownElementAction } from "../../../../state/layout/layoutActions";

const Documents = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const userState = useSelector((state) => state.userReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const dispatch = useDispatch();
    const columnsCount =
        userState?.user?.role === USER_ROLES.ADMINISTRATOR ? 7 : 6;
    const pageUtils = new PageUtils();

    const toggleActions = (e, id) => {
        e.stopPropagation();
        const element = document.querySelector(`#${id}`).lastChild;
        if (layoutState?.dropDownElement) {
            slideUp(layoutState.dropDownElement);
            if (layoutState?.dropDownElement === element) {
                dispatch(setDropDownElementAction(null));
                return;
            }
        }
        dispatch(setDropDownElementAction(element));
        slideDown(element, {
            duration: 400,
            easing: easeOutQuint,
        });
    };

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
                    prefix={`${pageUtils?.pageState?.props?.year ?? ""}/`}
                    onPrefixClick={(e) => pageUtils.onSelectYearModal(e)}
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
            {userState?.user?.role === USER_ROLES.ADMINISTRATOR && (
                <th style={{ width: "100px" }}>{general.actions}</th>
            )}
        </tr>
    );

    const renderItems = () => {
        const children = pageState?.props?.items?.map((item) => (
            <React.Fragment key={item.id}>
                <tr>
                    <td>
                        <CustomLink
                            onClick={() => pageUtils.onEdit(item)}
                            title={item.documentNo}
                        >
                            {item.documentNo}
                        </CustomLink>
                    </td>
                    <td>{item.documentDate ?? "-"}</td>
                    <td>{item.paymentNo ?? "-"}</td>
                    <td>{item.paymentDate ?? "-"}</td>
                    <td>{item.owner ?? "-"}</td>
                    <td>{`${item.userName} ${item.userFamily}`}</td>
                    <td>
                        <button
                            id={`actions-${item.id}`}
                            type="button"
                            className="btn btn-primary btn-dropdown mx-rdir-10"
                            onClick={(e) =>
                                toggleActions(e, `actions-${item.id}`)
                            }
                            disabled={layoutState?.loading}
                        >
                            <div className="d-flex">
                                <span className="grow-1 mx-rdir-10">
                                    {general.actions}
                                </span>
                                <div className="icon">
                                    <i className="icon-arrow-down5"></i>
                                </div>
                            </div>
                            <div className="dropdown-menu dropdown-menu-end">
                                <ul>
                                    {userState?.user?.role ===
                                        USER_ROLES.ADMINISTRATOR && (
                                        <li>
                                            <CustomLink
                                                onClick={() =>
                                                    pageUtils.onEdit(item)
                                                }
                                                disabled={layoutState?.loading}
                                            >
                                                {general.edit}
                                            </CustomLink>
                                        </li>
                                    )}
                                    <li>
                                        <CustomLink
                                            onClick={(e) =>
                                                pageUtils.showDocumentFilesModal(
                                                    e,
                                                    item
                                                )
                                            }
                                            disabled={layoutState?.loading}
                                        >
                                            {strings.showDocumentFilesModal}
                                        </CustomLink>
                                    </li>
                                </ul>
                            </div>
                        </button>
                    </td>
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
            <SelectYearModal />
            <DocumentFilesModal />
            <ScanDocumentFile />
        </ListPage>
    );
};

export default Documents;
