import React from "react";
import { ConversationConsumer } from "../../../context/conversationContext";
import { UserConsumer } from "../../../context/userContext";
import { TabMenuConsumer } from "../../../context/tabMenuContext";

import "../../../css/messageApp/sidebar/sidebarMenu.css";

import TabMessages from "./menu_tabs/TabMessages";
import TabSearch from "./menu_tabs/TabSearch";
import TabEdit from "./menu_tabs/TabEdit";

const SidebarMenu = () => (
  <div className="sidebar-menu">
    <UserConsumer>
      {({ userData }) => (
        <ConversationConsumer>
          {({ initConversation }) => (
            <TabMenuConsumer>
              {({ activeTab, userSearchResult = [], searchUsers }) => (
                <React.Fragment>
                  <TabMessages />
                  <TabSearch
                    activeTab={activeTab}
                    userSearchResult={userSearchResult}
                    searchUsers={searchUsers}
                    userData={userData}
                    initConversation={initConversation}
                  />
                  <TabEdit />
                </React.Fragment>
              )}
            </TabMenuConsumer>
          )}
        </ConversationConsumer>
      )}
    </UserConsumer>
  </div>
);

export default SidebarMenu;
