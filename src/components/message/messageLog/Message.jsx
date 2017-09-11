import React, { Component } from "react";
import { Emoji } from "emoji-mart";

class Message extends Component {
  renderText = () => {
    const { text } = this.props;

    let reggoAll = /(:[a-zA-Z0-9-_+]+:(:skin-tone-[2-6]:)?)|(\s+)|\w+/g;
    let reggoEmoji = /(:[a-zA-Z0-9-_+]+:(:skin-tone-[2-6]:)?)/g;
    let textReturnArr = [];

    // FIX THE REGULAR SMILES :D :) :( AND ON

    const textToArr = text.match(reggoAll);
    for (let i = 0; i < textToArr.length; i++) {
      let item = textToArr[i];

      if (item.match(reggoEmoji)) {
        const emojiObj = Emoji({
          key: i,
          emoji: item,
          size: 22,
          set: "emojione"
        }).props.children.props.style;

        const retEmoji = (
          <div
            className="inline-emoji"
            key={i}
            style={{
              backgroundImage: `${emojiObj.backgroundImage}`,
              backgroundPosition: `${emojiObj.backgroundPosition}`,
              backgroundSize: `${emojiObj.backgroundSize}`
            }}
          />
        );

        textReturnArr.push(retEmoji);
      } else {
        textReturnArr.push(item);
      }
    }

    const IsOnlyEmojy = textReturnArr.every(e => e.key);

    let msgClass = "messageBoxText";
    let textClass = "textContain";
    if (IsOnlyEmojy) {
      msgClass = "messageBoxEmoji";
      textClass = "textContainEmoji";
    }

    return (
      <div className={msgClass}>
        <div
          style={{
            whiteSpace: "pre-wrap",
            fontSize: "14px",
            wordBreak: "break-word"
          }}
        >
          <div className={textClass}>{textReturnArr}</div>
        </div>
      </div>
    );
  };

  render() {
    return <div className="messageBoxWrap">{this.renderText()}</div>;
  }
}

export default Message;
