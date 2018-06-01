import React from "react";

import "../../../../css/messageApp/menu_tabs/tabEdit.css";

const TabEdit = ({ active }) => (
  <div
    className={`tab-menu${active ? " tab-menu__active" : ""} tab-menu__edit`}
  >
    <div />
  </div>
);

export default TabEdit;
