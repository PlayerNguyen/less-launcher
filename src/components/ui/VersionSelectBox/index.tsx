import { ComboboxItem, Select, SelectProps } from "@mantine/core";
import useMinecraftVersionStore from "@src/stores/minecraft-version.store";
import { useSettingStore } from "@src/stores/settings.store";
import { useEffect } from "react";

export interface VersionSelectBox extends SelectProps {}

export default function VersionSelectBox({ ...props }: VersionSelectBox) {
  const { versions, loadVersions } = useMinecraftVersionStore();
  const { lastPlayedVersion, setLastPlayedVersion } = useSettingStore();

  useEffect(() => {
    if (!versions) {
      loadVersions();
    }
  }, [versions, loadVersions]);

  const handleSelect = (_: string | null, option: ComboboxItem | null) => {
    setLastPlayedVersion(option);
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
