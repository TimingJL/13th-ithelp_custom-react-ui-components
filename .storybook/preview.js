import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/index.js';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme.default}>
      <Story />
    </ThemeProvider>
  ),
];
