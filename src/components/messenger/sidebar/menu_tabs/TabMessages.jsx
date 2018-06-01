import React from "react";

import "../../../../css/messageApp/menu_tabs/tabMessages.css";
import TabMessageCard from "./TabMessageCard";
import { TabMenuConsumer } from "../../../../context/tabMenuContext";

const TabMessages = () => (
  <TabMenuConsumer>
    {({ activeTab }) => (
      <div
        className={`tab-menu${
          activeTab === "t1" ? " tab-menu__active" : ""
        } tab-menu__messages`}
      >
        <TabMessageCard />
      </div>
    )}
  </TabMenuConsumer>
);

export default TabMessages;
