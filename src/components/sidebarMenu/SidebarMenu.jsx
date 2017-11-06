import React from "react";
import PropTypes from "prop-types";

// Components
import SidebarSearch from "./SidebarSearch";
import SidebarMessages from "./SidebarMessages";
import SidebarSettings from "./SidebarSettings";

const SidebarMenu = ({ clicked }) => (
  <div>
    <SidebarSearch show={clicked === "search"} />
    <SidebarMessages show={clicked === "messages"} />
    <SidebarSettings show={clicked === "settings"} />
  </div>
);

SidebarMenu.propTypes = {
  clicked: PropTypes.string.isRequired
};

export default SidebarMenu;
