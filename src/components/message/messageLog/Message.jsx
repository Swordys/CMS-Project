import React, { Component } from "react";
import { Emoji } from "emoji-mart";

class Message extends Component {
  renderText = () => {
    const { text } = this.props;

    let reggoEmoji = /(:[a-zA-Z0-9-_+]+:(:skin-tone-[2-6]:)?)/g;
    let textReturnArr = [];

    const textToArr = text.split(reggoEmoji).filter(e => e);

    for (let i = 0; i < textToArr.length; i++) {
      let item = textToArr[i];
      if (item.match(reggoEmoji)) {
        const emojiObj = Emoji({
          key: i,
          emoji: item,
          size: 22,
          set: "emojione"
        });
        if (emojiObj) {
          const styleObj = emojiObj.props.children.props.style;
          const retEmoji = (
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              className="inline-emoji"
              alt={item}
              key={i}
              style={{
                backgroundImage: `${styleObj.backgroundImage}`,
                backgroundPosition: `${styleObj.backgroundPosition}`,
                backgroundSize: `${styleObj.backgroundSize}`
              }}
            />
          );
          textReturnArr.push(retEmoji);
        } else {
          textReturnArr.push(item);
        }
      } else if (/\S/.test(item)) {
        console.log(item);
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
