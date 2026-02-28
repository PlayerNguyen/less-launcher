import { createTheme } from "@mantine/core";

const theme = createTheme({
  /**
   * Mantine themes
   */
  fontFamily: "'Roboto Mono Variable', monospace",
  colors: {
    primary: [
      "#f1f1ff",
      "#e0dff2",
      "#bfbdde",
      "#9b98ca",
      "#7d79b9",
      "#6a66af",
      "#605cac",
      "#504c97",
      "#464388",
      "#3b3979",
    ],
    deepGreen: [
      "#eafbf3",
      "#ddf0e7",
      "#bddece",
      "#9acbb4",
      "#7cbb9d",
      "#69b18f",
      "#5dac87",
      "#4c9774",
      "#408766",
      "#2f7556",
    ],
  },
  focusRing: "always",
  cursorType: "pointer",
  primaryColor: "primary",
  defaultRadius: "xs",
  luminanceThreshold: 0.23,
});

export default theme;
