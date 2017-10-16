import React from "react";
import ProptTypes from "prop-types";
import { connect } from "react-redux";
import { Emoji } from "emoji-mart";

// Actions
import { toggleEmoji } from "../../../actions/Actions";

const MessageSendSmile = (props) => (
    <div
      role="presentation"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      onClick={() => props.toggleEmoji()}
      className="sendThatSmile"
    >
      {<Emoji emoji="smile" size={22} set="emojione" />}
    </div>
  );

MessageSendSmile.propTypes = {
  toggleEmoji: ProptTypes.func.isRequired
};


export default connect(null, {toggleEmoji})(MessageSendSmile);
