import { Emoji, emojiIndex } from "emoji-mart";
import emoticons from "emoticons";
import linkify from "linkify-it";
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
      meta: {},
      url: uniqArr[i].url
    });
  }
  const resultArr = await Promise.all(objArr.map(e => e.meta)).catch(err =>
    console.log(err)
  );
  const returnArr = [];

  if (resultArr)
    for (let m = 0; m < resultArr.length; m += 1) {
      if (
        resultArr[m].image &&
        resultArr[m].description &&
        resultArr[m].title
      ) {
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
      const link = {
        className: `message-item-link ${sender ? "message-item-link__out" : "message-item-link__in"}`,
        key: e.index,
        href: e.url,
        urlText: e.text
      };
      returnArr.push(text, link);
      indx = e.lastIndex;
      if (i === linkArr.length - 1) {
        const lastText = textProcess.substring(indx, textProcess.length);
        if (lastText) {
          returnArr.push(lastText);
        }
      }
    });

  return linkArr ? returnArr : [textInput];
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

  const rEmoji = /(:(?!skin-tone-[2-6])[a-zA-Z0-9-_+]+:(:skin-tone-[2-6]:)?)/g;
  const rSkin = /(^:skin-tone-[2-6]:$)/;
  const textToArr = newText
    .split(rEmoji)
    .filter(e => e)
    .filter(c => !c.match(rSkin) && c !== "");

  const processArray = [];
  for (let i = 0; i < textToArr.length; i += 1) {
    const arrayString = textToArr[i];
    if (arrayString.match(rEmoji)) {
      const itemText = arrayString
        .substring(1, arrayString.length - 1)
        .replace(/::skin-tone-[2-6]/, "");

      const searchRes = emojiIndex.search(itemText);

      const emojiPresent = searchRes.some(e => e.colons === `:${itemText}:`);

      // - Enable if we want to guess the unmatched words -
      // if (!emojiPresent && searchRes.length > 0) {
      //   arrayString = searchRes[0].colons;
      // }

      if (emojiPresent) {
        const emojiObj = Emoji({
          key: i,
          emoji: arrayString,
          size: 22,
          sheetSize: 32,
          set: "emojione"
        });
        const styleObj = emojiObj.props.children.props.style;
        const retEmoji = {
          src:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
          className: "inline-emoji",
          alt: arrayString,
          key: i,
          style: {
            backgroundImage: `${styleObj.backgroundImage}`,
            backgroundPosition: `${styleObj.backgroundPosition}`,
            backgroundSize: `${styleObj.backgroundSize}`
          }
        };
        processArray.push(retEmoji);
      } else {
        processArray.push(arrayString);
      }
    } else if (/\S/.test(arrayString)) {
      const newItem = linkifyText(arrayString, sender);
      processArray.push(...newItem);
    }
  }

  return {
    processArray,
    onlyEmojy: processArray.every(e => e.alt)
  };
};
