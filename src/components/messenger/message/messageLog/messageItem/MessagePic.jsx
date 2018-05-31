import React from "react";
import PropTypes from "prop-types";

const MessagePic = ({ userId }) => (
  <div className="message-item-pic-wrap">
    <div
      className="message-item-pic"
      style={{
        backgroundImage: `url(https://api.adorable.io/avatars/60/${userId})`
      }}
    />
  </div>
);

MessagePic.propTypes = {
  userId: PropTypes.string.isRequired
};

export default MessagePic;
