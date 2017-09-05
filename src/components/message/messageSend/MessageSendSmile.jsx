import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleEmoji } from "../../../actions/Actions.js";

class MessageSendSmile extends Component {
  render() {
    const { toggleThat } = this.props;
    return <div onClick={() => toggleThat()} className="sendThatSmile" />;
  }
}

const mapDispatchToProps = dispatch => ({
  toggleThat: () => {
    dispatch(toggleEmoji());
  }
});

export default connect(null, mapDispatchToProps)(MessageSendSmile);
