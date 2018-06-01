import React from "react";

import "../../../../css/messageApp/menu_tabs/tabSearch.css";

const TabSearch = ({ active }) => (
  <div
    className={`tab-menu${active ? " tab-menu__active" : ""} tab-menu__search`}
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
);

export default TabSearch;
