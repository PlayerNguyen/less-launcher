import {
  UnstyledButton,
  Stack,
  Text,
  Title,
  MantineTheme,
} from "@mantine/core";
import { ReactElement } from "react";
import ContentWrapper from "../ContentWrapper";

interface CustomizableButtonProps {
  title?: string;
  description?: string;
  icon?: ReactElement;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "success";
}

export default function CustomizableButton({
  title,
  description,
  icon,
  onClick,
  className,
  variant = "primary",
}: CustomizableButtonProps) {
  const getTextColor = (theme: MantineTheme) => {
    const colors = {
      primary: theme.colors.primary[1],
      secondary: theme.colors.gray[1],
      danger: theme.colors.red[1],
      success: theme.colors.green[1],
    };
    return colors[variant];
  };

  return (
    <ContentWrapper variant={variant}>
      <UnstyledButton
        role="button"
        tabIndex={1}
        style={(theme) => ({
          padding: "0.6rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          userSelect: "none",
          outline: "none",
          color: getTextColor(theme),
          width: "100%",
          boxShadow: `0 0 0 0 ${theme.colors.primary[9]}`,
          transition: "box-shadow 0.15s ease-in-out",
          "&:hover": {
            boxShadow: `0 2px 8px ${theme.colors.primary[9]}`,
          },
          "&:focus": {
            boxShadow: `0 2px 8px ${theme.colors.primary[9]}`,
          },
        })}
        className={className}
        onClick={onClick}
      >
        {icon && icon}
        {title || description ? (
          <Stack gap={0}>
            {title && <Title order={6}>{title}</Title>}
            {description && <Text size="xs">{description}</Text>}
          </Stack>
        ) : null}
      </UnstyledButton>
    </ContentWrapper>
  );
}
