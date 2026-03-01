import { createTheme } from "@mantine/core";
import { ButtonTheme } from "./themes/Button";
import { ActionIconTheme } from "./themes/ActionIcon";

const theme = createTheme({
  /**
   * Mantine themes
   */
  fontFamily: "'Inter Variable', sans-serif",
  fontFamilyMonospace: "'Roboto Mono Variable', monospace",
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
    primaryLight: [
      "#f3f3fb",
      "#e1e1e6",
      "#c9c9cf",
      "#ababb5",
      "#92929f",
      "#828191",
      "#79798c",
      "#67677a",
      "#5c5c6e",
      "#4e4e63",
    ],
    success: [
      "#eafbec",
      "#dcf0de",
      "#bbdebf",
      "#97cc9d",
      "#7bbd82",
      "#65b26d",
      "#5aad63",
      "#499852",
      "#3e8747",
      "#30753a",
    ],
    danger: [
      "#ffedee",
      "#f6dcdc",
      "#e3b8b8",
      "#d29292",
      "#c37171",
      "#ba5c5c",
      "#b85454",
      "#a14242",
      "#91393a",
      "#802e30",
    ],
    warning: [
      "#fbf8e7",
      "#f2efd9",
      "#e2ddb7",
      "#d2ca92",
      "#c4ba72",
      "#bbb05d",
      "#b8ac54",
      "#a09541",
      "#8f8437",
      "#7b7229",
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
  defaultRadius: 0,
  luminanceThreshold: 0.23,
  components: {
    Button: ButtonTheme,
    ActionIcon: ActionIconTheme,
  },
});

export default theme;
