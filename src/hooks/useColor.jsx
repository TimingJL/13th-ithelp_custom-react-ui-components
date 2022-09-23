import { useTheme } from 'styled-components';

export const useColor = () => {
  const theme = useTheme();

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
