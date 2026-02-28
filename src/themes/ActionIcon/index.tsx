import { ActionIcon } from "@mantine/core";

export const ActionIconTheme = ActionIcon.extend({
  styles(theme) {
    return {
      root: {
        outline: 0,
        border: `2px solid ${theme.colors.primary[9]}`,
      },
      icon: {
        color: theme.colors.primary[2],
      },
    };
  },
});
