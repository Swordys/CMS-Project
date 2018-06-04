import React from "react";
import { TabMenuConsumer } from "../../../../context/tabMenuContext";

import "../../../../css/messageApp/menu_tabs/tabSearch.css";

const TabSearch = class extends React.Component {
  state = {
    loading: false
  };

  handleSearchResClick = userId => {
    const { userData, initConversation } = this.props;
    initConversation(userData.uid, userId);
  };

  render() {
    return (
      <TabMenuConsumer>
        {({ activeTab, userSearchResult = [], searchUsers }) => (
          <div
            className={`tab-menu${
              activeTab === "t2" ? " tab-menu__active" : ""
            } tab-menu__search`}
          >
            <div className="tab-message-search">
              <input
                placeholder="Search Messenger"
                type="search"
                name="message-serach"
                className="tab-menu-search"
                onChange={({ target }) => searchUsers(target.value)}
              />
            </div>
            <div className="tab-message-serch-result">
              <ul className="search-result-wrap">
                {userSearchResult.map(user => (
                  <li
                    role="presentation"
                    onClick={() => this.handleSearchResClick(user.uid)}
                    className="search-result-item"
                    key={user.uid}
                  >
                    {user.username}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </TabMenuConsumer>
    );
  }
};

export default TabSearch;
