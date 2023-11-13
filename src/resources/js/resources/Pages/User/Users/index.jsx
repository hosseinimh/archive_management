import React from "react";
import { useSelector } from "react-redux";

import {
  InputRow,
  InputTextColumn,
  ListPage,
  SearchBox,
  TableFooter,
  TableItems,
} from "../../../components";
import { USER_ROLES } from "../../../../constants";
import { PageUtils } from "./PageUtils";
import {
  usersPage as strings,
  general,
} from "../../../../constants/strings/fa";

const Users = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const userState = useSelector((state) => state.userReducer);
  const columnsCount = 6;
  const pageUtils = new PageUtils();

  const renderSearch = () => (
    <SearchBox
      pageUtils={pageUtils}
      onSubmit={pageUtils.onSubmit}
      onReset={pageUtils.onReset}
    >
      <InputRow>
        <InputTextColumn
          field="username"
          textAlign="left"
          icon={"icon-frame-14"}
          fullRow={false}
        />
        <InputTextColumn
          field="nameFamily"
          icon={"icon-personalcard4"}
          fullRow={false}
        />
      </InputRow>
    </SearchBox>
  );

  const renderHeader = () => (
    <tr>
      <th style={{ width: "150px" }}>{strings.username}</th>
      <th>{strings.nameFamily}</th>
      <th style={{ width: "150px" }}>{strings.mobile}</th>
      <th style={{ width: "150px" }}>{strings.role}</th>
      <th style={{ width: "100px" }}>{strings.status}</th>
      <th style={{ width: "200px" }}>{general.actions}</th>
    </tr>
  );

  const renderItems = () => {
    const children = pageState?.props?.items?.map((item) => (
      <tr key={item.id}>
        <td>{item.username}</td>
        <td>{`${item.name} ${item.family}`}</td>
        <td>{item.mobile}</td>
        <td>
          {item.role === USER_ROLES.ADMINISTRATOR
            ? general.administrator
            : general.user}
        </td>
        <td>{item.isActive === 1 ? strings.active : strings.notActive}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary mx-5"
            onClick={() => pageUtils.onEdit(item)}
            title={general.edit}
            disabled={layoutState?.loading}
          >
            {general.edit}
          </button>
          <button
            type="button"
            className="btn btn-primary mx-5"
            onClick={() => pageUtils.onChangePassword(item)}
            title={strings.changePassword}
            disabled={layoutState?.loading}
          >
            {strings.changePassword}
          </button>
        </td>
      </tr>
    ));

    return <TableItems columnsCount={columnsCount}>{children}</TableItems>;
  };

  const renderFooter = () => (
    <TableFooter columnsCount={columnsCount} pageUtils={pageUtils} />
  );

  return (
    <ListPage
      pageUtils={pageUtils}
      table={{ renderHeader, renderItems, renderFooter }}
      hasAdd={userState?.user?.role === USER_ROLES.ADMINISTRATOR ? true : false}
      renderTopList={renderSearch}
    ></ListPage>
  );
};

export default Users;
