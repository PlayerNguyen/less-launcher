import { Divider, Flex, Stack, StackProps } from "@mantine/core";
import { BiCog } from "react-icons/bi";
import { LuDock } from "react-icons/lu";
import useSidebarStore from "@src/stores/sidebar.store";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router";
import { SidebarItem } from "./components/Item";
import { SidebarGroupDivider } from "./components/SidebarGroupDivider";
import { SidebarProfileSection } from "./components/SidebarProfileSection";
import { useTranslation } from "react-i18next";

export type SidebarProps = {
  wrapperProps?: StackProps;
  className?: string;
};

export default function Sidebar({ wrapperProps, className }: SidebarProps) {
  const { t } = useTranslation();
  const { isCompact } = useSidebarStore();
  const navigate = useNavigate();
  const location = useLocation();
  // const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  const iconSize = isCompact ? "1.4em" : "1rem";
  const menuItems = [
    {
      icon: <LuDock size={iconSize} />,
      title: t("sidebar.home"),
      path: "/",
    },
    {
      icon: <BiCog size={iconSize} />,
      title: t("sidebar.settings"),
      description: "Launcher settings",
      path: "/settings",
    },
  ];

  return (
    <Stack
      gap={"sm"}
      className={clsx(
        "sidebar-wrapper",
        `transition-[width] ease-in-out duration-300 px-4`,
        className,
      )}
      {...wrapperProps}
    >
      <div className="sidebar-block flex flex-col gap-2 flex-1">
        <SidebarGroupDivider label="launcher" />
        {menuItems.map((item) => {
          return (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.title}
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            />
          );
        })}
      </div>

      <Flex className="sidebar-block mb-8" gap={"sm"} direction={"column"}>
        <Divider />
        <SidebarProfileSection />
      </Flex>
    </Stack>
  );
}
