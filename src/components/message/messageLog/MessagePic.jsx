import React, { Component } from "react";
import PropTypes from "prop-types";

class MessagePic extends Component {
  state = {
    opacity: "0"
  };

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        opacity: "1"
      });
    }, 450);
  }

  renderPic = () => {
    const { position } = this.props;

    const picStyle = {
      height: "35px",
      opacity: `${this.state.opacity}`,
      width: "35px",
      borderRadius: "50%",
      background: "white",
      position: "absolute",
      right: "-45px",
      bottom: "0",
      transform: `translateY(${position}px)`,
      transition: `transform 300ms cubic-bezier(.67,.35,.34,.91) 100ms`,
      overflow: "hidden"
    };

    const picImage = {
      backgroundImage: "url(https://placeimg.com/50/50/tech)",
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

  render() {
    return <div>{this.renderPic()}</div>;
  }
}

MessagePic.propTypes = {
  position: PropTypes.number.isRequired
};

export default MessagePic;
