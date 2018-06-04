import React, { Component } from "react";
import PropTypes from "prop-types";
import { searchUsers } from "../API/firestore/index";

const TabMenuContext = React.createContext();

export const TabMenuConsumer = TabMenuContext.Consumer;

export class TabMenuProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = {
    activeTab: "t1",
    searchResult: []
  };

  switchTab = tab => {
    this.setState({
      activeTab: tab
    });
  };

  searchUsers = async (user, uid) => {
    const searchResult = await searchUsers(user, uid);
    this.setState({
      searchResult
    });
  };

  render() {
    return (
      <TabMenuContext.Provider
        value={{
          activeTab: this.state.activeTab,
          switchTab: this.switchTab,
          searchUsers: this.searchUsers,
          userSearchResult: this.state.searchResult
        }}
      >
        {this.props.children}
      </TabMenuContext.Provider>
    );
  }
}
