import { Button } from "@mantine/core";

export const ButtonTheme = Button.extend({
  styles: {
    label: {
      fontWeight: 400,
      fontFamily: "var(--mantine-font-family-monospace)",
      fontSize: "0.8rem",
    },
    root: {
      outline: 0,
      borderRadius: 0,
    },
  },
  vars: (theme, props) => {
    const color = props.color || theme.primaryColor;
    const defaultRoot = {
      "--button-bd": `${props.bd || `2px`} solid light-dark(var(--mantine-color-${color}-9), var(--mantine-color-${color}-4))`,
    };

    if (props.variant === "gradient") {
      return {
        root: {
          ...defaultRoot,
        },
      };
    }

    if (props.variant === "outline") {
      return {
        root: {
          "--button-bg": "transparent",
        },
      };
    }

    return {
      root: {
        "--button-bg": `light-dark(var(--mantine-color-${color}-1), var(--mantine-color-${color}-9))`,
        "--button-color": `light-dark(var(--mantine-color-${color}-9), var(--mantine-color-white))`,
        "--button-hover": `light-dark(var(--mantine-color-${color}-2), var(--mantine-color-${color}-8))`,
        ...defaultRoot,
      },
    };
  },
});
