import React from "react";
import ProptTypes from "prop-types";
import { connect } from "react-redux";
// Actions
import { toggleEmoji } from "../../../../actions/Actions";

const MessageSendSmile = props => (
  <div
    role="presentation"
    onClick={() => props.toggleEmoji()}
    className="message-send-field"
  >
    {}
  </div>
);

MessageSendSmile.propTypes = {
  toggleEmoji: ProptTypes.func.isRequired
};

export default connect(
  null,
  { toggleEmoji }
)(MessageSendSmile);
