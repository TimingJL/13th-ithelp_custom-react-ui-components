import { COLOR } from '../theme';

export const makeColor = (themeColor) => {
  /**
   * Color codes regular expression
   * https://regexr.com/39cgj
   */
  const colorRegex = new RegExp(/(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^)]*\)/);
  const isValidColorCode = colorRegex.test(themeColor.toLocaleLowerCase());
  return isValidColorCode ? themeColor : (COLOR[themeColor] || COLOR.primary);
};

export default {
  makeColor,
};
