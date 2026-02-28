import {
  ActionIcon,
  Center,
  Group,
  Stack,
  StackProps,
  StyleProp,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import {
  BiPlay,
  BiLeftArrow,
  BiRightArrow,
  BiCog,
  BiSun,
  BiMoon,
} from "react-icons/bi";
import SidebarGroupItem from "../SidebarGroupItem";
import useSidebarStore from "@src/stores/sidebar.store";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router";

export type SidebarProps = {
  wrapperProps?: StackProps;
};


export default function Sidebar({ wrapperProps }: SidebarProps) {
  const { isCompact } = useSidebarStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  const width: StyleProp<React.CSSProperties["width"]> = isCompact
    ? { base: "64px" }
    : { base: "30vw", lg: "20vw", xl: "15vw", xxl: "10vw" };

  const iconSize = isCompact ? "1.4rem" : "1.2rem";
  const menuItems = [
    {
      icon: <BiPlay size={iconSize} />,
      title: "Play",
      description: "Starts playing game",
      path: "/",
    },
    {
      icon: <BiCog size={iconSize} />,
      title: "Settings",
      description: "Launcher settings",
      path: "/settings",
    },
  ];

  const handleCollapseSidebar = () => {
    useSidebarStore.setState({ isCompact: !isCompact });
  };

  return (
    <Stack
      w={width}
      bg={"dark.9"}
      className={clsx(
        "sidebar-wrapper min-h-screen max-h-screen p-2",
        `transition-all ease-in-out duration-200`,
      )}
      gap={"sm"}
      {...wrapperProps}
    >
      {/* Brand text */}
      <Center ff={"monospace"}>
        <Text size="md" fw={"700"} c={"primary.4"}>
          Less
        </Text>
      </Center>
      {/* Top */}
      <Stack gap={"xs"}>
        {menuItems.map((item, index) => (
          <SidebarGroupItem
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            isCompact={isCompact}
          />
        ))}
      </Stack>

      {/* Bottom section */}
      <Stack gap={0} mt="auto">
        <Group className={clsx(`flex justify-end`)} gap={1}>
          <ActionIcon onClick={handleCollapseSidebar}>
            {!isCompact ? <BiLeftArrow /> : <BiRightArrow />}
          </ActionIcon>
          <ActionIcon onClick={toggleColorScheme}>
            {colorScheme === "dark" ? <BiSun /> : <BiMoon />}
          </ActionIcon>
        </Group>
      </Stack>
    </Stack>
  );
}
