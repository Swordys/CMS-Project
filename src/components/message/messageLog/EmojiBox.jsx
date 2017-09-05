import React from "react";
import { Picker } from "emoji-mart";
import { connect } from "react-redux";
// CSS
import "./css/emoji-mart.css";

const EmojiBox = props => {
  const { showEmoji } = props;
  let retVal = null;
  if (showEmoji) {
    retVal = (
      <div className="emojiWrap">
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
      </div>
    );
  }
  return retVal;
};

const mapStateToProps = state => ({
  showEmoji: state.getEmojiState
});

export default connect(mapStateToProps)(EmojiBox);
