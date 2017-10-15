import React from "react";
import PropTypes from "prop-types";
import { Picker } from "emoji-mart";
import { connect } from "react-redux";
import Transition from "react-transition-group/Transition";
import uuid from "uuid";

// CSS
import "./css/emoji-mart.css";

// Actions
import { sendEmoji } from "../../../actions/Actions";

const EmojiBox = (props) => {
  const duration = 200;

  const defaultStyle = {
    transition: `z-index ${duration}ms step-end, opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    opacity: 0,
    transform: "scale(0.8)",
    zIndex: -500
  };

  const transitionStyles = {
    entering: {
      transition: `z-index ${duration}ms step-start, opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      opacity: 1,
      transform: "scale(1)",
      zIndex: "2000"
    },
    entered: {
      transition: `z-index ${duration}ms step-start, opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      opacity: 1,
      transform: "scale(1)",
      zIndex: "2000"
    }
  };

  const emojiValue = (
    <Picker
      set="emojione"
      exclude={["recent", "activity", "objects", "flags", "places", "custom"]}
      emojiSize={23}
      perLine={8}
      title={""}
      sheetSize={32}
      color={"rgba(0, 91, 234, 0.9)"}
      onClick={emoji => {
        const newMoji = emoji;
        newMoji.id = uuid();
        props.sendEmoji(newMoji);
      }}
    />
  );

  return (
    <Transition in={props.showEmoji} timeout={duration}>
      {state => (
        <div
          role="presentation"
          onClick={e => e.stopPropagation()}
          className="emojiWrap"
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          {emojiValue}
        </div>
      )}
    </Transition>
  );
};

EmojiBox.propTypes = {
  showEmoji: PropTypes.bool.isRequired,
  sendEmoji: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  showEmoji: state.getEmojiState
});

export default connect(mapStateToProps, {sendEmoji})(EmojiBox);
