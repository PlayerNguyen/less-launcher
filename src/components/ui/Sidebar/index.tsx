import { Group, Stack, StyleProp, useMantineColorScheme } from "@mantine/core";
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
import CustomizableButton from "../CustomizableButton";
import clsx from "clsx";

export type SidebarProps = {};

const menuItems = [
  {
    icon: <BiPlay size={"1.2rem"} />,
    title: "Play",
    description: "Starts playing game",
  },
  {
    icon: <BiCog size={"1.2rem"} />,
    title: "Settings",
    description: "Launcher settings",
  },
];

export default function Sidebar({}: SidebarProps) {
  const { isCompact } = useSidebarStore();
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const width: StyleProp<React.CSSProperties["width"]> = isCompact
    ? { base: "64px" }
    : { base: "30vw", lg: "20vw", xl: "15vw", xxl: "10vw" };

  const handleCollapseSidebar = () => {
    useSidebarStore.setState({ isCompact: !isCompact });
  };

  return (
    <Stack
      w={width}
      bd={"2px solid var(--mantine-color-primary-9)"}
      bg={"primary"}
      className="min-h-screen max-h-screen p-2"
      gap={0}
    >
      {/* Top */}
      <Stack gap={"0.1rem"}>
        {menuItems.map((item, index) => (
          <SidebarGroupItem
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </Stack>

      {/* Bottom section */}
      <Stack gap={0} mt="auto">
        <Group className={clsx(`flex justify-end`)} gap={1}>
          <CustomizableButton
            onClick={handleCollapseSidebar}
            icon={!isCompact ? <BiLeftArrow /> : <BiRightArrow />}
          />
          <CustomizableButton
            onClick={toggleColorScheme}
            icon={colorScheme === "dark" ? <BiSun /> : <BiMoon />}
          />
        </Group>
      </Stack>
    </Stack>
  );
}
