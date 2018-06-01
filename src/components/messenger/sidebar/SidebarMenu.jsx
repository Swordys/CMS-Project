import React from "react";
import "../../../css/messageApp/sidebar/sidebarMenu.css";

import TabMessages from "./menu_tabs/TabMessages";
import TabSearch from "./menu_tabs/TabSearch";
import TabEdit from "./menu_tabs/TabEdit";

const SidebarMenu = ({ activeTab }) => (
  <div className="sidebar-menu">
    <TabMessages active={activeTab === "t1"} />
    <TabSearch active={activeTab === "t2"} />
    <TabEdit active={activeTab === "t3"} />
  </div>
);

export default SidebarMenu;
