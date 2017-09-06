import React from "react";
import { Picker } from "emoji-mart";
import { connect } from "react-redux";
import Transition from "react-transition-group/Transition";
// CSS
import "./css/emoji-mart.css";

const EmojiBox = props => {
  const { showEmoji } = props;

  const duration = 200;

  const defaultStyle = {
    transition: `all ${duration}ms ease-out`,
    opacity: 0,
    transform: "scale(0.8)",
    zIndex: -500
  };

  const transitionStyles = {
    entering: {
      opacity: 1,
      transform: "scale(1)",
      zIndex: "auto"
    },
    entered: {
      opacity: 1,
      transform: "scale(1)",
      zIndex: "auto"
    }
  };

  const emojiValue = (
    <Picker
      set="emojione"
      exclude={["recent"]}
      emojiSize={23}
      perLine={8}
      title={""}
      color={"rgba(0, 91, 234, 0.9)"}
      onClick={(emoji, e) => {
        console.log(emoji);
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

const mapStateToProps = state => ({
  showEmoji: state.getEmojiState
});

export default connect(mapStateToProps)(EmojiBox);
