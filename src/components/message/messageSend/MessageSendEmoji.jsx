import React from "react";
import ProptTypes from "prop-types";
import { connect } from "react-redux";
import emojiIcon from "../../../icons/sendSmile.svg";
// Actions
import { toggleEmoji } from "../../../actions/Actions";

const MessageSendSmile = props => (
  <div
    role="presentation"
    onClick={() => props.toggleEmoji()}
    className="messageSendSmile"
  >
    <img className='messageSendSmile_icon' src={emojiIcon} alt="" />
  </div>
);

MessageSendSmile.propTypes = {
  toggleEmoji: ProptTypes.func.isRequired
};

export default connect(null, { toggleEmoji })(MessageSendSmile);
