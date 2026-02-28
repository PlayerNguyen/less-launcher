import { Box, MantineStyleProp, MantineTheme } from "@mantine/core";
import { ReactNode } from "react";

export type ContentWrapperProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  customStyle?: MantineStyleProp;
};

export default function ContentWrapper({
  children,
  customStyle,
  variant = "primary",
}: ContentWrapperProps) {
  const getVariantStyles = (theme: MantineTheme) => {
    const variants = {
      primary: {
        backgroundColor: theme.colors.primary[6],
        borderColor: theme.colors.primary[9],
        "&:hover": {
          backgroundColor: theme.colors.primary[9],
          borderColor: theme.colors.primary[4],
        },
        "&:focus": {
          backgroundColor: theme.colors.primary[9],
          borderColor: theme.colors.primary[4],
        },
      },
      secondary: {
        backgroundColor: theme.colors.gray[6],
        borderColor: theme.colors.gray[8],
        "&:hover": {
          backgroundColor: theme.colors.gray[8],
          borderColor: theme.colors.gray[4],
        },
        "&:focus": {
          backgroundColor: theme.colors.gray[8],
          borderColor: theme.colors.gray[4],
        },
      },
      danger: {
        backgroundColor: theme.colors.red[6],
        borderColor: theme.colors.red[8],
        "&:hover": {
          backgroundColor: theme.colors.red[8],
          borderColor: theme.colors.red[4],
        },
        "&:focus": {
          backgroundColor: theme.colors.red[8],
          borderColor: theme.colors.red[4],
        },
      },
      success: {
        backgroundColor: theme.colors.deepGreen[6],
        borderColor: theme.colors.deepGreen[8],
        "&:hover": {
          backgroundColor: theme.colors.deepGreen[8],
          borderColor: theme.colors.deepGreen[4],
        },
        "&:focus": {
          backgroundColor: theme.colors.deepGreen[8],
          borderColor: theme.colors.deepGreen[4],
        },
      },
    };
    return variants[variant];
  };

  return (
    <Box
      style={(theme: MantineTheme) => ({
        border: `2px solid`,
        borderRadius: 0,
        ...getVariantStyles(theme),
        ...customStyle,
      })}
    >
      {children}
    </Box>
  );
}
