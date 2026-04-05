import { Button, Text, ButtonProps, ElementProps } from "@mantine/core";
import clsx from "clsx";
import { ReactNode } from "react";

interface SidebarItemProps
  extends ButtonProps, ElementProps<"button", keyof ButtonProps> {
  label: string;
  icon: ReactNode;
  active?: boolean;
}

export function SidebarItem({
  label,
  icon,
  active,
  className,
  ...others
}: SidebarItemProps) {
  return (
    <Button
      size="compact-lg"
      leftSection={icon}
      variant={active ? "light" : "transparent"}
      justify="left"
      className={clsx(
        "transition-all duration-200 cubic-bezier(0.34, 1.56, 0.64, 1)",
        "hover:bg-(--brand-1)/10",
        "text-(--border-lighter)",
        { "text-(--brand-4)": active },
        className,
      )}
      {...others}
    >
      <Text size="sm" className={clsx({ "font-semibold": active })}>
        {label}
      </Text>
    </Button>
  );
}
