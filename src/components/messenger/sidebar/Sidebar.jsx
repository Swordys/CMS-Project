import React from "react";
import SidebarNav from "./SidebarNav";
import SidebarMenu from "./SidebarMenu";

import "../../../css/messageApp/sidebar/sidebar.css";

import {
  TabMenuProvider,
  TabMenuConsumer
} from "../../../context/tabMenuContext";

const Sidebar = () => (
  <TabMenuProvider>
    <TabMenuConsumer>
      {({ activeTab, switchTab }) => (
        <div className="sidebar-wrap">
          <SidebarNav switchTab={switchTab} />
          <SidebarMenu activeTab={activeTab} />
        </div>
      )}
    </TabMenuConsumer>
  </TabMenuProvider>
);

export default Sidebar;
