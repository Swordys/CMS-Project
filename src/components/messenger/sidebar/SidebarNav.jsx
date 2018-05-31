import React from "react";
import * as icon from "react-feather";
import "../../../css/messageApp/sidebar/sidebarNav.css";

const SibarNav = () => (
  <div className="sidebar-nav-wrap">
    <div className="sidebar-nav">
      <div className="nav-icon">
        <icon.MessageCircle size={18} color="white" />
      </div>
      <div className="nav-icon">
        <icon.Search size={18} color="white" />
      </div>
      <div className="nav-icon">
        <icon.Edit2 size={18} color="white" />
      </div>
    </div>
    <div className="sidebar-nav nav-wrap__bottom">
      <div className="nav-icon">
        <icon.Sliders size={18} color="white" />
      </div>
      <div className="nav-icon">
        <icon.LogOut size={18} color="white" />
      </div>
    </div>
  </div>
);

export default SibarNav;