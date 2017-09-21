import React from "react";
import ProptTypes from "prop-types";
import { connect } from "react-redux";
import { Emoji } from "emoji-mart";

// Actions
import { toggleEmoji } from "../../../actions/Actions";

const MessageSendSmile = props => {
  const { toggleEmojiWrap } = props;
  return (
    <div
      role="presentation"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      onClick={() => toggleEmojiWrap()}
      className="sendThatSmile"
    >
      <Emoji emoji="smile" size={22} set="emojione" />
    </div>
  );
};

MessageSendSmile.propTypes = {
  toggleEmojiWrap: ProptTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  toggleEmojiWrap: () => {
    dispatch(toggleEmoji());
  }
});

export default connect(null, mapDispatchToProps)(MessageSendSmile);
