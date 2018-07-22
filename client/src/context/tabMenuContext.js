import React, { Component } from "react";
import PropTypes from "prop-types";

const TabMenuContext = React.createContext();

export const TabMenuConsumer = TabMenuContext.Consumer;

export class TabMenuProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = {
    activeTab: "t1"
  };

  switchTab = tab => {
    this.setState({
      activeTab: tab
    });
  };

  render() {
    return (
      <TabMenuContext.Provider
        value={{
          activeTab: this.state.activeTab,
          switchTab: this.switchTab
        }}
      >
        {this.props.children}
      </TabMenuContext.Provider>
    );
  }
}
