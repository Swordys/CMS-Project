import React from "react";
import PropTypes from "prop-types";
import Transition from "react-transition-group/Transition";

import "../../css/messageApp/sidebar/sidebarSettings.css";
import tr from "../../helpers/transitionPannel";

const SidebarSetttings = ({ show }) => (
  <Transition appear unmountOnExit in={show} timeout={tr.duration}>
    {state => (
      <div
        style={{
          ...tr.defaultStyle,
          ...tr.transitionStyles[state]
        }}
        className="sidebar_menu sidebar_menu_settings"
      >
        Settings
      </div>
    )}
  </Transition>
);

SidebarSetttings.propTypes = {
  show: PropTypes.bool.isRequired
};

export default SidebarSetttings;
