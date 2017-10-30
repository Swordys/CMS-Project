import React from "react";
import { Emoji, emojiIndex } from "emoji-mart";
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

const metaResult = objArr => objArr;

export const getMetaData = async text => {
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
        const newObj = { ...e };
        uniqArr.push(newObj);
      }
    });

  for (let i = 0; i < uniqArr.length; i += 1) {
    objArr.push({
      meta: metascraper.scrapeUrl(uniqArr[i].url),
      url: uniqArr[i].url
    });
  }
  const resultArr = await Promise.all(objArr.map(e => e.meta));
  const returnArr = [];

  for (let m = 0; m < resultArr.length; m += 1) {
    if (resultArr[m].image && resultArr[m].description && resultArr[m].title) {
      const newRes = { ...resultArr[m] };
      newRes.id = uuid();
      newRes.inputUrl = objArr[m].url;
      returnArr.push(newRes);
    }
  }

  return metaResult(returnArr);
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

  const reggoEmoji = /(:(?!skin-tone-[2-6])[a-zA-Z0-9-_+]+:(:skin-tone-[2-6]:)?)/g;
  const reggoSkin = /(^:skin-tone-[2-6]:$)/;
  const textToArr = newText
    .split(reggoEmoji)
    .filter(e => e)
    .filter(c => !c.match(reggoSkin) && c !== "");

  const processArray = [];
  for (let i = 0; i < textToArr.length; i += 1) {
    const arraySring = textToArr[i];
    if (arraySring.match(reggoEmoji)) {
      const itemText = arraySring
        .substring(1, arraySring.length - 1)
        .replace(/::skin-tone-[2-6]/, "");

      const emojiPresent = emojiIndex
        .search(itemText)
        .some(e => e.colons === `:${itemText}:`);

      if (emojiPresent) {
        const emojiObj = Emoji({
          key: i,
          emoji: arraySring,
          size: 22,
          sheetSize: 32,
          set: "emojione"
        });
        const styleObj = emojiObj.props.children.props.style;
        const retEmoji = (
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            className="inline-emoji"
            alt={arraySring}
            key={i}
            style={{
              backgroundImage: `${styleObj.backgroundImage}`,
              backgroundPosition: `${styleObj.backgroundPosition}`,
              backgroundSize: `${styleObj.backgroundSize}`
            }}
          />
        );
        processArray.push(retEmoji);
      } else {
        processArray.push(arraySring);
      }
    } else if (/\S/.test(arraySring)) {
      const newItem = linkifyText(arraySring, sender);
      processArray.push(newItem);
    }
  }

  return {
    processArray,
    onlyEmojy: processArray.every(e => e.key)
  };
};
