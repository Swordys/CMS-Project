import React from "react";

import "../../../../css/messageApp/menu_tabs/tabMessages.css";
import TabMessageCard from "./TabMessageCard";

const TabMessages = ({ active }) => (
  <div
    className={`tab-menu${
      active ? " tab-menu__active" : ""
    } tab-menu__messages`}
  >
    <TabMessageCard />
  </div>
);

export default TabMessages;
