import React from "react";
import PropTypes from "prop-types";

const MessagePic = ({ sender }) => {
  const renderPic = () => {
    const picStyles = {
      picStyle: {
        [sender ? "right" : "left"]: "-45px"
      },
      picImage: {
        backgroundImage: "url(https://api.adorable.io/avatars/60/david)"
      }
    };

    return (
      <div className="messageItem_pic" style={picStyles.picStyle}>
        <div className="messageItem_image" style={picStyles.picImage} />
      </div>
    );
  };

  return <div>{renderPic()}</div>;
};

MessagePic.propTypes = {
  sender: PropTypes.bool.isRequired
};

export default MessagePic;
