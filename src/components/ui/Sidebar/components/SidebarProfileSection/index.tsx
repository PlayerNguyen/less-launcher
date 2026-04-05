import { Avatar, Flex, Menu, Text, UnstyledButton } from "@mantine/core";
import { useSettingStore } from "@src/stores/settings.store";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { LuPen } from "react-icons/lu";

export function SidebarProfileSection() {
  const { lastPlayedVersion, lastUsername } = useSettingStore();
  const { t } = useTranslation();
  return (
    <Menu offset={12} transitionProps={{ transition: "pop", duration: 180 }}>
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
            <Text fw={"300"}>{lastUsername ?? "Unknown player"}</Text>
            <Text fw={"bolder"} size="xs">
              {lastPlayedVersion?.value ?? "-"}
            </Text>
          </Flex>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown w={"200"}>
        <Menu.Label>{t("sidebar.profile")}</Menu.Label>
        <Menu.Item leftSection={<LuPen />}>
          {t("sidebar.change_username")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
