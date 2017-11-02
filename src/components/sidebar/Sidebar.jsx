import React from "react";

// CSS
import "../../css/messageApp/sidebar/sidebar.css";

const styles = {
  icon: {
    fontSize: "30px",
    color: "white"
  }
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_user_main">
        <div className="sidebar_item sidebar_user">
          <div className="sidebar_user_pic" />
        </div>
      </div>
      <div className="sidebar_options">
        <div className="sidebar_item sidebar_search">
          <i className="fa fa-search" style={styles.icon} aria-hidden="true" />
        </div>
        <div className="sidebar_item sidebar_messages">
          <i className="fa fa-inbox" style={styles.icon} aria-hidden="true" />
        </div>
        <div className="sidebar_item sidebar_settings">
          <i className="fa fa-cog" style={styles.icon} aria-hidden="true" />
        </div>
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
    </div>
  );
};

export default Sidebar;
