import { Divider, Text } from "@mantine/core";
import clsx from "clsx";

export type SidebarGroupDividerProps = {
  label?: string;
};

export function SidebarGroupDivider({ label }: SidebarGroupDividerProps) {
  return (
    <span className={clsx(`sidebar-divider flex items-center gap-3`)}>
      {label && (
        <Text
          size="xs"
          fw={"bolder"}
          c={"var(--border-primary)"}
          tt={"uppercase"}
        >
          {label}
        </Text>
      )}
      <Divider className="flex-1" />
    </span>
  );
}
