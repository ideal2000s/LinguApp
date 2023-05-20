type tWord = {
  word: string;
  disabled: boolean;
};
import { checkString } from './checkString';

export const sentence2array = (sentence: string): Array<tWord> => {
  const pattern = new RegExp(/[A-Za-z0-9-]/);
  const characters = sentence.split('');
  const words: Array<tWord> = [];
  let tmpStr = characters[0];
  for (let i = 1; i < characters.length; i++) {
    if (pattern.test(characters[i - 1]) && pattern.test(characters[i])) {
      tmpStr += characters[i];
    } else if (pattern.test(characters[i - 1])) {
      words.push({
        word: tmpStr,
        // state: 0,
        disabled: !checkString(tmpStr)
      });
      words.push({
        word: characters[i],
        // state: 0,
        disabled: true
      });
      tmpStr = '';
    } else if (pattern.test(characters[i])) {
      tmpStr = characters[i];
    } else {
      words.push({
        word: characters[i],
        // state: 0,
        disabled: !checkString(characters[i])
      });
      tmpStr = '';
    }
  }
  return words;
};
