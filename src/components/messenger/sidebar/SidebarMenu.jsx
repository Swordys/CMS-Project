import React from "react";
import { ConversationConsumer } from "../../../context/conversationContext";
import { UserConsumer } from "../../../context/userContext";
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
            <React.Fragment>
              <TabMessages />
              <TabSearch
                userData={userData}
                initConversation={initConversation}
              />
              <TabEdit />
            </React.Fragment>
          )}
        </ConversationConsumer>
      )}
    </UserConsumer>
  </div>
);

export default SidebarMenu;
