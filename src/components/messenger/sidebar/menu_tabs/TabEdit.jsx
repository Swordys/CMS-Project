import React from "react";

import "../../../../css/messageApp/menu_tabs/tabEdit.css";

const TabEdit = ({ activeTab }) => (
  <div
    className={`tab-menu${
      activeTab === "t3" ? " tab-menu__active" : ""
    } tab-menu__edit`}
  >
    <div>
      <span>EDIT ACCOUNT</span>
      <div>
        <span>Change Username</span>
        <input type="text" />
      </div>
    </div>
  </div>
);

export default TabEdit;
