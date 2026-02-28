import "tailwindcss";
import "@mantine/core/styles.css";
import "@fontsource-variable/roboto-mono";
import "@fontsource-variable/inter";

import type { Preview } from "@storybook/react";
import { MantineProvider } from "@mantine/core";
import theme from "../src/theme";

const preview: Preview = {
  parameters: {
    darkMode: {
      /**
       * Placeholder for dark mode adjustment
       */
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (Story) => (
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <Story />
      </MantineProvider>
    ),
  ],
};

export default preview;
