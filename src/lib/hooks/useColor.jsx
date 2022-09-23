import { theme as defaultTheme } from '../theme';

export const useColor = () => {
  const theme = defaultTheme.default;

  const makeColor = ({ themeColor, isDisabled }) => {
    const madeColor = theme.color[themeColor] || themeColor;
    return isDisabled
      ? theme.color.disable
      : madeColor;
  };

  return {
    makeColor,
  };
};

export default { useColor };
