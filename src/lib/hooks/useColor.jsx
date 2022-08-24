// import { useTheme } from 'styled-components';
import { theme as defaultTheme } from '../theme';

export const useColor = () => {
  const theme = defaultTheme.default;

  const makeColor = ({ themeColor, isDisabled }) => {
    /**
     * Color codes regular expression
     * https://regexr.com/39cgj
     */
    const colorRegex = new RegExp(/(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^)]*\)/);
    const isValidColorCode = colorRegex.test(themeColor?.toLocaleLowerCase());
    const madeColor = isValidColorCode
      ? themeColor
      : (theme.color[themeColor] || theme.color.primary);
    return isDisabled
      ? theme.color.disable
      : madeColor;
  };

  return {
    makeColor,
  };
};

export default { useColor };
