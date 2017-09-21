import React from "react";
import { connect } from "react-redux";

const MessagePic = props => {
  const { msgLog } = props;
  let len = msgLog.length - 1;

  const picStyle = {
    height: "35px",
    width: "35px",
    borderRadius: "50%",
    background: "white",
    position: "absolute",
    right: "-45px",
    bottom: "0",
    transform: `translateY(${len * 43}px)`,
    transition: "transform 300ms cubic-bezier(.67,.35,.34,.91) 100ms"
  };

  const picImage = {
    backgroundImage:
      "url(https://raw.githubusercontent.com/Reactive-Extensions/RxJS/master/doc/designguidelines/images/984368.png)",
    height: "100%",
    width: "100%",
    backgroundSize: "contain"
  };
  return (
    <div style={picStyle}>
      <div style={picImage} />
    </div>
  );
};

const mapStateToProps = state => ({
  msgLog: state.getMessages
});

export default connect(mapStateToProps)(MessagePic);
