import { ReactElement } from "react";
import { Flex, Stack, Text, UnstyledButton } from "@mantine/core";
import { useHover } from "@mantine/hooks";

interface SidebarGroupItemProps {
  title: string;
  description: string;
  icon?: ReactElement;
  onClick?: () => void;
  active?: boolean;
  isCompact?: boolean;
}

export default function SidebarGroupItem({
  title,
  description,
  icon,
  onClick,
  active = false,
  isCompact = false,
}: SidebarGroupItemProps) {
  const { hovered, ref } = useHover();
  return (
    <UnstyledButton
      ref={ref}
      onClick={onClick}
      ff={"monospace"}
      styles={{
        root: {
          color:
            "light-dark(var(--mantine-color-primary-4), var(--mantine-color-primary-2))",
          alignContent: isCompact ? "center" : "start",
          padding: isCompact ? "0.3rem" : "1rem",
          fontWeight: 300,
          outline: 0,
          background: active
            ? hovered
              ? "var(--mantine-color-primary-8)"
              : "var(--mantine-color-primary-9)"
            : hovered
              ? "light-dark(var(--mantine-color-dark-7), var(--mantine-color-dark-8)"
              : "transparent",
          border: active ? "2px solid var(--mantine-color-primary-7)" : "none",
        },
      }}
    >
      <Flex
        gap={"lg"}
        align={"center"}
        justify={isCompact ? "center" : "start"}
      >
        {icon}
        {!isCompact ? (
          <Stack gap={"xs"}>
            <Text fw={"500"} size="1rem">
              {title}
            </Text>
            <Text size="0.8rem" fw={"300"} c={"dimmed"}>
              {description}
            </Text>
          </Stack>
        ) : undefined}
      </Flex>
    </UnstyledButton>
  );
}
