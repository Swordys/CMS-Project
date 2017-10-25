import React from "react";
import PropTypes from "prop-types";

// CSS
import "../../../../css/messageApp/message/messageLog/messageUrl/messageUrlMeta.css";

const MessageUrlMeta = ({ description, image, publisher, title, url }) => (
  <div className="messageItem_url_meta">
    <div className="messageItem_url_text">
      <div className={publisher ? "meta_url_publisher" : ""}>{publisher}</div>
      <div className="meta_url_title">
        <a href={url}>{title}</a>
      </div>
      <div className="meta_url_description">{description}</div>
    </div>
    <div
      className="messageItem_url_image"
      style={{ backgroundImage: `url(${image})` }}
    />
  </div>
);

MessageUrlMeta.defaultProps = {
  publisher: "",
  url: ""
};

MessageUrlMeta.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  publisher: PropTypes.string,
  url: PropTypes.string
};

export default MessageUrlMeta;
