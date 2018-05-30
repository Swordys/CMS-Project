import React from "react";

// Components
import SidebarMenu from "../sidebarMenu/SidebarMenu";

// CSS
import "../../css/messageApp/sidebar/sidebar.css";

const styles = {
  icon: {
    fontSize: "30px",
    color: "white"
  }
};

class Sidebar extends React.Component {
  state = {
    clicked: ""
  };

  handleClick = c => {
    this.setState({
      clicked: c
    });
  };

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar_user_main">
          <div className="sidebar_item sidebar_user">
            <div className="sidebar_user_pic" />
          </div>
        </div>
        <div className="sidebar_options">
          <div
            role="button"
            tabIndex="0"
            onKeyDown={() => {}}
            onClick={() => this.handleClick("search")}
            className="sidebar_item sidebar_search"
          >
            <i
              className="fa fa-search"
              style={styles.icon}
              aria-hidden="true"
            />
          </div>
          <div
            role="button"
            tabIndex="-1"
            onKeyDown={() => {}}
            onClick={() => this.handleClick("messages")}
            className="sidebar_item sidebar_messages"
          >
            <i className="fa fa-inbox" style={styles.icon} aria-hidden="true" />
          </div>
          <div
            role="button"
            tabIndex="-2"
            onKeyDown={() => {}}
            onClick={() => this.handleClick("settings")}
            className="sidebar_item sidebar_settings"
          >
            <i className="fa fa-cog" style={styles.icon} aria-hidden="true" />
          </div>
        <div className="sidebar_logout_main">
          <div className="sidebar_item sidebar_logout">
            <i
              className="fa fa-sign-out"
              style={styles.icon}
              aria-hidden="true"
            />
          </div>
        </div>
        <SidebarMenu clicked={this.state.clicked} />
      </div>
    );
  }
}

export default Sidebar;
