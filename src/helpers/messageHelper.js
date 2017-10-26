import React from "react";
import { Emoji } from "emoji-mart";
import emoticons from "emoticons";
import linkify from "linkify-it";
import metascraper from "metascraper";
import uuid from "uuid";

export const updateMessage = (state, urlObj) => {
  let indx = 0;
  const item = state.find((e, i) => {
    indx = i;
    return e.id === urlObj.id;
  });
  if (item) {
    const newItem = { ...item };
    newItem.urlMeta = urlObj.urlMeta;
    const newState = [...state];
    newState[indx] = newItem;
    return newState;
  }
  return state;
};

export const getMetaData = text => {
  const objArr = [];
  const uniqArr = [];
  const uniqObj = {};
  const linkArr = linkify()
    .set({ fuzzyLink: false })
    .match(text);
  if (linkArr)
    linkArr.forEach(e => {
      if (!uniqObj[e.text]) {
        uniqObj[e.text] = e.text;
        uniqArr.push(e);
      }
    });
  return new Promise((resolve, reject) => {
    if (uniqArr) {
      uniqArr.forEach((e, i) => {
        metascraper.scrapeUrl(e.url).then(res => {
          if (res.image && res.description && res.title) {
            const newRes = { ...res };
            newRes.id = uuid();
            newRes.inputUrl = e.url;
            objArr.push(newRes);
          }
          if (i === uniqArr.length - 1) {
            resolve(objArr);
          } else if (objArr.length === 0) {
            reject();
          }
        });
      });
    } else {
      reject();
    }
  });
};

export const linkifyText = (textInput, sender) => {
  const textProcess = textInput;
  const linkArr = linkify()
    .set({ fuzzyLink: false })
    .match(textProcess);
  const returnArr = [];
  let indx = 0;
  if (linkArr)
    linkArr.forEach((e, i) => {
      const text = textProcess.substring(indx, e.index);
      const link = (
        <a
          className={`messageItemLink ${sender ? "outbox_link" : "inbox_link"}`}
          key={e.index}
          href={`${e.url}`}
        >
          {e.text}
        </a>
      );
      returnArr.push(text, link);
      indx = e.lastIndex;
      if (i === linkArr.length - 1) {
        const lastText = textProcess.substring(indx, textProcess.length);
        returnArr.push(lastText);
      }
    });

  return linkArr ? returnArr : textInput;
};

export const processText = (text, sender) => {
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

  let newText = text;
  emoticons.define(defenition);

  newText = emoticons.replace(newText, (n, c, t) => t);

  const reggoEmoji = /(:[a-zA-Z0-9-_+]+:(:skin-tone-[2-6]:)?)/g;
  const filterSkin = /^(:skin-tone-[2-6]:)/;
  const textToArr = newText.split(reggoEmoji).filter(e => e);
  const textArr = [];

  for (let i = 0; i < textToArr.length; i += 1) {
    const item = textToArr[i];
    if (item.match(reggoEmoji)) {
      const emojiObj = Emoji({
        key: i,
        emoji: item,
        size: 22,
        sheetSize: 32,
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
        textArr.push(retEmoji);
      } else if (!filterSkin.test(item)) {
        textArr.push(item);
      }
    } else if (/\S/.test(item)) {
      const newItem = linkifyText(item, sender);
      textArr.push(newItem);
    }
  }

  return {
    textArr,
    onlyEmojy: textArr.every(e => e.key)
  };
};
