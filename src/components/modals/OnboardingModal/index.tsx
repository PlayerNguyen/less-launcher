import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { LanguagePicker } from "@src/components/ui/LanguageSelect";
import { GenericModalProps } from "@src/libs/modals-manager/type";
import { Trans, useTranslation } from "react-i18next";
import { createOnboardingSchema } from "./schema";
import { useSettingStore } from "@src/stores/settings.store";
import useOnboardingStore from "@src/stores/OnboardingStore";

type OnboardingFormValues = {
  ingameName: string;
  consentTerms: boolean;
};

export type OnboardingModalProps = GenericModalProps<{}>;

export function OnboardingModal({ context }: OnboardingModalProps) {
  const { t } = useTranslation();
  const { setLastUsername } = useSettingStore();
  const { completeOnboarding } = useOnboardingStore();
  const form = useForm<OnboardingFormValues>({
    initialValues: {
      ingameName: "",
      consentTerms: false,
    },
    validate: schemaResolver(createOnboardingSchema(t)),
  });

  const handleLinkClick = () => {
    /**
     * Link clicks
     */
  };

  const handleFormSubmit = (values: OnboardingFormValues) => {
    // Handle setting up a profile and close the modal
    setLastUsername(values.ingameName);
    completeOnboarding();
    context.closeModal();
  };

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack>
        {/* Branding Alt Text */}
        <div
          className={`bg-(--brand-8) h-16 flex justify-center items-center rounded-2xl`}
        >
          <Text fw={"bolder"} size="xl">
            Less
          </Text>
        </div>
        <Divider />
        <Stack gap={"sm"}>
          <Text size="sm">{t("onboarding.introduce")}</Text>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                placeholder="Player_Nguyen"
                label={
                  <Text size="xs" fw={"bolder"} c={"gray.6"}>
                    {t("onboarding.ingame")}
                  </Text>
                }
                name={"ingameName"}
                {...form.getInputProps("ingameName")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <LanguagePicker />
            </Grid.Col>
          </Grid>
        </Stack>
        <Divider />
        {/*  */}
        <Group justify="end">
          <Flex className="flex-1">
            <Checkbox
              label={
                <Text size={"xs"}>
                  <Trans
                    i18nKey={"onboarding.consent_tac"}
                    components={{
                      link: (
                        <span
                          className="text-blue-500 cursor-pointer underline hover:text-blue-700"
                          onClick={handleLinkClick}
                        />
                      ),
                    }}
                  />
                </Text>
              }
              {...form.getInputProps("consentTerms")}
            />
          </Flex>
          <Button type="submit">{t("onboarding.complete")}</Button>
        </Group>
      </Stack>
    </form>
  );
}
