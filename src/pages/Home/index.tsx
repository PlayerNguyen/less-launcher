import { Button, Flex, Grid, Stack, Text, Title } from "@mantine/core";
import UsernameTextInput from "@src/components/ui/UsernameTextInput";
import VersionSelectBox from "@src/components/ui/VersionSelectBox";
import { BiNews, BiPlay } from "react-icons/bi";
import Tabs from "@src/components/ui/Tabs";
import clsx from "clsx";
import { useSettingStore } from "@src/stores/settings.store";

export default function Home() {
  const { lastPlayedVersion, lastUsername } = useSettingStore();

  const handleStartGame = () =>
    window.ipcRenderer.invoke("app:run-minecraft", {
      lastPlayedVersion,
      lastUsername,
    });

  return (
    <Tabs defaultValue="news">
      <Flex direction={"column"} mih={"100vh"} mah={"100vhh"}>
        <Stack
          p={"xs"}
          className={clsx(
            `bg-(--mantine-color-primaryLight-0) dark:bg-(--mantine-color-dark-9)`,
          )}
        >
          <Grid p={"sm"}>
            <Grid.Col span={8}>
              <Stack>
                <Title order={3}>Home</Title>
                <Text size="xs">Welcome to the home page!</Text>
                {/* Tabs */}
                <Tabs.List>
                  <Tabs.Tab value="news" leftSection={<BiNews size={12} />}>
                    News
                  </Tabs.Tab>
                </Tabs.List>
              </Stack>
            </Grid.Col>
            <Grid.Col span={4}>
              <Grid gutter={2}>
                <Grid.Col span={6}>
                  <UsernameTextInput />
                </Grid.Col>
                <Grid.Col span={6}>
                  <VersionSelectBox size="xs" />
                </Grid.Col>
                <Grid.Col>
                  <Button leftSection={<BiPlay />} onClick={handleStartGame}>
                    Play
                  </Button>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Stack>

        <Tabs.Panel value="news">News block</Tabs.Panel>
      </Flex>
    </Tabs>
  );
}
