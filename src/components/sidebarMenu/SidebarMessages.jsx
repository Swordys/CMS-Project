import React from "react";
import PropTypes from "prop-types";
import Transition from "react-transition-group/Transition";

import "../../css/messageApp/sidebar/sidebarMessages.css";
import tr from "../../helpers/transitionPannel";

const SidebarMessage = ({ show }) => (
  <Transition appear unmountOnExit in={show} timeout={tr.duration}>
    {state => (
      <div
        style={{
          ...tr.defaultStyle,
          ...tr.transitionStyles[state]
        }}
        className="sidebar_menu sidebar_menu_message"
      >
        Messages
      </div>
    )}
  </Transition>
);

SidebarMessage.propTypes = {
  show: PropTypes.bool.isRequired
};

export default SidebarMessage;
