import {
  ActionIcon,
  Button,
  Divider,
  Grid,
  Group,
  SegmentedControl,
  TextInput,
} from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { AppGenerators } from "@src/configs/configureGenerator";
import { GenericModalProps } from "@src/libs/modals-manager/type";
import { useTranslation } from "react-i18next";
import { LuDice6, LuPlus } from "react-icons/lu";
import { VersionSelectBox } from "@src/components/ui/VersionSelectBox";
import { createChangeProfileModalFormValuesSchema } from "./schema";
import { ProfileItem } from "@packages/profile/config";
import { ProfileGameType } from "@packages/profile/enum";
import { ipcRenderer } from "electron";

export type ChangeProfileModalProps = GenericModalProps<{
  profileId?: string;
}>;

type ChangeProfileModalFormValues = {
  name: string;
  version: string;
};

export function ChangeProfileModal({
  context,
  innerProps: { profileId },
}: ChangeProfileModalProps) {
  const { t } = useTranslation();
  const form = useForm<ChangeProfileModalFormValues>({
    initialValues: {
      name: "",
      version: "",
    },
    validate: schemaResolver(createChangeProfileModalFormValuesSchema(t)),
  });

  const handleSetRandomName = () => {
    form.setFieldValue("name", AppGenerators.profileNameGenerators.generate());
  };

  const handleFormSubmit = async (values: ChangeProfileModalFormValues) => {
    // Create object
    const profileItem: ProfileItem = {
      id: "abxc",
      name: values.name,
      version: values.version,
      type: ProfileGameType.VANILLA,
      order: 0, // todo - re-organize
    };
    await window.ipcRenderer.invoke("app:create-profile", profileItem);
    context.closeModal();
  };

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Grid>
        {/* Image */}
        <Grid.Col span={6}></Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label={t("change_profile_modal.name")}
            rightSection={
              <ActionIcon onClick={handleSetRandomName}>
                <LuDice6 />
              </ActionIcon>
            }
            {...form.getInputProps("name")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Divider />
        </Grid.Col>
        <Grid.Col span={12}>
          <SegmentedControl data={["Vanilla"]} />
        </Grid.Col>
        <Grid.Col>
          <VersionSelectBox {...form.getInputProps("version")} />
        </Grid.Col>
        <Grid.Col span={12}>
          <Group justify="end">
            <Button
              type="submit"
              disabled={!form.isDirty()}
              leftSection={<LuPlus />}
            >
              {t("change_profile_modal.create")}
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
}
