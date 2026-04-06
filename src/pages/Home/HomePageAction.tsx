import { ActionIcon, Menu, Tabs, Text } from "@mantine/core";
import { useModal } from "@src/configs/configureModals";
import useProfileStore from "@src/stores/ProfileStore";
import { useSelectedProfileStore } from "@src/stores/selected-profile.store";
import { useTranslation } from "react-i18next";
import { LuChevronDown, LuPlus } from "react-icons/lu";

export function HomePageAction() {
  const { t } = useTranslation();
  const { profiles } = useProfileStore();
  const { selectedProfileId, setSelectedProfileId } = useSelectedProfileStore();
  const { openModal } = useModal();

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

  // Get 4 latest profiles
  const latestProfiles = profiles.data?.slice(0, 4) ?? [];

  return (
    <Tabs
      variant="pills"
      value={selectedProfileId}
      onChange={(value) => value && setSelectedProfileId(value)}
    >
      <Tabs.List className="[-webkit-app-region:no-drag]">
        {/* Render latest profiles as tab pills */}
        {latestProfiles.map((profile) => (
          <Tabs.Tab key={profile.id} value={profile.id}>
            {profile.name}
          </Tabs.Tab>
        ))}

        {/* Action button with dropdown */}
        <Menu position="bottom-end" shadow="md">
          <Menu.Target>
            <ActionIcon radius="xl" variant="light" size="sm">
              <LuChevronDown size="1rem" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<LuPlus size="1rem" />}
              onClick={handleCreateProfile}
            >
              {t("home.create_new_profile")}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Tabs.List>
    </Tabs>
  );
}
