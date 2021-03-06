import React from "react";

import "../../../../css/messageApp/menu_tabs/tabMessages.css";
import TabMessageCard from "./TabMessageCard";

const TabMessages = class extends React.Component {
  state = {};

  render() {
    const { messageConvos, loadUserPage, activeTab } = this.props;
    const userMessages =
      messageConvos &&
      Object.values(messageConvos).map(message => (
        <TabMessageCard
          key={message.roomId}
          {...message}
          loadUserPage={loadUserPage}
        />
      ));

    return (
      <div
        className={`tab-menu${
          activeTab === "t1" ? " tab-menu__active" : ""
        } tab-menu__messages`}
      >
        {userMessages}
      </div>
    );
  }
};

export default TabMessages;
