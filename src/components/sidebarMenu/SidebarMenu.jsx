import React, { Component } from "react";

// Components
import SidebarSearch from "./SidebarSearch";

class SidebarMenu extends Component {
  renderMenu = () => {
    return this.props.clicked === "search" ? <SidebarSearch /> : null;
  };

  render() {
    return <SidebarSearch show={this.props.clicked === "search"} />;
  }
}

export default SidebarMenu;
