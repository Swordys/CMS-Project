import React from "react";
import SidebarNav from "./SidebarNav";
import SidebarMenu from "./SidebarMenu";

import "../../../css/messageApp/sidebar/sidebar.css";

import { TabMenuProvider } from "../../../context/tabMenuContext";

const Sidebar = () => (
  <TabMenuProvider>
    <div className="sidebar-wrap">
      <SidebarNav />
      <SidebarMenu />
    </div>
  </TabMenuProvider>
);

export default Sidebar;
