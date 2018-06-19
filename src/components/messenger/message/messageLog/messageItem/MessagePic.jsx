import React from "react";
import PropTypes from "prop-types";

const MessagePic = ({ senderId }) => (
  <div className="message-item-pic-wrap">
    <div
      className="message-item-pic"
      style={{
        backgroundImage: `url(https://api.adorable.io/avatars/60/${senderId})`
      }}
    />
  </div>
);

MessagePic.propTypes = {
  senderId: PropTypes.string.isRequired
};

export default MessagePic;
