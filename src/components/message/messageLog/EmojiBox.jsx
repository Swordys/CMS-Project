import React from "react";
import { Picker } from "emoji-mart";
import { connect } from "react-redux";
import Transition from "react-transition-group/Transition";
import uuid from "uuid";

// Actions
import { sendEmoji } from "../../../actions/Actions.js";

// CSS
import "./css/emoji-mart.css";

const EmojiBox = props => {
  const { showEmoji, sendEmojicon } = props;

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
      onClick={(emoji, e) => {
        e.stopPropagation();
        console.log(emoji);
        let newMoji = emoji;
        newMoji.id = uuid();
        sendEmojicon(newMoji);
      }}
    />
  );

  return (
    <Transition in={showEmoji} timeout={duration}>
      {state => {
        return (
          <div
            className="emojiWrap"
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            {emojiValue}
          </div>
        );
      }}
    </Transition>
  );
};

const mapDispatchToProps = dispatch => ({
  sendEmojicon: emoji => {
    dispatch(sendEmoji(emoji));
  }
});

const mapStateToProps = state => ({
  showEmoji: state.getEmojiState
});

export default connect(mapStateToProps, mapDispatchToProps)(EmojiBox);
