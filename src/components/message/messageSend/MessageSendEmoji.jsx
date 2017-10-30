import React from "react";
import ProptTypes from "prop-types";
import { connect } from "react-redux";
import emojiIcon from "../../../icons/sendSmile.svg";
// Actions
import { toggleEmoji } from "../../../actions/Actions";

const MessageSendSmile = props => (
  <div
    onKeyUp={e => e}
    role="presentation"
    onClick={() => props.toggleEmoji()}
    className="messageSendField"
  >
    <div className="messageSendField_content">
      <img src={emojiIcon} alt="" />
    </div>
  </div>
);

MessageSendSmile.propTypes = {
  toggleEmoji: ProptTypes.func.isRequired
};

export default connect(null, { toggleEmoji })(MessageSendSmile);
