import React from "react";
import SidebarNav from "./SidebarNav";
import SidebarMenu from "./SidebarMenu";

import "../../../css/messageApp/sidebar/sidebar.css";

const Sidebar = () => (
  <div className="sidebar-wrap">
    <SidebarNav />
    <SidebarMenu />
  </div>
);

export default Sidebar;
