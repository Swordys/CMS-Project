import React from "react";

const TabMessageCard = ({
  roomId,
  displayMessage,
  lastMessageTime,
  loadConversation
}) => (
  <div onClick={() => loadConversation(roomId)} className="tab-message-card">
    <div className="message-card-pic" />
    <div className="message-card-desc">
      <div className="message-card-user">Swordys</div>
      <div className="message-card-message">{displayMessage}</div>
      <div className="message-card-time">{lastMessageTime}</div>
    </div>
  </div>
);

export default TabMessageCard;
