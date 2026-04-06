import { ActionIcon, Menu, Stack, Text } from "@mantine/core";
import { useModal } from "@src/configs/configureModals";
import useProfileStore from "@src/stores/ProfileStore";
import { useTranslation } from "react-i18next";
import { LuChevronDown, LuPlus } from "react-icons/lu";

export function HomePageActionMenu() {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const { profiles } = useProfileStore();

  const handleCreateProfile = () => {
    openModal({
      modal: "changeModal",
      innerProps: {},
      modalOptions: {
        centered: true,
        title: <Text>{t("home.create_new_profile")}</Text>,
      },
    });
  };

  const latestProfiles = profiles.data?.slice(0, 2) ?? [];

  return (
    <Menu
      position="bottom-end"
      shadow="md"
      transitionProps={{ duration: 180, transition: "pop-top-right" }}
    >
      <Menu.Target>
        <ActionIcon
          radius="xl"
          variant="transparent"
          size="sm"
          className={`hover:bg-(--brand-6)/20 hover:text-(--brand-9))`}
        >
          <LuChevronDown size="1rem" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {/* Render latest profiles as dropdown items */}
        {latestProfiles.map((profile) => (
          <Menu.Item key={profile.id} value={profile.id}>
            <Stack gap={0}>
              <Text size="sm" fw={"bold"}>
                {profile.name}
              </Text>
              <Text size="xs">{profile.version}</Text>
            </Stack>
          </Menu.Item>
        ))}

        {/* Action button with dropdown */}
        <Menu.Label>{t("home.actions")}</Menu.Label>
        <Menu.Item
          leftSection={<LuPlus size="1rem" />}
          onClick={handleCreateProfile}
        >
          {t("home.create_new_profile")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
