import React from "react";
import { TabMenuConsumer } from "../../../../context/tabMenuContext";

import "../../../../css/messageApp/menu_tabs/tabSearch.css";

const TabSearch = () => (
  <TabMenuConsumer>
    {({ activeTab }) => (
      <div
        className={`tab-menu${
          activeTab === "t2" ? " tab-menu__active" : ""
        } tab-menu__search`}
      >
        <div className="tab-message-search">
          <input
            placeholder="Search Messenger"
            type="search"
            name="message-serach"
            className="tab-menu-search"
          />
        </div>
      </div>
    )}
  </TabMenuConsumer>
);

export default TabSearch;
