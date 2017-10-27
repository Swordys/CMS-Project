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
      }, 250);
  }

  renderPic = () => {
    const { sender } = this.props;
    const picStyles = {
      picStyle: {
        height: "35px",
        width: "35px",
        opacity: `${this.state.opacity}`,
        borderRadius: "50%",
        background: "white",
        position: "absolute",
        [sender ? "right" : "left"]: "-45px",
        bottom: "0",
        transition: "opacity 200ms cubic-bezier(.67,.35,.34,.91)",
        overflow: "hidden"
      },
      picImage: {
        backgroundImage: "url(https://picsum.photos/100)",
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
  noDelay: PropTypes.bool.isRequired,
  sender: PropTypes.bool.isRequired
};

export default MessagePic;
