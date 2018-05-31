import React from "react";

import "../../../../css/messageApp/menu_tabs/tabSearch.css";

const TabSearch = () => (
  <div className="tab-menu tab-menu__search">
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
