import React from "react";

import "../../../../css/messageApp/menu_tabs/tabSearch.css";

const TabSearch = class extends React.Component {
  state = {
    loading: false
  };

  handleUserSearch = value => {
    const { searchUsers } = this.props;
    searchUsers(value);
  };

  handleSearchResClick = targetUser => {
    const { initConversation } = this.props;
    initConversation(targetUser);
  };

  render() {
    const { activeTab, userSearchResult } = this.props;
    return (
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
            onChange={({ target }) => this.handleUserSearch(target.value)}
          />
        </div>
        <div className="tab-message-serch-result">
          <ul className="search-result-wrap">
            {userSearchResult.map(user => (
              <li
                role="presentation"
                onClick={() => this.handleSearchResClick(user)}
                className="search-result-item"
                key={user.uid}
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default TabSearch;
