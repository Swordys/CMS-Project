import React, { Component } from "react";
import PropTypes from "prop-types";

class MessagePic extends Component {
  state = {
    opacity: "0"
  };

  componentWillMount() {
    if (this.props.noDelay) {
      this.setState({
        opacity: "1"
      });
    } else
      setTimeout(() => {
        this.setState({
          opacity: "1"
        });
      }, 450);
  }

  renderPic = () => {
    const { position, sender } = this.props;
    const picStyles = {
      picStyle: {
        height: "35px",
        opacity: `${this.state.opacity}`,
        width: "35px",
        borderRadius: "50%",
        background: "white",
        position: "absolute",
        [sender ? "right" : "left"]: "-45px",
        bottom: "0",
        // transform: `translateY(${position}px)`,
        transition: `transform 300ms cubic-bezier(.67,.35,.34,.91) 100ms`,
        overflow: "hidden"
      },
      picImage: {
        backgroundImage: "url(https://placeimg.com/50/50/tech)",
        height: "100%",
        width: "100%",
        backgroundSize: "contain"
      }
    };

    return (
      <div style={picStyles.picStyle}>
        <div style={picStyles.picImage} />
      </div>
    );
  };

  render() {
    return <div>{this.renderPic()}</div>;
  }
}

MessagePic.propTypes = {
  position: PropTypes.number.isRequired,
  noDelay: PropTypes.bool.isRequired
};

export default MessagePic;
