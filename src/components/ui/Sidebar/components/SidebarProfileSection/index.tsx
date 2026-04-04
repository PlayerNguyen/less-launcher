import {
  Avatar,
  Flex,
  Menu,
  Popover,
  Text,
  UnstyledButton,
} from "@mantine/core";
import clsx from "clsx";

export function SidebarProfileSection() {
  return (
    <Menu
      arrowOffset={4}
      transitionProps={{ transition: "slide-up", duration: 180 }}
    >
      <Menu.Target>
        <UnstyledButton
          component="div"
          variant="transparent"
          className={clsx(
            `flex flex-row p-2 active`,
            "border border-(--border-darker) rounded-2xl p-2 gap-3 justify-start items-center shadow-md",
          )}
        >
          <Avatar name={"Less Launcher"} />
          <Flex direction={"column"}>
            <Text fw={"bold"}>Player_Name</Text>
          </Flex>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown w={"200"}>
        <Menu.Label>Update new case</Menu.Label>
        <Menu.Item>Hi</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
