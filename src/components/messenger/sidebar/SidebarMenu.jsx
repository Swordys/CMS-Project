import React from "react";
import "../../../css/messageApp/sidebar/sidebarMenu.css";

import TabMessages from "./menu_tabs/TabMessages";
import TabSearch from "./menu_tabs/TabSearch";
import TabEdit from "./menu_tabs/TabEdit";

const SidebarMenu = () => (
  <div className="sidebar-menu">
    <TabMessages />
    <TabSearch />
    <TabEdit />
  </div>
);

export default SidebarMenu;
