import React from "react";
import { TabMenuConsumer } from "../../../../context/tabMenuContext";

import "../../../../css/messageApp/menu_tabs/tabEdit.css";

const TabEdit = () => (
  <TabMenuConsumer>
    {({ activeTab }) => (
      <div
        className={`tab-menu${
          activeTab === "t3" ? " tab-menu__active" : ""
        } tab-menu__edit`}
      >
        <div />
      </div>
    )}
  </TabMenuConsumer>
);

export default TabEdit;
