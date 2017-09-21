import React from "react";
import { connect } from "react-redux";

const MessagePic = props => {
  const { msgLog } = props;
  const len = msgLog.length - 1;
  console.log(len);
  const picStyle = {
    height: "35px",
    width: "35px",
    borderRadius: "50%",
    background: "gray",
    position: "absolute",
    right: "-45px",
    bottom: "0",
    transform: `translateY(${len * 43}px)`,
    transition: "transform 300ms cubic-bezier(.67,.35,.34,.91) 100ms"
  };
  return (
    <div style={picStyle}>
      <div />
    </div>
  );
};

const mapStateToProps = state => ({
  msgLog: state.getMessages
});

export default connect(mapStateToProps)(MessagePic);
