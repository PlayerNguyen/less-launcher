import { Select, SelectProps } from "@mantine/core";
import useMinecraftVersionStore from "@src/stores/minecraft-version.store";
import { useEffect } from "react";

export type VersionSelectBoxProps = SelectProps;

/**
 * Represents SelectBox component for Vanilla Minecraft version.
 */
export function VersionSelectBox({
  onSelect,
  ...props
}: VersionSelectBoxProps) {
  const { versions, loadVersions } = useMinecraftVersionStore();

  /**
   * Loads if version is not loaded
   */
  useEffect(() => {
    if (!versions.data) {
      loadVersions();
    }
  }, [versions.data, loadVersions]);

  return (
    <Select
      disabled={versions.isLoading}
      label="Version"
      data={versions.data ?? []}
      {...props}
    />
  );
}
