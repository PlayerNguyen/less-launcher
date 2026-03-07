import {
  Tabs as MantineTabs,
  TabsProps as MantineTabsProps,
} from "@mantine/core";
import classes from "./index.module.css";

export type TabsProps = MantineTabsProps;

export default function Tabs({ children, ...props }: TabsProps) {
  return (
    <MantineTabs variant="unstyled" classNames={classes} {...props}>
      {children}
    </MantineTabs>
  );
}

Tabs.Tab = MantineTabs.Tab;
Tabs.Panel = MantineTabs.Panel;
Tabs.List = MantineTabs.List;
