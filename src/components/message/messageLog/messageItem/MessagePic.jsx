import React from "react";
import PropTypes from "prop-types";

const MessagePic = ({ sender }) => {
  const renderPic = () => {
    const picStyles = {
      picStyle: {
        [sender ? "right" : "left"]: "-45px"
      },
      picImage: {
        backgroundImage: "url(https://picsum.photos/100)"
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
