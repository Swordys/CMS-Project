import React from "react";

import "../../../../css/messageApp/menu_tabs/tabMessages.css";
import TabMessageCard from "./TabMessageCard";

const TabMessages = () => (
  <div className="tab-menu tab-menu__messages">
    <div className="tab-message-search">
      <input
        placeholder="Search conversation"
        type="search"
        name="message-serach"
        className="tab-menu-search"
      />
    </div>
    <TabMessageCard />
  </div>
);

export default TabMessages;
