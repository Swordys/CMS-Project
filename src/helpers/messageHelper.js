import React from "react";
import { Emoji } from "emoji-mart";
import emoticons from "emoticons";

const emojifyText = text => {
  const defenition = {
    smile: {
      title: ":slightly_smiling_face:",
      codes: [":)"]
    },
    laugh: {
      title: ":smile:",
      codes: [":D"]
    },
    sad: {
      title: ":white_frowning_face:",
      codes: [":("]
    },
    kiss: {
      title: ":kissing_smiling_eyes:",
      codes: [":*"]
    }
  };
  let processText = text;

  emoticons.define(defenition);

  processText = emoticons.replace(processText, (n, c, t) => t);

  const reggoEmoji = /(:[a-zA-Z0-9-_+]+:(:skin-tone-[2-6]:)?)/g;
  const filterSkin = /^(:skin-tone-[2-6]:)/;
  const textReturnArr = [];
  const textToArr = processText.split(reggoEmoji).filter(e => e);

  for (let i = 0; i < textToArr.length; i += 1) {
    const item = textToArr[i];
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
      } else if (!filterSkin.test(item)) {
        textReturnArr.push(item);
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
