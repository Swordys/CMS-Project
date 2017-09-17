import React from 'react';
import { Emoji } from "emoji-mart";

const emojifyText = text => {
  const reggoEmoji = /(:[a-zA-Z0-9-_+]+:(:skin-tone-[2-6]:)?)/g;
  const filterSkin = /^(:skin-tone-[2-6]:)/;
  const textReturnArr = [];
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
        !filterSkin.test(item) && textReturnArr.push(item);
      }
    } else if (/\S/.test(item)) {
      textReturnArr.push(item);
    }
  }

  return {
    textReturnArr,
    IsOnlyEmojy: textReturnArr.every(e => e.key)
  };
};

export default emojifyText;
