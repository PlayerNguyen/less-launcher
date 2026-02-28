import { ComboboxItem, Select, SelectProps } from "@mantine/core";
import useMinecraftVersionStore from "@src/stores/minecraft-version.store";
import { settingStore } from "@src/stores/settings.store";
import { useEffect } from "react";

export interface VersionSelectBox extends SelectProps {}

export default function VersionSelectBox({ ...props }: VersionSelectBox) {
  const { versions, loadVersions } = useMinecraftVersionStore();
  const { lastPlayedVersion } = settingStore.getState();

  useEffect(() => {
    if (!versions) {
      loadVersions();
    }
  }, [versions]);

  const handleSelect = (_: string | null, option: ComboboxItem | null) => {
    settingStore.setState({ lastPlayedVersion: option ?? undefined });
  };

  return (
    <Select
      label="Version"
      data={versions ?? []}
      value={lastPlayedVersion?.value ?? undefined}
      onChange={handleSelect}
      {...props}
    />
  );
}
