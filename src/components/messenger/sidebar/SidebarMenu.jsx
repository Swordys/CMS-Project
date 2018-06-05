import React from "react";
import { DatabaseConsumer } from "../../../context/dataContext";
import { TabMenuConsumer } from "../../../context/tabMenuContext";

import "../../../css/messageApp/sidebar/sidebarMenu.css";

import TabMessages from "./menu_tabs/TabMessages";
import TabSearch from "./menu_tabs/TabSearch";
import TabEdit from "./menu_tabs/TabEdit";

const SidebarMenu = () => (
  <div className="sidebar-menu">
    <DatabaseConsumer>
      {({
        userData,
        messageConvos,
        searchUsers,
        userSearchResult,
        initConversation,
        loadConversation
      }) => (
        <TabMenuConsumer>
          {({ activeTab }) => (
            <React.Fragment>
              <TabMessages
                activeTab={activeTab}
                userData={userData}
                messageConvos={messageConvos}
                loadConversation={loadConversation}
              />
              <TabSearch
                activeTab={activeTab}
                userSearchResult={userSearchResult}
                searchUsers={searchUsers}
                userData={userData}
                initConversation={initConversation}
              />
              <TabEdit activeTab={activeTab} />
            </React.Fragment>
          )}
        </TabMenuConsumer>
      )}
    </DatabaseConsumer>
  </div>
);

export default SidebarMenu;
