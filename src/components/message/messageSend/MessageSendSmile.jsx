import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleEmoji } from "../../../actions/Actions.js";
import { Emoji } from "emoji-mart";

class MessageSendSmile extends Component {
  render() {
    const { toggleThat } = this.props;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        onClick={() => toggleThat()}
        className="sendThatSmile"
      >
        <Emoji emoji="smile" size={22} set="emojione" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  toggleThat: () => {
    dispatch(toggleEmoji());
  }
});

export default connect(null, mapDispatchToProps)(MessageSendSmile);
