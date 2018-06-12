import React from "react";

const TabMessageCard = ({
  userId,
  username,
  displayMessage,
  lastMessageTime,
  loadUserPage
}) => (
  <div onClick={() => loadUserPage({ userId })} className="tab-message-card">
    <div
      className="message-card-pic"
      style={{
        background: `url(https://api.adorable.io/avatars/50/${userId})`
      }}
    />
    <div className="message-card-desc">
      <div className="message-card-user">{username}</div>
      <div className="message-card-message">{displayMessage}</div>
      <div className="message-card-time">{lastMessageTime}</div>
    </div>
  </div>
);

export default TabMessageCard;
