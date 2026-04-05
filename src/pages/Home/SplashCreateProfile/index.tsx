import { Button, Center, Flex, Stack, Text } from "@mantine/core";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { LuPlus } from "react-icons/lu";

export function SplashCreateProfileScreen() {
  const { t } = useTranslation();
  return (
    <Flex direction={"column"} h={"100vh"}>
      <Center className={clsx("flex-1")}>
        <Stack className="w-[320px] text-(--text-dim)" gap={"md"}>
          <Text>{t("home.no_profile")}</Text>
          <Button leftSection={<LuPlus size={"1rem"} />}>
            {t("home.create_new_profile")}
          </Button>
        </Stack>
      </Center>
    </Flex>
  );
}
